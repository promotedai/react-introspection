import React, { useEffect, useState } from 'react'
import {
  Box,
  Checkbox,
  Theme,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { styles } from './styles'

export interface ModerationLogPanelArgs {
  handleClose: () => any
  theme: Theme
}

const useStyles = makeStyles({
  container: {
    padding: '10px 20px 20px 20px',
  },
})

export interface LogItem {
  id: string
  user: string
  date: string
  action: string
}

const useSharedStyles = makeStyles(styles)

export const ModerationLogPanel = ({ handleClose, theme }: ModerationLogPanelArgs) => {
  const [checked, setChecked] = useState<{ [k: string]: boolean }>({})
  const [checkedAll, setCheckedAll] = useState<boolean>(false)
  const [logItems, setLogItems] = useState<LogItem[]>([])

  useEffect(() => {
    // MOCK
    const logItemsMock = [
      {
        id: '1',
        user: 'fred',
        date: '2020-01-01 8:00AM',
        action: 'Shadowban',
      },
      {
        id: '2',
        user: 'bob',
        date: '2020-01-01 8:00AM',
        action: 'Shadowban',
      },
    ]
    setLogItems(logItemsMock)

    setChecked(logItemsMock.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}))
  }, [])

  const onCheckAllChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedAll(e.target.checked)
    setChecked(
      logItems.reduce((acc, item) => {
        acc[item.id] = e.target.checked
        return acc
      }, {})
    )
  }

  const onCheckSingleChanged = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    setCheckedAll(false)
    setChecked((prev) => ({
      ...prev,
      [itemId]: e.target.checked,
    }))
  }

  const onDownloadClick = () => {
    const keys = ['user', 'date', 'action']
    const rows = [keys, ...logItems.map((item) => [item[keys[0]], item[keys[1]], item[keys[2]]])]

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    window.open(encodeURI(csvContent))
  }

  const classes = useStyles()
  const sharedClasses = useSharedStyles(theme)

  return (
    <Box className={classes.container}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox color="primary" onChange={onCheckAllChanged} checked={checkedAll} />
              </TableCell>
              <TableCell>User</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logItems?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    color="primary"
                    onChange={(e) => onCheckSingleChanged(e, item.id)}
                    checked={checked[item.id]}
                  />
                </TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell align="right">{item.date}</TableCell>
                <TableCell align="right">{item.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={sharedClasses.buttonContainer}>
        <Button onClick={onDownloadClick} className={sharedClasses.button} variant="outlined">
          Download
        </Button>
        <Button className={sharedClasses.button} variant="outlined">
          Undo...
        </Button>
        <Button className={sharedClasses.button} onClick={handleClose} variant="contained">
          Close
        </Button>
      </Box>
    </Box>
  )
}
