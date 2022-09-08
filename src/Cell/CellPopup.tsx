import { Box, Tab, Tabs } from '@mui/material'
import { createTheme, Theme, ThemeProvider } from '@mui/system'
import { CSSProperties, SyntheticEvent, useState } from 'react'
import { ModerationPanel } from './ModerationPanel'
import { PropertiesPanel } from './PropertiesPanel'
import { StatsPanel } from './StatsPanel'
import { CellIntrospectionData } from './types'

export interface CellPopupArgs {
  introspectionData: CellIntrospectionData
  handleClose: () => any
}

class popupStyles {
  static outerContainer = {
    left: '-412px',
    padding: '20px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '400px',
    zIndex: '1001',
  }
  static innerContainer = (theme: Theme) => ({
    background: '#eee',
    paddingTop: theme.spacing(1),
    position: 'relative',
  })
  static callout = {
    borderBottom: '20px solid transparent',
    borderLeft: '20px solid #eee',
    borderTop: '20px solid transparent',
    height: '20px',
    left: '100%',
    position: 'absolute',
    top: '45%',
    width: '20px',
  }
  static promotedLogo = {
    bottom: '26px',
    height: '20px',
    left: '20px',
    position: 'absolute',
    width: '20px',
  } as CSSProperties
}

export const CellPopup = ({
  introspectionData,
  handleClose,
} : CellPopupArgs) => {
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

  return (<ThemeProvider theme={theme}>
    <Box sx={popupStyles.outerContainer}>
      <Box boxShadow={4} sx={popupStyles.innerContainer}>
        <Box sx={popupStyles.callout}/>
        <Tabs onChange={handleTabChange} value={tabIndex} variant='scrollable'>
          <Tab label='Stats'/>
          <Tab label='Properties'/>
          <Tab label='Moderation'/>
          <Tab label='Moderation Log'/>
        </Tabs>
        {promotedLogoVisible &&
          <img
            style={popupStyles.promotedLogo}
            src='https://avatars.githubusercontent.com/t/3500892?s=280&v=4'
          />
        }

        {tabIndex == 0 && (
          <StatsPanel
            introspectionData={introspectionData}
            handleCopyButtonVisibilityChange={handleCopyButtonVisibilityChange}
            handleClose={handleClose}
            theme={theme}
          />
        )}

        {tabIndex == 1 && (
          <PropertiesPanel handleClose={handleClose} theme={theme}/>
        )}

        {tabIndex == 2 && (
          <ModerationPanel handleClose={handleClose} theme={theme}/>
        )}
      </Box>
    </Box>
  </ThemeProvider>)
}
