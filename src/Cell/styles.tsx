import { blue } from '@mui/material/colors';
import { Theme } from '@mui/system';

export const styles = {
  button: (theme: Theme) => ({
    '&.MuiButton-contained': {
      background: blue[700],
      color: 'white',
    },
    fontSize: '12px',
    marginLeft: theme.spacing(1),
  }),
  tabContentContainer: (theme: Theme) => ({
    columnGap: theme.spacing(1),
    display: 'grid',
    padding: '10px 20px 20px 20px',
    rowGap: theme.spacing(1),
  }),
  buttonContainer: (theme: Theme) => ({
    alignContent: 'center',
    gridColumn: '1 / 5',
    marginTop: theme.spacing(1),
    textAlign: 'right',
    marginLeft: 'auto',
  }),
};
