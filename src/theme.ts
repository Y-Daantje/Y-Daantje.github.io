import { createTheme } from '@mui/material/styles';

// Calm, warm palette: paper background, ink text, clay accent, sage support.
export const palette = {
  paper: '#F5F3EE',
  surface: '#FFFFFF',
  ink: '#151515',
  muted: '#5E5B55',
  line: 'rgba(21, 21, 21, 0.10)',
  clay: '#C2593F',
  sage: '#7C9A86',
  night: '#16181B',
};

const headingFont = '"Space Grotesk Variable", "Inter Variable", system-ui, sans-serif';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: palette.clay, contrastText: '#fff' },
    secondary: { main: palette.sage },
    background: { default: palette.paper, paper: palette.surface },
    text: { primary: palette.ink, secondary: palette.muted },
    divider: palette.line,
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Inter Variable", system-ui, sans-serif',
    h1: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95 },
    h2: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h3: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.02em' },
    h4: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontFamily: headingFont, fontWeight: 600 },
    h6: { fontFamily: headingFont, fontWeight: 600 },
    overline: { fontWeight: 600, letterSpacing: '0.18em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 24, paddingBlock: 12 },
        outlined: { borderColor: palette.line, color: palette.ink },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 999, fontWeight: 500 } },
    },
    MuiLink: { defaultProps: { underline: 'none' } },
  },
});
