import { blue } from "@mui/material/colors"
import { Theme } from "@mui/system"

export class styles {

  static button = (theme: Theme) => ({
    "&.MuiButton-contained": {
      background: blue[700],
      color: "white"
    },
    marginLeft: theme.spacing(1),
  })

  static tabContentContainer = (theme: Theme) => ({
    columnGap: theme.spacing(1),
    display: 'grid',
    padding: '10px 20px 20px 20px',
    rowGap: theme.spacing(1),
  })

  static buttonContainer = (theme: Theme) => ({
    alignContent: 'center',
    gridColumn: '1 / 5',
    marginTop: theme.spacing(1),
    textAlign: 'right',
  })
}
