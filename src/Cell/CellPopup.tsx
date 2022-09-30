import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Tab, Tabs, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core'
import { ModerationPanel } from './ModerationPanel'
import { ModerationLogPanel } from './ModerationLogPanel'
import { PropertiesPanel } from './PropertiesPanel'
import { StatsPanel } from './StatsPanel'
import { CellIntrospectionData } from './types'
import { makeStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

export interface CellPopupArgs {
  triggerContainerRef: React.RefObject<HTMLDivElement>
  introspectionData: CellIntrospectionData
  handleClose: () => any
}

const useStyles = makeStyles((theme) => ({
  popupContainer: {
    position: 'absolute',
    left: '-425px',
    top: '-41%',
  },
  outerContainer: {
    color: 'black',
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

export const CellPopup = ({ triggerContainerRef, introspectionData, handleClose }: CellPopupArgs) => {
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

  return (
    <ThemeProvider theme={theme}>
      <div ref={popupContainerRef} className={classes.popupContainer}>
        <Box className={classes.outerContainer}>
          <Box boxShadow={4} className={classes.innerContainer}>
            <Box className={classes.callout} />
            <Tabs onChange={handleTabChange} value={tabIndex} variant="scrollable" indicatorColor="primary">
              <Tab label="Stats" />
              <Tab label="Properties" />
              <Tab label="Moderation" />
              <Tab label="Moderation Log" />
            </Tabs>
            {promotedLogoVisible && (
              <img className={classes.promotedLogo} src="https://avatars.githubusercontent.com/t/3500892?s=280&v=4" />
            )}

            {tabIndex == 0 && (
              <StatsPanel
                introspectionData={introspectionData}
                handleCopyButtonVisibilityChange={handleCopyButtonVisibilityChange}
                handleClose={handleClose}
                theme={theme}
              />
            )}

            {tabIndex == 1 && <PropertiesPanel handleClose={handleClose} theme={theme} />}

            {tabIndex == 2 && <ModerationPanel handleClose={handleClose} theme={theme} />}
            {tabIndex == 3 && <ModerationLogPanel handleClose={handleClose} theme={theme} />}
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  )
}
