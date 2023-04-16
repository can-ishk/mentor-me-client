import { createTheme } from "@mui/material";
import { purple, grey, deepOrange, deepPurple } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    mode:"dark",
    primary: grey,
    divider: deepPurple[700],
    background: {
      default: deepPurple[900],
      paper: deepPurple[900],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            padding: theme.spacing(2),
            borderWidth: "1.5px",
            borderRadius: 10
          },
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});

export default theme;
