import React, { CSSProperties } from 'react'
import { MouseEvent, useState } from 'react'
import { CellPopup } from './CellPopup'

export enum PromotedIntrospectionCellTrigger {

  ContextMenu = 1,

  OverlayAlways = 2,

  OverlayOnMouseEnter = 3,
}

export interface PromotedIntrospectionCellArgs {
  introspectionPayload: string
  renderItem: (args: any) => any
  trigger: PromotedIntrospectionCellTrigger
}

export const PromotedIntrospectionCell = ({
  introspectionPayload,
  renderItem,
  trigger,
  ...renderArgs
}: PromotedIntrospectionCellArgs) => {
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const onContextMenu = (e: MouseEvent) => {
    if (!contextMenuOpen) {
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
    ...(contextMenuOpen ? {
      background: 'white',
      zIndex: 1000
    } : {})
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

  const payload = JSON.parse(introspectionPayload)
  const handleClose = () => setContextMenuOpen(false)

  return (<>
    <div onContextMenu={onContextMenu} style={cellContainer}>
      {renderItem(renderArgs)}
      {contextMenuOpen && (
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
    {contextMenuOpen && (
      <div onClick={onClickBackground} style={backgroundContainer}/>
    )}
  </>)
}
