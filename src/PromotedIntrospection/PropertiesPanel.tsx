import React from 'react'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core'
import { Theme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { useState } from 'react'
import { styles } from './styles'

export interface PropertiesPanelArgs {
  handleClose: () => any
  theme: Theme
}

const propertiesStyles = {
  tableContainer: {
    maxHeight: '400px',
    width: '100%',
  },
  ctas: {
    padding: '0 20px 20px 20px',
  },
  list: {
    width: '100%',
  },
  listItemText: {
    fontWeight: 'bold',
  } as CSSProperties,
}

const useStyles = makeStyles(propertiesStyles)
const useSharedStyles = makeStyles(styles)

const fakeItemProps = [
  ['Feature Haversine Distance Miles', 0.0036],
  ['Feature Response Insertion Position', 0.0079],
  ['Feature Personalize BOOTSTRAP31 Score', 0.0013],
  ['Feature Search Score', 0.005],
  ['Feature Zoom Box Area', 0.0065],
  ['Feature Personalize Bootstrap N', 0.0039],
  ['Item Rate Smooth Navigate Impression 30DAY', 0.0099],
  ['Feature Personalize BOOTSTRAP21 Score', 0.0038],
  ['Item Elevation', 3.029],
  ['Feature Personalize Bootstrap Score', 0.0309],
  ['Feature Personalize BOOTSTRAP31 Rank', 0.008],
  ['Item Rate Smooth Navigate Impression 7DAY', 0.0063],
  ['Item Rate Raw Navigate Impression 30DAY', 0.0269],
  ['Feature Device Type', 0.009],
  ['Feature Personalize BOOTSTRAP21N', 0.006],
  ['Item Rate Raw Navigate Impression 7DAY', 0.0109],
  ['Item Rate Smooth Checkout Impression 7DAY', 0.0145],
  ['Feature Personalize Bootstrap Rank', 0.0029],
  ['Feature User Agent Is iOS', 0.0172],
  ['Feature Response Paging Size', 0.0296],
  ['Item Rate Smooth Checkout Impression 30DAY', 0.037],
  ['Item Rate Smooth Purchase Navigate 7DAY', 0.0105],
  ['Feature Personalize BOOTSTRAP31N', 0.0073],
  ['Item Rate Raw Purchase Impression 30DAY', 0.0029],
  ['Item Max Vehicles', 0.0172],
  ['Feature Has Zoom Box', 0.0296],
  ['Item Count Checkout 30DAY', 0.037],
  ['Item Rate Raw Checkout Navigate 7DAY', 0.0296],
]

export const PropertiesPanel = ({ handleClose, theme }: PropertiesPanelArgs) => {
  const sharedClasses = useSharedStyles(theme)
  const classes = useStyles()

  const propertiesTable = (props: (string | number)[][]) => (
    <TableContainer className={classes.tableContainer}>
      <Table size="small">
        <TableBody>
          {props.map((row) => (
            <TableRow key={row[0]}>
              <TableCell>
                <Typography>{row[0]}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{row[1]}</Typography>
              </TableCell>
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
      <List className={classes.list}>
        <ListItem button onClick={handleItemPropertiesToggle}>
          <ListItemText className={classes.listItemText} primary="Item Properties" />
          {itemPropertiesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={itemPropertiesOpen} unmountOnExit>
          {propertiesTable(fakeItemProps)}
        </Collapse>
        <ListItem button onClick={handleQueryPropertiesToggle}>
          <ListItemText className={classes.listItemText} primary="Query Properties" />
          {queryPropertiesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={queryPropertiesOpen} unmountOnExit>
          {propertiesTable(fakeItemProps)}
        </Collapse>
      </List>
      <Box className={`${sharedClasses.buttonContainer} ${classes.ctas}`}>
        <Button className={sharedClasses.button} onClick={handleDownloadProperties} variant="outlined">
          Download...
        </Button>
        <Button className={sharedClasses.button} onClick={handleClose} variant="contained">
          Close
        </Button>
      </Box>
    </Box>
  )
}
