import React, { ComponentType, useContext } from 'react'
import { PromotedIntrospection } from './PromotedIntrospection/PromotedIntrospection'
import { PromotedIntrospectionContext } from './PromotedIntrospection/PromotedIntrospectionProvider'

export const withPromotedIntrospection =
  () =>
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithPromotedIntrospection = (props: any) => {
      const { isIntrospectionEnabled } = useContext(PromotedIntrospectionContext) || {}

      if (isIntrospectionEnabled) {
        return (
          <PromotedIntrospection
            contentId={props.contentId}
            isOpen={props.introspectionOpen}
            renderTrigger={props.renderIntrospectionTrigger}
            onClose={props.onIntrospectionClose}
            disableDefaultTrigger={props.disableDefaultIntrospectionTrigger}
            direction={props.introspectionDirection}
          >
            <WrappedComponent {...props} />
          </PromotedIntrospection>
        )
      }

      return <WrappedComponent {...props} />
    }

    WithPromotedIntrospection.displayName = `withPromotedIntrospection(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`
    return WithPromotedIntrospection
  }
