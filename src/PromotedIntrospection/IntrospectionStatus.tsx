import { WbSunny } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

interface IntrospectionStatusArgs {
  className?: string
  status?: 'ACTIVE' | 'SHADOW' | 'DISABLED' | 'NOT_CONFIGURED'
}

const statuses = {
  ACTIVE: {
    label: 'Active',
    color: 'green',
  },
  SHADOW: {
    label: 'Shadow',
    color: 'orange',
  },
  DISABLED: {
    label: 'Disabled',
    color: 'red',
  },
  NOT_CONFIGURED: {
    label: 'Not Configured',
    color: 'black',
  },
}

const useStyles = makeStyles({
  label: {
    marginRight: '10px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '15px 0',
  },
})

export const IntrospectionStatus = ({ className = '', status = 'NOT_CONFIGURED' }: IntrospectionStatusArgs) => {
  const classes = useStyles()

  const label = statuses[status]?.label || 'Not Configured'
  const color = statuses[status]?.color || 'black'

  return (
    <span className={`${classes.container} ${className}`}>
      <span className={classes.label}>{label}</span> <WbSunny style={{ color, fontSize: '20px' }} />
    </span>
  )
}
