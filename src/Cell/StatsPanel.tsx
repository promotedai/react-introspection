import React from 'react'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Theme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { useState } from 'react'
import { Checkmark } from './Checkmark'
import { formatting } from './formatting'
import { styles } from './styles'
import { CellIntrospectionData } from './types'

export interface StatsPanelArgs {
  introspectionData: CellIntrospectionData
  handleCopyButtonVisibilityChange: (visible: boolean) => any
  handleClose: () => any
  theme: Theme
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

export const StatsPanel = ({
  introspectionData,
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
  } = introspectionData

  const sharedClasses = useSharedStyles(theme)
  const classes = useStyles(theme)

  const ids = [
    ['User ID', userId],
    ['Log User ID', logUserId],
    ['Request ID', requestId],
    ['Insertion ID', insertionId],
  ]
  const ranks = [
    ['Promoted', promotedRank],
    ['Retrieval', `${retrievalRank} (${formatting.difference((retrievalRank ?? 0) - (promotedRank ?? 0))})`],
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

  const introspectionRows = (
    title: string,
    content: (string | number | undefined)[][],
    labelColumns: any,
    contentColumns: any
  ) => (
    <>
      <Box className={classes.header}>
        <Typography>{title}</Typography>
      </Box>
      {content.map((item) => (
        <>
          <Box sx={{ ...statsStyles.itemLabel, gridColumn: labelColumns }}>
            <Typography>{item[0]}:</Typography>
          </Box>
          <Box sx={{ ...statsStyles.itemContent, gridColumn: contentColumns }}>
            <Typography>{item[1] ?? '-'}</Typography>
          </Box>
        </>
      ))}
    </>
  )

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
    link.href = `mailto:introspection@promoted.ai?subject=${encodeURIComponent(
      'Introspection Report Request'
    )}&body=${encodeURIComponent(JSON.stringify({ userId, logUserId, requestId, insertionId }))}`
    link.click()
  }

  return (
    <Box className={`${sharedClasses['tabContentContainer']} ${sharedClasses['tabContentContainer--equal-columns']}`}>
      {introspectionRows('IDs', ids, '1 / 2', '2 / 5')}
      {introspectionRows('Ranks', ranks, '1 / 3', '3 / 5')}
      {introspectionRows('Statistics', stats, '1 / 3', '3 / 5')}

      <Box className={sharedClasses.buttonContainer}>
        {copyButtonVisible ? (
          <Button className={sharedClasses.button} onClick={handleCopyIds} variant="outlined">
            Copy
          </Button>
        ) : (
          <Box className={classes.copied}>
            <Box className={classes.copied__inner}>
              <Checkmark />
            </Box>
            <Typography className={classes.copied__text}>Copied</Typography>
          </Box>
        )}
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
