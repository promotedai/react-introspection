import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Button, Collapse, FormControl, FormControlLabel, List, ListItemButton, ListItemText, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Slider, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { createTheme, Theme, ThemeProvider } from '@mui/system'
import React, { useState } from 'react'
import { Checkmark } from '../Checkmark'

export interface IntrospectionStats {
  userId?: string
  logUserId?: string
  requestId?: string
  insertionId?: string
  promotedRank?: number
  retrievalRank?: number
  pClick?: number
  pPurchase?: number
  queryRelevance?: number
  personalization?: number
  handleClose?: string
}

const relativeFormat = (n: number) => `${n >= 0 ? '+' : '–'}${Math.abs(n)}`

const buttonStyle = (theme: Theme) => ({
  "&.MuiButton-contained": {
    background: blue[700],
    color: "white"
  },
  marginLeft: theme.spacing(1),
})

const tabContentContainerStyle = (theme: Theme) => ({
  columnGap: theme.spacing(1),
  display: 'grid',
  padding: '10px 20px 20px 20px',
  rowGap: theme.spacing(1),
})

const buttonContainerStyle = (theme: Theme) => ({
  alignContent: 'center',
  gridColumn: '1 / 5',
  marginTop: theme.spacing(1),
  textAlign: 'right',
})

interface StatsPanelArgs {
  introspectionStats: IntrospectionStats
  handleCopyButtonVisibilityChange: (visible: boolean) => any
  handleClose: () => any
  theme: Theme
}

const StatsPanel = ({
  introspectionStats,
  handleCopyButtonVisibilityChange,
  handleClose,
  theme,
}: StatsPanelArgs) => {

  const {
    userId,
    logUserId,
    requestId,
    insertionId,
    promotedRank,
    retrievalRank,
    pClick,
    pPurchase,
    queryRelevance,
    personalization,
  } = introspectionStats

  const ids = [
    ['User ID', userId],
    ['Log User ID', logUserId],
    ['Request ID', requestId],
    ['Insertion ID', insertionId],
  ]
  const ranks = [
    ['Promoted', promotedRank],
    ['Retrieval', `${retrievalRank} (${
      relativeFormat((retrievalRank ?? 0) - (promotedRank ?? 0))
    })`],
  ]
  const stats = [
    ['p(Click)', pClick],
    ['p(Purchase)', pPurchase],
    ['30 Day Impr', queryRelevance],
    ['CTR', queryRelevance],
    ['Post-Click CVR', queryRelevance],
    ['Personalization', personalization],
    ['Price', queryRelevance],
  ]
  const headerStyle = {
    borderBottom: '1px solid grey',
    gridColumn: '1 / 5',
  }
  const itemLabelStyle = {
    gridColumn: '1 / 3',
    textAlign: 'right',
  }
  const itemContentStyle = {
    gridColumn: '3 / 5',
  }
  const introspectionRows = (
    title: string,
    content: (string | number | undefined)[][],
    labelColumns: any,
    contentColumns: any
  ) => (<>
    <Box sx={headerStyle}>
      <Typography>{title}</Typography>
    </Box>
    {content.map((item) => (<>
      <Box sx={{ ...itemLabelStyle, gridColumn: labelColumns }}>
        <Typography>{item[0]}:</Typography>
      </Box>
      <Box sx={{ ...itemContentStyle, gridColumn: contentColumns }}>
        <Typography>{item[1] ?? '-'}</Typography>
      </Box>
    </>))}
  </>)

  const [copyButtonVisible, setCopyButtonVisible] = useState(true)
  const handleCopyIds = () => {
    setCopyButtonVisible(false)
    handleCopyButtonVisibilityChange(false)
    setTimeout(() => {
      setCopyButtonVisible(true)
      handleCopyButtonVisibilityChange(true)
    }, 2000)
  }

  const handleRequestReport = () => {
    const link = document.createElement('a')
    link.href = `mailto:introspection@promoted.ai?subject=${
      encodeURIComponent('Introspection Report Request')
    }&body=${
      encodeURIComponent(JSON.stringify({ userId, logUserId, requestId, insertionId }))
    }`
    link.click()
  }

  return (
    <Box
      sx={{
        gridTemplateColumns: 'repeat(4, 1fr)',
        ...tabContentContainerStyle(theme)
      }}
    >
      {introspectionRows('IDs', ids, '1 / 2', '2 / 5')}
      {introspectionRows('Ranks', ranks, '1 / 3', '3 / 5')}
      {introspectionRows('Statistics', stats, '1 / 3', '3 / 5')}

      <Box sx={buttonContainerStyle(theme)}>
        {copyButtonVisible
          ? <Button onClick={handleCopyIds} sx={buttonStyle(theme)} variant='outlined'>Copy</Button>
          : <Box
              sx={{
                alignContent: 'center',
                display: 'inline-grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                marginRight: '8px',
                verticalAlign: 'middle',
              }}
            >
              <Box sx={{ gridColumn: '1 / 2', marginRight: '4px' }}>
                <Checkmark/>
              </Box>
              <Typography sx={{ fontSize: 14, gridColumn: '2 / 4' }}>Copied</Typography>
            </Box>
        }
        <Button onClick={handleRequestReport} sx={buttonStyle(theme)} variant='outlined'>
          Request Report...
        </Button>
        <Button onClick={handleClose} sx={buttonStyle(theme)} variant='contained'>
          Close
        </Button>
      </Box>
    </Box>
  )
}

