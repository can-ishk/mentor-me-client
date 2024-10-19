import { createTheme } from "@mui/material";
import { purple, grey, deepOrange, deepPurple } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    mode:"light",
    primary: deepOrange,
    // divider: "#fff",
    // divider: "#192731",
    background: {
      // default: "#00101b",
      // paper: "#00090d",
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: '#000',
      secondary: "#000",
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
            maxWidth: '98vw',
            padding: theme.spacing(2),
            borderWidth: "1.5px",
            borderRadius: 10
          },
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg"        
      },
    },
  },
});

export default theme;
