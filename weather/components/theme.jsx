'use client'
import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette:{
    primary:{
      main:"#17a420",
      light:"#56D16B",
      dark:"#037F03",
      contrastText:"#FFFFFF",
    },
    divider:'gray',
  },
  components:{
    MuiButton:{
      defaultProps:{
        variant:'contained',
      }
    },
    MuiDialog:{
      styleOverrides:{
        paper:{
          background: 'linear-gradient(to right, #DAE7F3, #D4E9F2,#D5DDE2)',
          borderRadius:'15px',
        },  
      },
    },
    MuiCard:{
      styleOverrides:{
        root:{
          background:"linear-gradient(to top right, #90CAF9, #81D4FA, #B2EBF2)"
        },
      },
    },
    MuiTabs:{
      styleOverrides:{
        indicator:{
          height:5,
          borderTopRightRadius:100,
          borderTopLeftRadius:100,
        },
        root:{
          minHeight:0,
        },
      },
    },
    MuiTab:{
      styleOverrides:{
        root:{
          padding:10,
          minHeight:0,
          textTransform:'none',
          fontWeight:600,
        }
      }
    },
    MuiMenu:{
      styleOverrides:{
        paper:{
          backgroundColor:'lightblue',
          height:300,
          borderRadius:10,
        },
      }
    },
  },
  breakpoints:{
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
})