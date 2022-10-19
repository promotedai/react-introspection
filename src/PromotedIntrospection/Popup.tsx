import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CircularProgress, Box, Tab, Tabs, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core'
import { ModerationPanel } from './ModerationPanel'
import { ModerationLogPanel } from './ModerationLogPanel'
import { PropertiesPanel } from './PropertiesPanel'
import { StatsPanel } from './StatsPanel'
import { IntrospectionData } from './types'
import { makeStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import { REQUEST_ERRORS } from './PromotedIntrospection'
import { IntrospectionItem } from './PromotedIntrospection'

export interface IntrospectionIds {
  label: string
  value?: string
}

export interface PopupArgs {
  isLoading: boolean
  triggerContainerRef: React.RefObject<HTMLDivElement>
  introspectionData?: IntrospectionData
  introspectionIds: IntrospectionIds[]
  item: IntrospectionItem
  error?: string | void
  handleClose: () => any
}

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
    position: 'absolute',
    left: '-425px',
    top: '-41%',
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
  promotedLogo: {
    bottom: '26px',
    height: '20px',
    left: '20px',
    position: 'absolute',
    width: '20px',
  },
}))

export const Popup = ({
  error,
  triggerContainerRef,
  introspectionData,
  introspectionIds,
  item,
  handleClose,
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
  const [promotedLogoVisible, setPromotedLogoVisible] = useState(true)
  const handleCopyButtonVisibilityChange = (visible: boolean) => {
    setPromotedLogoVisible(visible)
  }

  const repositionPopup = useCallback(() => {
    if (!triggerContainerRef.current || !popupContainerRef.current) return
    const triggerRect = triggerContainerRef.current.getBoundingClientRect()
    const popupRect = popupContainerRef.current.getBoundingClientRect()
    popupContainerRef.current.style.position = 'absolute'
    popupContainerRef.current.style.left = `${-Math.min(popupRect.width + 25, triggerRect.x)}px`
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
    [REQUEST_ERRORS.DATA_NOT_FOUND]: `Could not find introspection data for Log User ID ${item.logUserId} and Content ID ${item.contentId}.  This is likely because the user is not flagged as an internal user.`,
    [REQUEST_ERRORS.INVALID_RESPONSE]: `Response from server invalid for Log User ID ${item.logUserId}`,
    [REQUEST_ERRORS.FETCH_FAILED]: `Fetch failed for Log User ID ${item.logUserId}`,
  }

  return (
    <ThemeProvider theme={theme}>
      <div ref={popupContainerRef} className={classes.popupContainer}>
        <Box className={classes.outerContainer}>
          <Box boxShadow={4} className={classes.innerContainer}>
            <Box className={classes.callout} />
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
                  {/* <Tab label="Properties" />
                  <Tab label="Moderation" />
                  <Tab label="Moderation Log" /> */}
                </Tabs>
                {promotedLogoVisible && (
                  <img
                    className={classes.promotedLogo}
                    src="https://avatars.githubusercontent.com/t/3500892?s=280&v=4"
                  />
                )}

                {tabIndex == 0 && (
                  <StatsPanel
                    introspectionIds={introspectionIds}
                    introspectionData={introspectionData}
                    handleCopyButtonVisibilityChange={handleCopyButtonVisibilityChange}
                    handleClose={handleClose}
                    theme={theme}
                  />
                )}

                {tabIndex == 1 && <PropertiesPanel handleClose={handleClose} theme={theme} />}

                {tabIndex == 2 && <ModerationPanel handleClose={handleClose} theme={theme} />}
                {tabIndex == 3 && <ModerationLogPanel handleClose={handleClose} theme={theme} />}
              </>
            )}
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  )
}
