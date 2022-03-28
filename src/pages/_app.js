import '../../styles/globals.css';
import { NextUIProvider, createTheme } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    type: 'light',
    theme: {
      colors: {
        gradient: 'linear-gradient(45deg, $blue500 -20%, $green500 50%)',
      },
    },
  });
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
