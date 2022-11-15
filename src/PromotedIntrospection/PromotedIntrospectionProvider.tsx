import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { ByLogUserIdResult } from './PromotedIntrospection'

export enum REQUEST_ERRORS {
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  FETCH_FAILED = 'FETCH_FAILED',
}

type ErrorType = typeof REQUEST_ERRORS[keyof typeof REQUEST_ERRORS]

interface PromotedIntrospectionContextType {
  logUserId: string
  experimentDetails?: { label: string; value: string }[]
  introspectionPayload?: ByLogUserIdResult[]
  metadata?: { label: string; value: string }[]
  isIntrospectionEnabled: boolean
  error?: ErrorType
  errorPayload?: string
}

export const PromotedIntrospectionContext = React.createContext<PromotedIntrospectionContextType>({
  logUserId: '',
  introspectionPayload: undefined,
  isIntrospectionEnabled: false,
  experimentDetails: undefined,
  metadata: undefined,
  error: undefined,
  errorPayload: undefined,
})

export interface PromotedIntrospectionProviderArgs {
  children: React.ReactNode
  endpoint: string
  logUserId: string
  experimentDetails?: { label: string; value: string }[]
  metadata?: { label: string; value: string }[]
  isIntrospectionEnabled: boolean
}

export const PromotedIntrospectionProvider = ({
  children,
  endpoint,
  logUserId,
  experimentDetails,
  metadata,
  isIntrospectionEnabled,
}: PromotedIntrospectionProviderArgs) => {
  const [error, setError] = useState<ErrorType>()
  const [errorPayload, setErrorPayload] = useState<string>()
  const [introspectionPayload, setIntrospectionPayload] = useState<ByLogUserIdResult[] | undefined>()

  const value = useMemo<PromotedIntrospectionContextType>(
    () => ({
      logUserId,
      isIntrospectionEnabled,
      introspectionPayload,
      errorPayload,
      error,
      experimentDetails,
      metadata,
    }),
    [logUserId, isIntrospectionEnabled, errorPayload, introspectionPayload, error, experimentDetails, metadata]
  )

  const getIntrospectionPayload = useCallback(async () => {
    let result
    setIntrospectionPayload(undefined)
    setErrorPayload(undefined)
    setError(undefined)
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      result = await fetch(
        `${
          endpoint[endpoint.length - 1] === '/' ? endpoint.slice(0, -1) : endpoint
        }/v1/introspectiondata/byloguserid/${logUserId}`,
        {
          headers,
        }
      )
    } catch (e) {
      console.error(e)
      setErrorPayload(e)
      setError(REQUEST_ERRORS.FETCH_FAILED)
      throw REQUEST_ERRORS.FETCH_FAILED
    }

    let data: ByLogUserIdResult[]
    try {
      const contentType = result.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await result.json()
        setIntrospectionPayload(data)
      } else {
        setErrorPayload(await result.text())
      }
    } catch (e) {
      console.error(e)
      setErrorPayload(e?.toString?.())
      setError(REQUEST_ERRORS.INVALID_RESPONSE)
    }
  }, [logUserId, endpoint])

  useEffect(() => {
    if (isIntrospectionEnabled && logUserId && endpoint) {
      getIntrospectionPayload()
    }
  }, [logUserId, isIntrospectionEnabled])

  return <PromotedIntrospectionContext.Provider value={value}>{children}</PromotedIntrospectionContext.Provider>
}
