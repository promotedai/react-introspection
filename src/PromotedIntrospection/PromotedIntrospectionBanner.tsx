import React from 'react'

import logo from './logo.png'

export type BannerPosition = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT'

interface PromotedIntrospectionBannerArgs {
  onCopyFullPayload: () => any
  copyText: string
  isCopying: boolean
  position?: BannerPosition
  logUserId: string
}

export const PromotedIntrospectionBanner = ({
  onCopyFullPayload,
  isCopying,
  copyText,
  logUserId,
  position = 'TOP_LEFT',
}: PromotedIntrospectionBannerArgs) => {
  const styleMap = {
    TOP_LEFT: {
      borderRadius: '0 0 5px 0',
      top: 0,
      left: 0,
    },
    TOP_RIGHT: {
      borderRadius: '0 0 0 5px',
      top: 0,
      right: 0,
    },
    BOTTOM_LEFT: {
      borderRadius: '0 5px 0 0',
      bottom: 0,
      left: 0,
    },
    BOTTOM_RIGHT: {
      borderRadius: '5px 0 0 0',
      bottom: 0,
      right: 0,
    },
  }

  return (
    <div
      onContextMenu={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        display: 'flex',
        width: 'min(100vw,600px)',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        height: '50px',
        background: '#eee',
        ...styleMap[position],
      }}
    >
      <img style={{ height: '20px', width: '20px' }} src={logo} />
      <span style={{ marginLeft: '15px' }}>
        Introspection Enabled for log_user_id: <strong>{logUserId}</strong>
      </span>
      <button
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          fontSize: '12px',
          background: '#1976d2',
          marginLeft: 'auto',
          color: 'white',
          padding: '6px 16px',
          minWidth: '100px',
          borderRadius: '4px',
          lineHeight: '1.75',
          whiteSpace: 'nowrap',
          border: 0,
          cursor: isCopying ? 'not-allowed' : 'pointer',
        }}
        onClick={onCopyFullPayload}
        disabled={isCopying}
      >
        {copyText}
      </button>
    </div>
  )
}
