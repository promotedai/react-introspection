import React, { ComponentType } from 'react'
import { PromotedIntrospectionCell } from './Cell/PromotedIntrospectionCell'

export interface WithPromotedIntrospectionProps {
  endpoint: string
  apiKey?: string
}

export const withPromotedIntrospection =
  ({ endpoint, apiKey }: WithPromotedIntrospectionProps) =>
  <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithPromotedIntrospection = (props: any) => {
      if (props.introspectionEnabled) {
        return (
          <PromotedIntrospectionCell
            item={props.item}
            endpoint={endpoint}
            apiKey={apiKey}
            isOpen={props.introspectionOpen}
            renderTrigger={props.renderIntrospectionTrigger}
            onClose={props.onIntrospectionClose}
            disableDefaultTrigger={props.disableDefaultIntrospectionTrigger}
          >
            <WrappedComponent {...props} />
          </PromotedIntrospectionCell>
        )
      }

      return <WrappedComponent {...props} />
    }

    WithPromotedIntrospection.displayName = `withPromotedIntrospection(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`
    return WithPromotedIntrospection
  }
