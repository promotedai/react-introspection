import React, { Suspense, useRef } from 'react'
import { CSSProperties, MouseEvent, ReactNode, useEffect, useState } from 'react'
import { CellIntrospectionData } from './types'

const CellPopup = React.lazy(() => import('./CellPopup').then(({ CellPopup }) => ({ default: CellPopup })))

export enum PromotedIntrospectionCellTrigger {
  ContextMenu = 1,
  OverlayAlways = 2,
  OverlayOnMouseEnter = 3,
}

export interface PromotedIntrospectionCellArgs {
  introspectionEndpoint: string
  children: ReactNode
  item: { insertionId: string }
  isOpen?: boolean
  renderTrigger?: (onTrigger: (e: Event) => any) => ReactNode
  disableDefaultTrigger?: boolean
  onClose?: () => any
}

export const PromotedIntrospectionCell = ({
  item,
  introspectionEndpoint,
  children,
  renderTrigger,
  disableDefaultTrigger,
  isOpen,
  onClose,
}: PromotedIntrospectionCellArgs) => {
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [payload, setPayload] = useState<CellIntrospectionData | undefined>()

  const triggerContainerRef = useRef<HTMLDivElement>(null)

  // TODO:  Update this function to extract the metadata from the provided item.
  // This is likely where the integration with the API will happen
  const getIntrospectionPayload = async () => {
    // MOCK
    return {
      userId: 'userId',
      logUserId: 'logUserId',
      requestId: 'requestId',
      insertionId: 'insertionId',
      promotedRank: 2,
      retrievalRank: 3,
      pClick: 0.5,
      pPurchase: 0.6,
      queryRelevance: 5,
      personalization: 5,
    }
  }

  useEffect(() => {
    setContextMenuOpen(Boolean(isOpen))
  }, [isOpen])

  useEffect(() => {
    if (contextMenuOpen && introspectionEndpoint && item.insertionId) {
      getIntrospectionPayload().then(setPayload)
    }
  }, [item, introspectionEndpoint, contextMenuOpen])

  const onTrigger = (e: Event | MouseEvent) => {
    if (!contextMenuOpen && introspectionEndpoint) {
      e.preventDefault()
      setContextMenuOpen(true)
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

  const cellContainer = {
    position: 'relative',
    ...(contextMenuOpen
      ? {
          background: 'white',
          zIndex: 1000,
        }
      : {}),
  } as CSSProperties
  const backgroundContainer = {
    background: 'black',
    height: '100%',
    left: '0',
    opacity: '50%',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: 999,
  } as CSSProperties

  useEffect(() => {
    const body = document.querySelector('body')
    if (!body) return

    body.style.overflow = contextMenuOpen && introspectionEndpoint ? 'hidden' : 'initial'
  }, [contextMenuOpen])

  return (
    <>
      <div onContextMenu={!disableDefaultTrigger ? onTrigger : undefined} style={cellContainer}>
        {typeof renderTrigger === 'function' ? renderTrigger(onTrigger) : null}
        <div ref={triggerContainerRef}>{children}</div>
        {contextMenuOpen && payload && (
          <Suspense fallback={<></>}>
            <CellPopup
              triggerContainerRef={triggerContainerRef}
              introspectionData={{
                userId: payload.userId,
                logUserId: payload.logUserId,
                requestId: payload.requestId,
                insertionId: payload.insertionId,
                promotedRank: payload.promotedRank,
                retrievalRank: payload.retrievalRank,
                pClick: payload.pClick,
                pPurchase: payload.pPurchase,
                queryRelevance: payload.queryRelevance,
                personalization: payload.personalization,
              }}
              handleClose={handleClose}
            />
          </Suspense>
        )}
      </div>
      {contextMenuOpen && <div onClick={onClickBackground} style={backgroundContainer} />}
    </>
  )
}
