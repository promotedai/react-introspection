/**
 * We want to avoid importing anything from material-ui in this file so that we can lazy load it
 * in the popup
 */
import React, { Suspense, useRef } from 'react'
import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import { IntrospectionData } from './types'
import logo from './logo.png'

const Popup = React.lazy(() => import('./Popup').then(({ Popup }) => ({ default: Popup })))

export enum PromotedIntrospectionTrigger {
  ContextMenu = 1,
  Overlay = 2,
  OverlayOnHover = 3,
}

export interface IntrospectionItem {
  logUserId: string
  contentId: string
}

interface ByLogUserIdResult {
  insertion_data: {
    [contentId: string]: IntrospectionData
  }
  request_id: string
}

export interface PromotedIntrospectionArgs {
  endpoint: string
  apiKey?: string
  children: ReactNode
  item: IntrospectionItem
  isOpen?: boolean
  renderTrigger?: (onTrigger: (e: Event) => any) => ReactNode
  disableDefaultTrigger?: boolean
  onClose?: () => any
  triggerType?: PromotedIntrospectionTrigger
}

export enum REQUEST_ERRORS {
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  FETCH_FAILED = 'FETCH_FAILED',
}

// TODO: investigate why navigator is undefined
let isMobile = false
if (typeof navigator !== 'undefined') {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const PromotedIntrospection = ({
  item,
  endpoint,
  apiKey,
  children,
  renderTrigger,
  disableDefaultTrigger,
  isOpen,
  onClose,
  triggerType = PromotedIntrospectionTrigger.ContextMenu,
}: PromotedIntrospectionArgs) => {
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [error, setError] = useState<string | void>()
  const [introspectionPayload, setIntrospectionPayload] = useState<ByLogUserIdResult | undefined>()

  const triggerContainerRef = useRef<HTMLDivElement>(null)

  const getIntrospectionPayload = async () => {
    let result
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      if (apiKey) {
        headers['x-api-key'] = apiKey
      }
      result = await fetch(
        `${endpoint[endpoint.length - 1] === '/' ? endpoint.slice(0, -1) : endpoint}/v1/introspectiondata/byloguserid/${
          item.logUserId
        }`,
        {
          headers,
        }
      )
    } catch (e) {
      console.error(e)
      throw REQUEST_ERRORS.FETCH_FAILED
    }

    let data: ByLogUserIdResult[]
    try {
      data = await result.json()
    } catch (e) {
      console.error(e)
      throw REQUEST_ERRORS.INVALID_RESPONSE
    }

    const matchingRequest = data?.find((r) => r.insertion_data[item.contentId])

    if (!matchingRequest?.insertion_data?.[item.contentId]) throw REQUEST_ERRORS.DATA_NOT_FOUND

    return matchingRequest
  }

  useEffect(() => {
    setContextMenuOpen(Boolean(isOpen))
    if (isOpen) {
      onTrigger()
    }
  }, [isOpen])

  const onTrigger = async (e?: Event | MouseEvent) => {
    setError()
    if (!contextMenuOpen && endpoint && item.logUserId && item.contentId) {
      e?.preventDefault()
      setContextMenuOpen(true)
      try {
        const payload = await getIntrospectionPayload()
        setIntrospectionPayload(payload)
      } catch (e) {
        setError(e)
      }
    }
  }

  const handleClose = () => {
    setContextMenuOpen(false)
    onClose?.()
  }

  const onClickBackground = (e: MouseEvent) => {
    e.preventDefault()
    handleClose()
  }

  const [showTriggerOverlay, setShowTriggerOverlay] = useState(
    () =>
      triggerType === PromotedIntrospectionTrigger.Overlay ||
      (triggerType === PromotedIntrospectionTrigger.OverlayOnHover && isMobile)
  )

  // This could be done with a :hover pseudoselector, but we're restricted to inline CSS unless we import a
  // CSS-in-JS library (which we want to avoid in this file), or use a separate CSS file that the client would have to import.
  const onMouseEnter = () => {
    if (triggerType === PromotedIntrospectionTrigger.OverlayOnHover && !isMobile) {
      setShowTriggerOverlay(true)
    }
  }

  const onMouseLeave = () => {
    if (triggerType === PromotedIntrospectionTrigger.OverlayOnHover && !isMobile) {
      setShowTriggerOverlay(false)
    }
  }

  return (
    <>
      <div
        onContextMenu={
          !disableDefaultTrigger && triggerType === PromotedIntrospectionTrigger.ContextMenu ? onTrigger : undefined
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          position: 'relative',
          ...(contextMenuOpen ? { background: 'white', zIndex: 1000 } : {}),
        }}
      >
        {(triggerType === PromotedIntrospectionTrigger.Overlay ||
          triggerType === PromotedIntrospectionTrigger.OverlayOnHover) && (
          <button
            style={{
              display: showTriggerOverlay ? 'block' : 'none',
              padding: '5px',
              border: 'none',
              position: 'absolute',
              height: '30px',
              width: '30px',
              top: '20px',
              cursor: 'pointer',
              borderRadius: '0 5px 5px 0',
            }}
            onClick={onTrigger}
          >
            <div
              style={{
                background: `no-repeat url('${logo}')`,
                backgroundSize: 'cover',
                backgroundColor: '#eee',
                height: '100%',
                width: '100%',
              }}
            />{' '}
          </button>
        )}
        {typeof renderTrigger === 'function' ? renderTrigger(onTrigger) : null}
        <div ref={triggerContainerRef}>{children}</div>
        {contextMenuOpen && (
          <Suspense fallback={<></>}>
            <Popup
              error={error}
              triggerContainerRef={triggerContainerRef}
              item={item}
              introspectionIds={[
                {
                  label: 'Log User ID',
                  value: item.logUserId,
                },
                {
                  label: 'Request ID',
                  value: introspectionPayload?.request_id,
                },
                {
                  label: 'Insertion ID',
                  value: introspectionPayload?.insertion_data[item.contentId]?.insertion_id,
                },
              ]}
              introspectionData={introspectionPayload?.insertion_data?.[item.contentId]}
              handleClose={handleClose}
            />
          </Suspense>
        )}
      </div>
      {contextMenuOpen && (
        <div
          onClick={onClickBackground}
          style={{
            background: 'black',
            height: '100%',
            left: '0',
            opacity: '50%',
            position: 'fixed',
            top: '0',
            width: '100%',
            zIndex: 999,
          }}
        />
      )}
    </>
  )
}
