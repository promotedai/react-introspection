import { ComponentType } from 'react'
import { PromotedIntrospectionCell } from './Cell/PromotedIntrospectionCell'

export const withPromotedInspection = (WrappedComponent: ComponentType, introspectionEndpoint: string) => {
  const WithPromotedInspection = (props: any) => {
    if (props.introspectionEnabled) {
      return (
        <PromotedIntrospectionCell item={props.item} introspectionEndpoint={introspectionEndpoint}>
          <WrappedComponent {...props} />
        </PromotedIntrospectionCell>
      )
    }

    return <WrappedComponent {...props} />
  }

  WithPromotedInspection.displayName = `withPromotedIntrospection(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`
  return WithPromotedInspection
}
