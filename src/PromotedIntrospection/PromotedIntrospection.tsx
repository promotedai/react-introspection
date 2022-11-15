/**
 * We want to avoid importing anything from material-ui in this file so that we can lazy load it
 * in the popup
 */
import React, { Suspense, useContext, useMemo, useRef } from 'react'
import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import { IntrospectionData } from './types'
import logo from './logo.png'
import { PromotedIntrospectionContext } from './PromotedIntrospectionProvider'

const Popup = React.lazy(() => import('./Popup').then(({ Popup }) => ({ default: Popup })))

export enum PromotedIntrospectionTrigger {
  ContextMenu = 1,
  Overlay = 2,
  OverlayOnHover = 3,
}

export interface IntrospectionItem {
  contentId: string
}

export interface ByLogUserIdResult {
  insertion_data: {
    [contentId: string]: IntrospectionData
  }
  request_id: string
}

export interface PromotedIntrospectionArgs {
  children: ReactNode
  contentId: string
  isOpen?: boolean
  renderTrigger?: (onTrigger: (e: Event) => any) => ReactNode
  disableDefaultTrigger?: boolean
  onClose?: () => any
  triggerType?: PromotedIntrospectionTrigger
  direction?: 'left' | 'right'
}

// TODO: investigate why navigator is undefined
let isMobile = false
if (typeof navigator !== 'undefined') {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const PromotedIntrospection = ({
  contentId,
  children,
  renderTrigger,
  disableDefaultTrigger,
  isOpen,
  onClose,
  triggerType = PromotedIntrospectionTrigger.ContextMenu,
  direction = 'left',
}: PromotedIntrospectionArgs) => {
  const { logUserId, introspectionPayload, error } = useContext(PromotedIntrospectionContext)
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const matchingRequest = useMemo(
    () => introspectionPayload?.find((r) => r.insertion_data[contentId]),
    [introspectionPayload]
  )

  const triggerContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setContextMenuOpen(Boolean(isOpen))
    if (isOpen) {
      onTrigger()
    }
  }, [isOpen])

  const onTrigger = async (e?: Event | MouseEvent) => {
    if (!contextMenuOpen && logUserId && contentId && introspectionPayload) {
      e?.preventDefault()
      setContextMenuOpen(true)
    }
  }

  const handleClose = () => {
    if (typeof isOpen === 'undefined') {
      setContextMenuOpen(false)
    }
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
              contentId={contentId}
              direction={direction}
              error={error}
              triggerContainerRef={triggerContainerRef}
              logUserId={logUserId}
              introspectionIds={[
                {
                  label: 'Log User ID',
                  value: logUserId,
                },
                {
                  label: 'Request ID',
                  value: matchingRequest?.request_id,
                },
                {
                  label: 'Insertion ID',
                  value: matchingRequest?.insertion_data[contentId]?.insertion_id,
                },
              ]}
              introspectionData={matchingRequest?.insertion_data?.[contentId]}
              fullIntrospectionPayload={introspectionPayload}
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
