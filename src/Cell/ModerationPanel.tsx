import { Box, Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Slider, Typography } from '@mui/material'
import { Theme } from '@mui/system'
import { useState } from 'react'
import { formatting } from './formatting'
import { styles } from './styles'

export interface ModerationPanelArgs {
  handleClose: () => any
  theme: Theme
}

class moderationStyles {
  static itemLabel = {
    gridColumn: '1 / 2',
    textAlign: 'right',
  }
  static itemContent = {
    gridColumn: '2 / 5',
  }
  static radio = {
    padding: '0 8px',
  }
}

export const ModerationPanel = ({
  handleClose,
  theme,
}: ModerationPanelArgs) => {

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
        ...styles.tabContentContainer(theme)
      }}
    >
      <Box sx={{ marginTop: '8px', ...moderationStyles.itemLabel }}>
        <Typography>Scope:</Typography>
      </Box>
      <Box sx={moderationStyles.itemContent}>
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

      <Box sx={{ marginTop: '3px', ...moderationStyles.itemLabel }}>
        <Typography>Action:</Typography>
      </Box>
      <Box sx={moderationStyles.itemContent}>
        <FormControl>
          <RadioGroup
            name='moderation-action-group'
            onChange={handleModerationActionChange}
            value={moderationAction}
          >
            <FormControlLabel
              control={<Radio sx={moderationStyles.radio}/>}
              label='Send to Review'
              value='send-to-review'
            />
            <FormControlLabel
              control={<Radio sx={moderationStyles.radio}/>}
              label='Shadowban'
              value='shadowban'
            />
            <FormControlLabel
              control={<Radio sx={moderationStyles.radio}/>}
              value='change-rank'
              label={`Change Rank: ${formatting.difference(rankChangePercent)}%`}
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

      <Box sx={styles.buttonContainer(theme)}>
        <Button sx={styles.button(theme)} variant='outlined'>
          Apply
        </Button>
        <Button onClick={handleClose} sx={styles.button(theme)} variant='contained'>
          Close
        </Button>
      </Box>
    </Box>
  )
}
