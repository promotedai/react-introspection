import React, { Suspense, useContext } from 'react'

import { PromotedIntrospectionContext } from './PromotedIntrospection/PromotedIntrospectionProvider'

const PromotedIntrospectionBanner = React.lazy(() =>
  import('./PromotedIntrospection/PromotedIntrospectionBanner').then(({ PromotedIntrospectionBanner }) => ({
    default: PromotedIntrospectionBanner,
  }))
)

export type BannerPosition = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT'
export interface PromotedIntrospectionBannerArgs {
  position?: BannerPosition
}

export const PromotedIntrospectionBannerShell = (props: PromotedIntrospectionBannerArgs) => {
  const { isIntrospectionEnabled } = useContext(PromotedIntrospectionContext)

  return isIntrospectionEnabled ? (
    <Suspense fallback={<div />}>
      <PromotedIntrospectionBanner {...props} />
    </Suspense>
  ) : null
}
