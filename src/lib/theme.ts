import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
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
          borderRadius: '20px',
          borderWidth: '5px',
          borderColor: 'purple.400',
          boxShadow: '6px 6px rgba(214, 188, 250, 0.8)',
        },
      },
    },
  },
});
