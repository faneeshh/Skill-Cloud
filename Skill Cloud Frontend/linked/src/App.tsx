import { useState } from 'react';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import Store from './Store';
import { Provider } from 'react-redux';
import { getItem } from './Services/LocalStorageService';
import AppRoutes from './Pages/AppRoutes';

function App() {
  const theme = createTheme({
    focusRing: 'never',
    primaryColor: 'kashmir-blue',
    primaryShade: 4,
    colors: {
      'mine-shaft': [
        '#f6f6f6',
        '#e7e7e7',
        '#d1d1d1',
        '#b0b0b0',
        '#888888',
        '#6d6d6d',
        '#5d5d5d',
        '#4f4f4f',
        '#454545',
        '#3d3d3d',
        '#2d2d2d',
      ],

      'kashmir-blue': [
        '#f5f7fa',
        '#e9eef5',
        '#cfdce8',
        '#a5bfd4',
        '#759dbb',
        '#5381a4',
        '#467095',
        '#35536f',
        '#2f475d',
        '#2b3d4f',
        '#1d2834',
      ],
    },
    fontFamily: 'poppins, sans-serif',
  });
  const [count, setCount] = useState(0);

  return (
    <Provider store={Store}>
    <MantineProvider defaultColorScheme='dark' theme={theme}>
        <Notifications position='top-center' zIndex={1000} />
        <AppRoutes/>
    </MantineProvider>
    </Provider>
  );
}

export default App;
