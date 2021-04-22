import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
       primary: {
          light: '#57975b',
          main: '#2e7d32',
          dark: '#205723'
       },
       secondary: {
         light: '#015384',
         main: '#0277bd',
         dark: '#3492ca'
       },
    },
    typography: { 
       useNextVariants: true
    }
  });

export default theme;