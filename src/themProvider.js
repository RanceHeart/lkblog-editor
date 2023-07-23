// theme.js
import {createTheme} from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // light purple
    },
    secondary: {
      main: '#f50057', // pink
    },
    background: {
      default: '#ffffff', // white
    },
    text: {
      primary: '#000000', // black
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          ':root': {
            '--ck-color-primary': '#3f51b5', // light purple
            '--ck-color-background': '#ffffff', // white
            '--ck-color-text': '#000000', // black
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(255,255,255,0.8)',
    },
    secondary: {
      main: '#1fb622',
    },
    background: {
      default: '#303030',
    },
    text: {
      primary: '#ffffff', // white
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          ':root': {
            '--ck-color-primary': '#eeeeee', // dark purple
            '--ck-color-background': '#303030', // dark grey
            '--ck-color-text': '#ffffff', // white
            '--ck-color-panel-background': '#303030',
            '--ck-color-tooltip-background': 'hsl(252, 7%, 14%)',
          },
        },
      },
    },
  },
});

// Base1: 393E46 6D9886 F2E7D5 F7F7F7
// #393e46 #585d65 #6b7079 #9399a2 #b3b9c2 #d6dce6 #e5ebf5 #eef4fe #f4faff
// #6d9886 #7daa98 #9cc2b4 #c0dad0 #e5f0ec
// #f2e7d5
// #f7f7f7 #fbfbfb


// Base2: 272343 FFFFFF E3F6F5 BAE8E8
// #272343 #34325b #3c3b68 #444473 #4b4c7b #62658c #7c809f #9fa3bb #c4c7d7 #e8e9ee
// #FFFFFF
// #E3F6F5
// #bae8e8
export {lightTheme, darkTheme};
