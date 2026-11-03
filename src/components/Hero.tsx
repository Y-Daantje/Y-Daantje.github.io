import { useRef } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import SplitText from './reactbits/SplitText';
import BlurText from './reactbits/BlurText';
import Magnet from './reactbits/Magnet';
import { profile } from '../data';
import { gsap, MOTION_OK, scrollToSection, useGSAP } from '../lib/gsap';
import { palette } from '../theme';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Slow drifting background shapes.
        gsap.utils.toArray<HTMLElement>('.blob').forEach((blob, i) => {
          gsap.to(blob, {
            x: gsap.utils.random(-80, 80),
            y: gsap.utils.random(-60, 60),
            scale: gsap.utils.random(0.9, 1.15),
            duration: gsap.utils.random(8, 12),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.6,
          });
        });

        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
        intro
          .from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8 }, 0.3)
          .fromTo(
            '.hero-photo',
            { clipPath: 'inset(100% 0% 0% 0% round 32px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4 },
            0.4,
          )
          .from('.hero-photo img', { scale: 1.3, duration: 1.8 }, 0.4)
          .from('.hero-badge', { scale: 0, rotate: -30, duration: 0.9, ease: 'back.out(1.8)' }, 1.2)
          .from('.hero-cta', { y: 24, opacity: 0, stagger: 0.1, duration: 0.8 }, 1.0)
          .from('.hero-scroll', { opacity: 0, duration: 1 }, 1.6);

        gsap.to('.hero-scroll-dot', { y: 14, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut' });

        // Parallax out as the user scrolls away.
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
          .to('.hero-photo', { yPercent: 18, rotate: 3 }, 0)
          .to('.hero-copy', { yPercent: -12, opacity: 0.2 }, 0);
      });
    },
    { scope: root },
  );

  return (
    <Box
      ref={root}
      component="section"
      id="home"
      sx={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden', pt: 14, pb: 10 }}
    >
      {/* soft background shapes */}
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', filter: 'blur(70px)', opacity: 0.55 }}>
        <Box className="blob" sx={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', bgcolor: '#E8C7B8', top: '-8%', right: '8%' }} />
        <Box className="blob" sx={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', bgcolor: '#C9D8CC', bottom: '-6%', left: '-4%' }} />
        <Box className="blob" sx={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', bgcolor: '#E9DFC9', top: '40%', left: '40%' }} />
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(${palette.line} 1px, transparent 1px), linear-gradient(90deg, ${palette.line} 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)',
          opacity: 0.5,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.35fr 1fr' }, gap: { xs: 6, md: 8 }, alignItems: 'center' }}>
          <Box className="hero-copy">
            <Stack className="hero-eyebrow" direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', width: 10, height: 10 }}>
                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    bgcolor: 'secondary.main',
                    animation: 'ping 2s cubic-bezier(0,0,.2,1) infinite',
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Available for new projects · {profile.location.split(',')[0]}
              </Typography>
            </Stack>

            <Typography variant="h1" component="div" sx={{ fontSize: { xs: '3.6rem', sm: '5rem', md: '6.5rem' } }}>
              <SplitText text="Hi, I'm" tag="span" splitType="chars" effect="rise" mask delay={35} duration={1} trigger="load" textAlign="left" />
              <br />
              <SplitText
                text={profile.name}
                tag="span"
                splitType="chars"
                effect="rise"
                mask
                delay={35}
                duration={1}
                trigger="load"
                hoverEffect="wave"
                textAlign="left"
                className="hero-name"
              />
            </Typography>

            <Box sx={{ mt: 3, maxWidth: 520, color: 'text.secondary', fontSize: { xs: 18, md: 20 }, lineHeight: 1.6 }}>
              <BlurText text={profile.tagline} animateBy="words" direction="bottom" delay={40} trigger="load" className="hero-tagline" />
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 5 }}>
              <Box className="hero-cta">
                <Magnet padding={60} magnetStrength={4}>
                  <Button variant="contained" size="large" endIcon={<ArrowOutwardRoundedIcon />} onClick={() => scrollToSection('projects')} sx={{ bgcolor: palette.ink, '&:hover': { bgcolor: '#000' } }}>
                    View projects
                  </Button>
                </Magnet>
              </Box>
              <Box className="hero-cta">
                <Magnet padding={60} magnetStrength={4}>
                  <Button variant="outlined" size="large" onClick={() => scrollToSection('contact')} sx={{ bgcolor: 'rgba(255,255,255,0.6)' }}>
                    Get in touch
                  </Button>
                </Magnet>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ position: 'relative', justifySelf: 'center', width: '100%', maxWidth: 420 }}>
            <Box className="hero-photo" sx={{ borderRadius: '32px', overflow: 'hidden', aspectRatio: '4 / 5', boxShadow: '0 40px 80px -30px rgba(21,21,21,0.35)' }}>
              <Box component="img" src="/img/profile.jpg" alt={profile.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
            </Box>
            <Box
              className="hero-badge"
              sx={{
                position: 'absolute',
                bottom: { xs: -24, md: -32 },
                left: { xs: -8, md: -40 },
                width: { xs: 104, md: 124 },
                height: { xs: 104, md: 124 },
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 20px 40px -16px rgba(194,89,63,0.6)',
              }}
            >
              <Box component="svg" viewBox="0 0 100 100" sx={{ position: 'absolute', inset: 0, animation: 'spin 14s linear infinite' }}>
                <defs>
                  <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text fill="currentColor" style={{ fontSize: 10.5, letterSpacing: 2.4, fontWeight: 600 }}>
                  <textPath href="#badge-circle">WEB DEVELOPER • DESIGNER •</textPath>
                </text>
              </Box>
              <ArrowOutwardRoundedIcon sx={{ fontSize: 30, transform: 'rotate(90deg)' }} />
            </Box>
          </Box>
        </Box>
      </Container>

      <Stack
        className="hero-scroll"
        spacing={1}
        sx={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', alignItems: 'center', display: { xs: 'none', md: 'flex' } }}
      >
        <Box sx={{ width: 26, height: 42, borderRadius: 999, border: `1.5px solid ${palette.muted}`, display: 'flex', justifyContent: 'center', pt: 1 }}>
          <Box className="hero-scroll-dot" sx={{ width: 4, height: 8, borderRadius: 4, bgcolor: palette.muted }} />
        </Box>
        <SouthRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
      </Stack>
    </Box>
  );
}
