import { CSSProperties, MouseEvent, ReactNode, useEffect, useState } from 'react'
import { CellPopup } from './CellPopup'
import { CellIntrospectionData } from './types'

export enum PromotedIntrospectionCellTrigger {
  ContextMenu = 1,
  OverlayAlways = 2,
  OverlayOnMouseEnter = 3,
}

export interface PromotedIntrospectionCellArgs {
  introspectionEndpoint: string
  children: ReactNode
  trigger?: PromotedIntrospectionCellTrigger
  item: { insertionId: string }
}

export const PromotedIntrospectionCell = ({
  item,
  introspectionEndpoint,
  children,
  trigger,
}: PromotedIntrospectionCellArgs) => {
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [payload, setPayload] = useState<CellIntrospectionData | undefined>()
  trigger

  // TODO:  Update this function to extract the metadata from the provided item.
  // This is likely where the integration with the API will happen
  const getIntrospectionPayload = async () => {
    console.log('insertionId', item.insertionId)
    console.log('introspecitonEndpoint', introspectionEndpoint)

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
    if (contextMenuOpen && introspectionEndpoint && item.insertionId) {
      getIntrospectionPayload().then(setPayload)
    }
  }, [item, introspectionEndpoint, contextMenuOpen])

  const onContextMenu = (e: MouseEvent) => {
    if (!contextMenuOpen && introspectionEndpoint) {
      e.preventDefault()
      setContextMenuOpen(true)
    }
  }

  const onClickBackground = (e: MouseEvent) => {
    e.preventDefault()
    setContextMenuOpen(false)
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

  const handleClose = () => setContextMenuOpen(false)

  return (
    <>
      <div onContextMenu={onContextMenu} style={cellContainer}>
        {children}
        {contextMenuOpen && payload && (
          <CellPopup
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
        )}
      </div>
      {contextMenuOpen && <div onClick={onClickBackground} style={backgroundContainer} />}
    </>
  )
}
