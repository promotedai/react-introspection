import { Box, Tab, Tabs } from '@mui/material'
import { Theme, ThemeProvider } from '@mui/system'
import { createTheme } from '@mui/material/styles'
import { CSSProperties, SyntheticEvent, useState } from 'react'
import { ModerationPanel } from './ModerationPanel'
import { PropertiesPanel } from './PropertiesPanel'
import { StatsPanel } from './StatsPanel'
import { CellIntrospectionData } from './types'

export interface CellPopupArgs {
  introspectionData: CellIntrospectionData
  handleClose: () => any
}

const popupStyles = {
  outerContainer: {
    color: 'black',
    left: '-412px',
    padding: '20px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '400px',
    zIndex: '1001',
  },
  innerContainer: (theme: Theme) => ({
    background: '#eee',
    paddingTop: theme.spacing(1),
    position: 'relative',
  }),
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
  } as CSSProperties,
}

export const CellPopup = ({ introspectionData, handleClose }: CellPopupArgs) => {
  const theme = createTheme({
    typography: {
      body1: {
        fontSize: 12,
      },
    },
  })

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
      <Box sx={popupStyles.outerContainer}>
        <Box boxShadow={4} sx={popupStyles.innerContainer}>
          <Box sx={popupStyles.callout} />
          <Tabs onChange={handleTabChange} value={tabIndex} variant="scrollable">
            <Tab label="Stats" />
            <Tab label="Properties" />
            <Tab label="Moderation" />
          </Tabs>
          {promotedLogoVisible && (
            <img style={popupStyles.promotedLogo} src="https://avatars.githubusercontent.com/t/3500892?s=280&v=4" />
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
