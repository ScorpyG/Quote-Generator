import { ThemeConfig, extendTheme } from '@chakra-ui/react';
import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      bg: mode('white', 'gray.900')(props),
    },
    // Applying global styles - https://github.com/chakra-ui/chakra-ui/discussions/6478
    '::-webkit-scrollbar': {
      w: '0.375rem',
    },
    '::-webkit-scrollbar-thumb': {
      bgColor: 'rgba(0, 0, 0, 0.16)',
      borderRadius: 'full',
    },
  }),
};

export const generateRandomColor = () => {
  const colorList = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'];
  return colorList[Math.floor(Math.random() * colorList.length)];
};

export const theme = extendTheme({
  config,
  styles,
  semanticTokens: {
    colors: {
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          maxHeight: '95vh',
          width: '95vw',
          borderRadius: '20px',
          borderWidth: '5px',
          borderColor: 'purple.400',
          boxShadow: '6px 6px rgba(214, 188, 250, 0.8)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverFlowStyle: 'none',
          scrollbarWidth: 'none',
        },
      },
    },
  },
});
