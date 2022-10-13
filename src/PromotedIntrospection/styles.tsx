import blue from '@material-ui/core/colors/blue'
import { Theme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

export const styles = (theme: Theme) => ({
  button: {
    '&.MuiButton-contained': {
      background: blue[700],
      color: 'white',
    },
    fontSize: '12px',
    marginLeft: theme.spacing(1),
  },
  tabContentContainer: {
    columnGap: theme.spacing(1),
    display: 'grid',
    padding: '10px 20px 20px 20px',
    rowGap: theme.spacing(1),
  },
  buttonContainer: {
    alignContent: 'center',
    gridColumn: '1 / 5',
    marginTop: theme.spacing(1),
    textAlign: 'right',
    marginLeft: 'auto',
  } as CSSProperties,
})
