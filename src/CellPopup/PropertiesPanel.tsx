import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Button, Collapse, FormControl, FormControlLabel, List, ListItemButton, ListItemText, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Slider, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Typography } from '@mui/material'
import { createTheme, Theme, ThemeProvider } from '@mui/system'
import React, { useState } from 'react'
import { Checkmark } from './Checkmark'
import { styles } from './styles'
import { CellIntrospectionData } from './types'

export interface PropertiesPanelArgs {
  handleClose: () => any
  theme: Theme
}

class propertiesStyles {
  static tableContainer = {
    maxHeight: '400px',
    width: '100%',
  }
}

const fakeItemProps = [
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

export const PropertiesPanel = ({
  handleClose,
  theme,
}: PropertiesPanelArgs) => {

  const propertiesTable = (props: (string | number)[][]) => (
    <TableContainer sx={propertiesStyles.tableContainer}>
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

  return (
    <Box>
      <List sx={{ width: '100%' }}>
        <ListItemButton onClick={handleItemPropertiesToggle}>
          <ListItemText primary="Item Properties" primaryTypographyProps={{ fontWeight: 'bold' }}/>
          {itemPropertiesOpen ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={itemPropertiesOpen} unmountOnExit>
          {propertiesTable(fakeItemProps)}
        </Collapse>
        <ListItemButton onClick={handleQueryPropertiesToggle}>
          <ListItemText primary="Query Properties" primaryTypographyProps={{ fontWeight: 'bold' }}/>
          {queryPropertiesOpen ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={queryPropertiesOpen} unmountOnExit>
          {propertiesTable(fakeItemProps)}
        </Collapse>
      </List>
      <Box sx={{ padding: '0 20px 20px 20px', ...styles.buttonContainer(theme) }}>
        <Button onClick={handleDownloadProperties} sx={styles.button(theme)} variant='outlined'>
          Download...
        </Button>
        <Button onClick={handleClose} sx={styles.button(theme)} variant='contained'>
          Close
        </Button>
      </Box>
    </Box>
  )
}