interface PropertiesPanelArgs {
  handleClose: () => any
  theme: Theme
}

const PropertiesPanel = ({
  handleClose,
  theme,
}: PropertiesPanelArgs) => {
  const tableContainerStyle = {
    maxHeight: '400px',
    width: '100%',
  }

  const propertiesTable = (props: (string | number)[][]) => (
    <TableContainer sx={tableContainerStyle}>
      <Table size='small'>
        <TableBody>
          {props.map((row) => (
            <TableRow key={row[0]}>
              <TableCell><Typography>{row[0]}</Typography></TableCell>
              <TableCell><Typography>{row[1]}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  const [itemPropertiesOpen, setItemPropertiesOpen] = useState(false)
  const handleItemPropertiesToggle = () => {
    setItemPropertiesOpen(!itemPropertiesOpen)
  }
  const [queryPropertiesOpen, setQueryPropertiesOpen] = useState(false)
  const handleQueryPropertiesToggle = () => {
    setQueryPropertiesOpen(!queryPropertiesOpen)
  }
  const handleDownloadProperties = () => {
    const link = document.createElement('a')
    link.download = 'properties.csv'
    link.href = './properties.csv'
    link.click()
  }

  const itemProps = [
    ["Feature TPT Haversine Distance Miles", 0.0036],
    ["Feature Response Insertion Position", 0.0079],
    ["Feature Personalize BOOTSTRAP31 Score", 0.0013],
    ["Feature TPT Search Score", 0.0050],
    ["Feature TPT Zoom Box Area", 0.0065],
    ["Feature Personalize Bootstrap N", 0.0039],
    ["Item Rate Smooth Navigate Impression 30DAY", 0.0099],
    ["Feature Personalize BOOTSTRAP21 Score", 0.0038],
    ["Item Elevation", 3.0290],
    ["Feature Personalize Bootstrap Score", 0.0309],
    ["Feature Personalize BOOTSTRAP31 Rank", 0.0080],
    ["Item Rate Smooth Navigate Impression 7DAY", 0.0063],
    ["Item Rate Raw Navigate Impression 30DAY", 0.0269],
    ["Feature Device Type", 0.009],
    ["Feature Personalize BOOTSTRAP21N", 0.006],
    ["Item Rate Raw Navigate Impression 7DAY", 0.0109],
    ["Item Rate Smooth Checkout Impression 7DAY", 0.0145],
    ["Feature Personalize Bootstrap Rank", 0.0029],
    ["Feature User Agent Is iOS", 0.0172],
    ["Feature Response Paging Size", 0.0296],
    ["Item Rate Smooth Checkout Impression 30DAY", 0.0370],
    ["Item Rate Smooth Purchase Navigate 7DAY", 0.0105],
    ["Feature Personalize BOOTSTRAP31N", 0.0073],
    ["Item Rate Raw Purchase Impression 30DAY", 0.0029],
    ["Item Max Vehicles", 0.0172],
    ["Feature TPT Has Zoom Box", 0.0296],
    ["Item Count Checkout 30DAY", 0.037],
    ["Item Rate Raw Checkout Navigate 7DAY", 0.0296],
  ]

  return (
    <Box>
      <List sx={{ width: '100%' }}>
        <ListItemButton onClick={handleItemPropertiesToggle}>
          <ListItemText primary="Item Properties" primaryTypographyProps={{ fontWeight: 'bold' }}/>
          {itemPropertiesOpen ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={itemPropertiesOpen} unmountOnExit>
          {propertiesTable(itemProps)}
        </Collapse>
        <ListItemButton onClick={handleQueryPropertiesToggle}>
          <ListItemText primary="Query Properties" primaryTypographyProps={{ fontWeight: 'bold' }}/>
          {queryPropertiesOpen ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={queryPropertiesOpen} unmountOnExit>
          {propertiesTable(itemProps)}
        </Collapse>
      </List>
      <Box sx={{ padding: '0 20px 20px 20px', ...buttonContainerStyle(theme) }}>
        <Button onClick={handleDownloadProperties} sx={buttonStyle(theme)} variant='outlined'>
          Download...
        </Button>
        <Button onClick={handleClose} sx={buttonStyle(theme)} variant='contained'>
          Close
        </Button>
      </Box>
    </Box>
  )
}

interface ModerationPanelArgs {
  handleClose: () => any
  theme: Theme
}

const ModerationPanel = ({
  handleClose,
  theme,
}: ModerationPanelArgs) => {
  const moderationItemLabelStyle = {
    gridColumn: '1 / 2',
    textAlign: 'right',
  }
  const moderationItemContentStyle = {
    gridColumn: '2 / 5',
  }
  const radioStyle = {
    padding: '0 8px',
  }

  const [moderationScope, setModerationScope] = useState('global')
  const handleModerationScopeChange = (e: SelectChangeEvent<string>) => {
    setModerationScope(e.target.value)
  }
  const [moderationAction, setModerationAction] = useState('send-to-review')
  const handleModerationActionChange = (e: SelectChangeEvent<string>) => {
    setModerationAction(e.target.value)
  }
  const [rankChangePercent, setRankChangePercent] = useState(0)
  const handleRankChangePercentChange = (_: Event, newValue: number) => {
    setRankChangePercent(newValue)
  }

  return (
    <Box
      sx={{
        gridTemplateColumns: 'repeat(4, 1fr)',
        ...tabContentContainerStyle(theme)
      }}
    >
      <Box sx={{ marginTop: '8px', ...moderationItemLabelStyle }}>
        <Typography>Scope:</Typography>
      </Box>
      <Box sx={moderationItemContentStyle}>
        <FormControl fullWidth size='small'>
          <Select
            onChange={handleModerationScopeChange}
            value={moderationScope}
          >
            <MenuItem value={'global'}>Global</MenuItem>
            <MenuItem value={'current-query'}>Current Query</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ lineHeight: '1' }}>
          <Typography variant='caption'>{
            moderationScope == 'global'
            ? 'Apply to results from all queries'
            : `Apply to results from current query: ${window.location.pathname}`
          }</Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: '3px', ...moderationItemLabelStyle }}>
        <Typography>Action:</Typography>
      </Box>
      <Box sx={moderationItemContentStyle}>
        <FormControl>
          <RadioGroup
            name='moderation-action-group'
            onChange={handleModerationActionChange}
            value={moderationAction}
          >
            <FormControlLabel
              control={<Radio sx={radioStyle}/>}
              label='Send to Review'
              value='send-to-review'
            />
            <FormControlLabel
              control={<Radio sx={radioStyle}/>}
              label='Shadowban'
              value='shadowban'
            />
            <FormControlLabel
              control={<Radio sx={radioStyle}/>}
              value='change-rank'
              label={`Change Rank: ${relativeFormat(rankChangePercent)}%`}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Slider
        disabled={moderationAction != 'change-rank'}
        onChange={handleRankChangePercentChange}
        marks={[
          { value: -100, label: '–100%', },
          { value: 100, label: '+100%', },
        ]}
        max={100}
        min={-100}
        step={1}
        sx={{
          gridColumn: '2 / 5',
          width: '90%',
        }}
        value={rankChangePercent}
      />

      <Box sx={buttonContainerStyle(theme)}>
        <Button sx={buttonStyle(theme)} variant='outlined'>
          Apply
        </Button>
        <Button onClick={handleClose} sx={buttonStyle(theme)} variant='contained'>
          Close
        </Button>
      </Box>
    </Box>
  )
}

export interface CellPopupArgs {
  introspectionStats: IntrospectionStats
  handleClose: () => any
}

export const CellPopup = ({
  introspectionStats,
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
  const handleTabChange = (_: Event, newTabIndex: number) => {
    setTabIndex(newTabIndex)
  }
  const [promotedLogoVisible, setPromotedLogoVisible] = useState(true)
  const handleCopyButtonVisibilityChange = (visible: boolean) => {
    setPromotedLogoVisible(visible)
  }

  return (<ThemeProvider theme={theme}>
    <Box sx={outerContainer}>
      <Box boxShadow={4} sx={innerContainer}>
        <Box sx={callout}/>
        <Tabs onChange={handleTabChange} value={tabIndex} variant='scrollable'>
          <Tab label='Stats'/>
          <Tab label='Properties'/>
          <Tab label='Moderation'/>
          <Tab label='Moderation Log'/>
        </Tabs>
        {promotedLogoVisible &&
          <img
            style={promotedLogo}
            src='https://avatars.githubusercontent.com/t/3500892?s=280&v=4'
          />
        }

        {tabIndex == 0 && (
          <StatsPanel
            introspectionStats={introspectionStats}
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
