import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CircularProgress, Box, Tab, Tabs, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core'
import { StatsPanel } from './StatsPanel'
import { IntrospectionData } from './types'
import { createGenerateClassName, makeStyles, StylesProvider } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import { ByLogUserIdResult } from './PromotedIntrospection'
import logo from './logo.png'
import { DebugPanel } from './DebugPanel'
import { REQUEST_ERRORS } from './PromotedIntrospectionProvider'

export interface IntrospectionIds {
  label: string
  value?: string
}

export interface PopupArgs {
  contentId: string
  direction?: 'left' | 'right'
  triggerContainerRef: React.RefObject<HTMLDivElement>
  introspectionData?: IntrospectionData
  fullIntrospectionPayload?: ByLogUserIdResult[]
  introspectionIds: IntrospectionIds[]
  logUserId: string
  error?: string | void
  handleClose: () => any
}

const CALLOUT_WIDTH = 25

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
  error: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    color: theme.palette.error.main,
    height: '300px',
  },
  popupContainer: {
    visibility: 'hidden',
    position: 'absolute',
    left: '-425px',
  },
  ['popupContainer--right']: {
    right: '-425px',
    left: 'auto',
  },
  outerContainer: {
    color: 'black',
    maxWidth: '100vw',
    width: '400px',
    zIndex: 1001,
    maxHeight: '100vh',
  },
  innerContainer: {
    background: '#eee',
    paddingTop: theme.spacing(1),
    position: 'relative',
  },
  callout: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    backgroundColor: '#eee',
    transform: 'rotate(45deg) translateX(-50%)',
    height: '30px',
    left: 'calc(100% - 4px)',
    position: 'absolute',
    top: '49%',
    width: '30px',
  },
  ['callout--right']: {
    right: `calc(100% - ${CALLOUT_WIDTH}px)`,
    left: 'auto',
  },
  promotedLogo: {
    bottom: '26px',
    height: '20px',
    left: '20px',
    position: 'absolute',
    width: '20px',
  },
}))

const generateClassName = createGenerateClassName({
  seed: 'promoted-introspection',
})

export const Popup = ({
  error,
  triggerContainerRef,
  introspectionData,
  fullIntrospectionPayload,
  introspectionIds,
  logUserId,
  contentId,
  handleClose,
  direction = 'left',
}: PopupArgs) => {
  const theme = createTheme({
    typography: {
      body1: {
        fontSize: 12,
      },
    },
    palette: {
      primary: blue,
    },
  })

  const popupContainerRef = useRef<HTMLDivElement>(null)

  const classes = useStyles(theme)

  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (_: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex)
  }

  const repositionPopup = useCallback(() => {
    if (!triggerContainerRef.current || !popupContainerRef.current) return
    const triggerRect = triggerContainerRef.current.getBoundingClientRect()
    const popupRect = popupContainerRef.current.getBoundingClientRect()
    popupContainerRef.current.style.visibility = 'visible'
    popupContainerRef.current.style.position = 'absolute'
    if (direction === 'left') {
      popupContainerRef.current.style.left = `${-Math.min(popupRect.width + CALLOUT_WIDTH, triggerRect.left)}px`
      popupContainerRef.current.style.right = 'auto'
    }

    if (direction === 'right') {
      popupContainerRef.current.style.right = `${-Math.min(
        popupRect.width + CALLOUT_WIDTH,
        window.innerWidth - triggerRect.right
      )}px`
      popupContainerRef.current.style.left = 'auto'
    }

    popupContainerRef.current.style.top = `${-(popupRect.height - triggerRect.height) / 2}px`
  }, [])

  useEffect(() => {
    repositionPopup()
  }, [repositionPopup])

  const resizeObserver = useMemo(() => {
    return new ResizeObserver(() => {
      repositionPopup()
    })
  }, [])

  useEffect(() => {
    if (!popupContainerRef.current) return

    resizeObserver.observe(popupContainerRef.current)
    window.addEventListener('resize', repositionPopup)

    return () => {
      if (popupContainerRef.current) {
        resizeObserver.unobserve(popupContainerRef.current)
      }
      window.removeEventListener('resize', repositionPopup)
    }
  }, [])

  const errorMap = {
    [REQUEST_ERRORS.DATA_NOT_FOUND]: `Could not find introspection data for Log User ID ${logUserId} and Content ID ${contentId}.  This is likely because the user is not flagged as an internal user.`,
    [REQUEST_ERRORS.INVALID_RESPONSE]: `Response from server invalid for Log User ID ${logUserId}`,
    [REQUEST_ERRORS.FETCH_FAILED]: `Fetch failed for Log User ID ${logUserId}`,
  }

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider generateClassName={generateClassName}>
        <div
          ref={popupContainerRef}
          className={`${classes.popupContainer} ${direction === 'right' ? classes['popupContainer--right'] : ''}`}
        >
          <Box className={classes.outerContainer}>
            <Box boxShadow={4} className={classes.innerContainer}>
              <Box className={`${classes.callout} ${direction === 'right' ? classes['callout--right'] : ''}`} />
              {!introspectionData && !error && (
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
              )}
              {error && <div className={classes.error}>{errorMap[error]}</div>}
              {!error && introspectionData && (
                <>
                  <Tabs onChange={handleTabChange} value={tabIndex} variant="scrollable" indicatorColor="primary">
                    <Tab label="Stats" />
                    <Tab label="Raw Response" />
                    {/* <Tab label="Properties" />
                  <Tab label="Moderation" />
                  <Tab label="Moderation Log" /> */}
                  </Tabs>
                  <img className={classes.promotedLogo} src={logo} />

                  {tabIndex === 0 && (
                    <StatsPanel
                      introspectionIds={introspectionIds}
                      introspectionData={introspectionData}
                      handleClose={handleClose}
                      theme={theme}
                    />
                  )}

                  {tabIndex === 1 && <DebugPanel theme={theme} introspectionPayload={fullIntrospectionPayload} />}

                  {/* {tabIndex == 2 && <PropertiesPanel handleClose={handleClose} theme={theme} />}
                  {tabIndex == 3 && <ModerationPanel handleClose={handleClose} theme={theme} />}
                  {tabIndex == 4 && <ModerationLogPanel handleClose={handleClose} theme={theme} />} */}
                </>
              )}
            </Box>
          </Box>
        </div>
      </StylesProvider>
    </ThemeProvider>
  )
}
