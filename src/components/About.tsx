import { useRef } from 'react';
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import SectionHeading from './SectionHeading';
import CountUp from './reactbits/CountUp';
import { profile, projects, tools } from '../data';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';
import { palette } from '../theme';

const stats = [
  { value: projects.length, suffix: '+', label: 'Projects shipped' },
  { value: tools.length, suffix: '', label: 'Technologies' },
  { value: 24, suffix: 'h', label: 'Response time' },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Words light up one by one while scrolling through the paragraph.
        gsap.fromTo(
          '.about-word',
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        );

        gsap.from('.about-stat', {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
        });
      });
    },
    { scope: root },
  );

  return (
    <Box ref={root} component="section" id="about" sx={{ py: { xs: 12, md: 18 } }}>
      <Container maxWidth="lg">
        <SectionHeading index="01" eyebrow="About me" title="Design meets code." />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: { xs: 4, md: 10 } }}>
          <Stack spacing={2} sx={{ order: { xs: 2, md: 1 } }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
              Find me on
            </Typography>
            {profile.socials.map(s => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1.5,
                  borderBottom: `1px solid ${palette.line}`,
                  color: 'text.primary',
                  fontWeight: 500,
                  '& svg': { transition: 'transform .35s cubic-bezier(.2,.8,.2,1)' },
                  '&:hover': { color: 'primary.main' },
                  '&:hover svg': { transform: 'rotate(45deg)' },
                }}
              >
                {s.label}
                <ArrowOutwardRoundedIcon fontSize="small" />
              </Link>
            ))}
          </Stack>

          <Typography
            className="about-text"
            sx={{ order: { xs: 1, md: 2 }, fontFamily: 'h1.fontFamily', fontSize: { xs: 24, md: 34 }, lineHeight: 1.35, letterSpacing: '-0.015em', fontWeight: 500 }}
          >
            {profile.about.split(' ').map((w, i) => (
              <span key={i} className="about-word">
                {w}{' '}
              </span>
            ))}
          </Typography>
        </Box>

        <Box className="about-stats" sx={{ mt: { xs: 8, md: 12 }, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
          {stats.map(s => (
            <Box
              key={s.label}
              className="about-stat"
              sx={{ p: 4, borderRadius: '24px', bgcolor: 'background.paper', border: `1px solid ${palette.line}` }}
            >
              <Typography sx={{ fontFamily: 'h1.fontFamily', fontSize: { xs: 48, md: 64 }, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>
                <CountUp to={s.value} duration={2} />
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {s.suffix}
                </Box>
              </Typography>
              <Typography sx={{ mt: 1.5, color: 'text.secondary' }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
