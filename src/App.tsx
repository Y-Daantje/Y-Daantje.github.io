import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { theme, palette } from './theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

const globalStyles = (
  <GlobalStyles
    styles={{
      html: { scrollBehavior: 'auto' },
      body: { overflowX: 'hidden' },
      '::selection': { background: palette.clay, color: '#fff' },
      '.split-parent, .hero-tagline': { font: 'inherit', margin: 0 },
      '@keyframes spin': { to: { transform: 'rotate(360deg)' } },
      '@keyframes ping': { '75%, 100%': { transform: 'scale(2.4)', opacity: 0 } },
      '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': { animationDuration: '0.01ms !important', animationIterationCount: '1 !important' },
      },
    }}
  />
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </ThemeProvider>
  );
}
