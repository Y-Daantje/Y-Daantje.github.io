import { Box, Typography } from '@mui/material';
import SplitText from './reactbits/SplitText';

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  light?: boolean;
};

export default function SectionHeading({ index, eyebrow, title, light }: Props) {
  return (
    <Box sx={{ mb: { xs: 5, md: 8 } }}>
      <Typography
        variant="overline"
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: light ? 'rgba(255,255,255,0.6)' : 'text.secondary' }}
      >
        <Box component="span" sx={{ color: 'primary.main' }}>
          {index}
        </Box>
        <Box component="span" sx={{ width: 32, height: '1px', bgcolor: 'currentColor', opacity: 0.4 }} />
        {eyebrow}
      </Typography>
      <Typography variant="h2" component="div" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, color: light ? '#fff' : 'text.primary' }}>
        <SplitText text={title} tag="h2" splitType="words" effect="rise" mask delay={60} duration={0.9} textAlign="left" />
      </Typography>
    </Box>
  );
}
