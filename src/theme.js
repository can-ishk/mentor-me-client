import { createTheme } from "@mui/material";
import { purple, grey, deepOrange, deepPurple } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    mode:"dark",
    primary: grey,
    // divider: "#fff",
    divider: "#192731",
    background: {
      // default: "#00101b",
      // paper: "#00090d",
      default: "#000",
      paper: "#00101b",
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
        maxWidth: "xl"        
      },
    },
  },
});

export default theme;
