import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Checkmark } from './Checkmark'
import { styles } from './styles'

interface CopyButtonArgs {
  handleCopy: () => void
  copyButtonVisible?: boolean
  label?: string
  finishedLabel?: string
}

const useStyles = makeStyles({
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
})

const useSharedStyles = makeStyles(styles)

export const CopyButton = ({
  handleCopy,
  copyButtonVisible,
  label = 'Copy',
  finishedLabel = 'Copied',
}: CopyButtonArgs) => {
  const classes = useStyles()
  const sharedClasses = useSharedStyles()

  return copyButtonVisible ? (
    <Button className={sharedClasses.button} onClick={handleCopy} variant="outlined">
      {label}
    </Button>
  ) : (
    <Box className={classes.copied}>
      <Box className={classes.copied__inner}>
        <Checkmark />
      </Box>
      <Typography className={classes.copied__text}>{finishedLabel}</Typography>
    </Box>
  )
}
