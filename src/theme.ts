import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  media: {
    mobile: `(max-width: 900px)`,
  },
  elevation: {
    1: '0 1px 3px hsla(0, 0%, 0%, 0.2)',
    2: '0 3px 5px hsla(0, 0%, 0%, 0.2)',
  },
  colors: {
    neutral: {
      900: '#102A43',
      800: '#243B53',
      700: '#334E68',
      600: '#486581',
      500: '#627D98',
      400: '#829AB1',
      300: '#9FB3C8',
      200: '#BCCCDC',
      100: '#D9E2EC',
      50: '#F0F4F8',
    },
    primary: {
      900: '#003E6B',
      800: '#0A558C',
      700: '#0F609B',
      600: '#186FAF',
      500: '#2680C2',
      400: '#4098D7',
      300: '#62B0E8',
      200: '#84C5F4',
      100: '#B6E0FE',
      50: '#DCEEFB',
    },
  },
};

export default theme;
