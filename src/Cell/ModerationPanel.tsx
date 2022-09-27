import React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { ChangeEvent, useState } from 'react'
import { formatting } from './formatting'
import { styles } from './styles'

export interface ModerationPanelArgs {
  handleClose: () => any
  theme: Theme
}

const useStyles = makeStyles({
  itemLabel: {
    gridColumn: '1 / 2',
    textAlign: 'right',
    marginTop: '3px',
  } as CSSProperties,
  itemContent: {
    gridColumn: '2 / 5',
  },
  radio: {
    padding: '0 8px',
  },
  container: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  slider: {
    gridColumn: '2 / 5',
    width: '90%',
  },
  caption: {
    lineHeight: '1',
  },
})

const useSharedStyles = makeStyles(styles)

export const ModerationPanel = ({ handleClose, theme }: ModerationPanelArgs) => {
  const [moderationScope, setModerationScope] = useState('global')
  const handleModerationScopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModerationScope(e.target.value)
  }
  const [moderationAction, setModerationAction] = useState('send-to-review')
  const handleModerationActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModerationAction(e.target.value)
  }
  const [rankChangePercent, setRankChangePercent] = useState(0)
  const handleRankChangePercentChange = (_: ChangeEvent, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setRankChangePercent(newValue)
    }
  }

  const classes = useStyles()
  const sharedClasses = useSharedStyles(theme)

  return (
    <Box className={`${sharedClasses['tabContentContainer']} ${classes.container}}`}>
      <Box className={classes.itemLabel}>
        <Typography>Scope:</Typography>
      </Box>
      <Box className={classes.itemContent}>
        <FormControl fullWidth size="small">
          <Select onChange={handleModerationScopeChange} value={moderationScope}>
            <MenuItem value={'global'}>Global</MenuItem>
            <MenuItem value={'current-query'}>Current Query</MenuItem>
          </Select>
        </FormControl>
        <Box className={classes.caption}>
          <Typography variant="caption">
            {moderationScope == 'global'
              ? 'Apply to results from all queries'
              : `Apply to results from current query: ${window.location.pathname}`}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.itemLabel}>
        <Typography>Action:</Typography>
      </Box>
      <Box className={classes.itemContent}>
        <FormControl>
          <RadioGroup name="moderation-action-group" onChange={handleModerationActionChange} value={moderationAction}>
            <FormControlLabel
              control={<Radio className={classes.radio} color="primary" />}
              label="Send to Review"
              value="send-to-review"
            />
            <FormControlLabel
              control={<Radio className={classes.radio} color="primary" />}
              label="Shadowban"
              value="shadowban"
            />
            <FormControlLabel
              control={<Radio className={classes.radio} color="primary" />}
              value="change-rank"
              label={`Change Rank: ${formatting.difference(rankChangePercent)}%`}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Slider
        className={classes.slider}
        disabled={moderationAction != 'change-rank'}
        onChange={handleRankChangePercentChange}
        marks={[
          { value: -100, label: '–100%' },
          { value: 100, label: '+100%' },
        ]}
        max={100}
        min={-100}
        step={1}
        value={rankChangePercent}
      />

      <Box className={sharedClasses.buttonContainer}>
        <Button className={sharedClasses.button} onClick={handleClose} variant="contained">
          Close
        </Button>
      </Box>
    </Box>
  )
}
