import React, { SyntheticEvent, useState } from 'react'
import { Box, Tab, Tabs, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core'
import { ModerationPanel } from './ModerationPanel'
import { PropertiesPanel } from './PropertiesPanel'
import { StatsPanel } from './StatsPanel'
import { CellIntrospectionData } from './types'
import { makeStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

export interface CellPopupArgs {
  introspectionData: CellIntrospectionData
  handleClose: () => any
}

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    color: 'black',
    left: '-412px',
    padding: '20px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '400px',
    zIndex: 1001,
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

export const CellPopup = ({ introspectionData, handleClose }: CellPopupArgs) => {
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

  const classes = useStyles(theme)

  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (_: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex)
  }
  const [promotedLogoVisible, setPromotedLogoVisible] = useState(true)
  const handleCopyButtonVisibilityChange = (visible: boolean) => {
    setPromotedLogoVisible(visible)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.outerContainer}>
        <Box boxShadow={4} className={classes.innerContainer}>
          <Box className={classes.callout} />
          <Tabs onChange={handleTabChange} value={tabIndex} variant="scrollable" indicatorColor="primary">
            <Tab label="Stats" />
            <Tab label="Properties" />
            <Tab label="Moderation" />
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
        </Box>
      </Box>
    </ThemeProvider>
  )
}
