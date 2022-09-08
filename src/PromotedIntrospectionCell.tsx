import React from 'react'
import { MouseEvent, useState } from 'react'

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
  } as React.CSSProperties
  const backgroundContainer = {
    background: 'black',
    height: '100%',
    left: '0',
    opacity: '50%',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: 999,
  } as React.CSSProperties

  return (
    <>
      <div onContextMenu={onContextMenu} style={cellContainer}>
        {renderItem(renderArgs)}
        {contextMenuOpen && (
          <PromotedIntrospectionMenu
              userId={'userId'}
              logUserId={'logUserId'}
              requestId={'requestId'}
              insertionId={'insertionId'}
              promotedRank="1"
              retrievalRank="2"
              algoliaRank="3"
              pClick="2.153%"
              pPurchase="0.032%"
              queryRelevance="0.934"
              personalization="0.785"
              handleClose={() => setContextMenuOpen(false)}
            />
        )}
      </div>
      {contextMenuOpen && (
        <div onClick={onClickBackground} style={backgroundContainer}/>
      )}
    </>
  )
}
