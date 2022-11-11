import React from 'react'
import { Box, Button, makeStyles, Typography, Tooltip } from '@material-ui/core'
import { Theme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { useState } from 'react'
import { styles } from './styles'
import { IntrospectionData } from './types'
import { IntrospectionIds } from './Popup'
import copy from 'copy-to-clipboard'
import { ranks, statistics } from '../constants'
import { CopyButton } from './CopyButton'

export interface StatsPanelArgs {
  introspectionIds: IntrospectionIds[]
  introspectionData: IntrospectionData
  handleClose: () => any
  theme: Theme
}

export interface StatsPanelRow {
  label: string
  value?: any | ((data: IntrospectionData) => any)
  tooltip?: string
}

const statsStyles = {
  header: {
    borderBottom: '1px solid grey',
    gridColumn: '1 / 5',
  },
  itemLabel: {
    gridColumn: '1 / 3',
    textAlign: 'right',
  } as CSSProperties,
  itemContent: {
    gridColumn: '3 / 5',
  },
  copied: {
    alignContent: 'center',
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginRight: '8px',
    verticalAlign: 'middle',
  },
  copied__inner: {
    gridColumn: '1 / 2',
    marginRight: '4px',
  },
  copied__text: {
    fontSize: 14,
    gridColumn: '2 / 4',
  },
}

const useSharedStyles = makeStyles(styles)
const useStyles = makeStyles(statsStyles)

export const StatsPanel = ({ introspectionData, introspectionIds, handleClose, theme }: StatsPanelArgs) => {
  const sharedClasses = useSharedStyles(theme)
  const classes = useStyles(theme)

  const introspectionRows = (
    title: string,
    content: StatsPanelRow[],
    labelColumns: any,
    contentColumns: any,
    introspectionData: IntrospectionData
  ) => (
    <>
      <Box className={classes.header}>
        <Typography>{title}</Typography>
      </Box>
      {content?.map((item) => {
        const value = typeof item.value === 'function' ? item.value(introspectionData) : item.value
        return (
          <React.Fragment key={item.label}>
            <Box sx={{ ...statsStyles.itemLabel, gridColumn: labelColumns }}>
              <Typography>
                {item.tooltip && (
                  <Tooltip arrow title={item.tooltip}>
                    <span>{item.label}</span>
                  </Tooltip>
                )}
              </Typography>
              {!item.tooltip && <Typography>{item.label}</Typography>}
            </Box>
            <Box sx={{ ...statsStyles.itemContent, gridColumn: contentColumns }}>
              <Typography>{value || '-'}</Typography>
            </Box>
          </React.Fragment>
        )
      })}
    </>
  )

  const [copyButtonVisible, setCopyButtonVisible] = useState(true)
  const handleCopyIds = () => {
    setCopyButtonVisible(false)
    copy(
      JSON.stringify({
        ids: introspectionIds.map((id) => ({
          label: id.label,
          value: id.value ?? '-',
        })),
        ranks: ranks.map((rank) => ({
          label: rank.label,
          value: rank.value(introspectionData) ?? '-',
        })),
        statistics: statistics.map((statistic) => ({
          label: statistic.label,
          value: statistic.value(introspectionData) ?? '-',
        })),
      })
    )
    setTimeout(() => {
      setCopyButtonVisible(true)
    }, 2000)
  }

  const handleRequestReport = () => {
    const link = document.createElement('a')
    link.href = `mailto:introspection@promoted.ai?subject=${encodeURIComponent(
      'Introspection Report Request'
    )}&body=${encodeURIComponent(
      JSON.stringify(introspectionIds?.reduce((acc, { label, value }) => ({ ...acc, [label]: value }), {}))
    )}`
    link.click()
  }

  return (
    <Box className={`${sharedClasses['tabContentContainer']} ${sharedClasses['tabContentContainer--equal-columns']}`}>
      {introspectionRows('IDs', introspectionIds, '1 / 2', '2 / 5', introspectionData)}
      {introspectionRows('Ranks', ranks, '1 / 3', '3 / 5', introspectionData)}
      {introspectionRows('Statistics', statistics, '1 / 3', '3 / 5', introspectionData)}

      <Box className={sharedClasses.buttonContainer}>
        <CopyButton copyButtonVisible={copyButtonVisible} handleCopyIds={handleCopyIds} />
        <Button className={sharedClasses.button} onClick={handleRequestReport} variant="outlined">
          Request Report...
        </Button>
        <Button onClick={handleClose} className={sharedClasses.button} variant="contained">
          Close
        </Button>
      </Box>
    </Box>
  )
}
