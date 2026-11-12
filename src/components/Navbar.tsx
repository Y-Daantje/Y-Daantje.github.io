import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Box,
  ButtonBase,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { sections, profile } from "../data";
import { gsap, ScrollTrigger, scrollToSection, useGSAP } from "../lib/gsap";
import { palette } from "../theme";

export default function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useGSAP(() => {
    gsap.from(barRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    sections.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => self.isActive && setActive(id),
      });
    });
  });

  // Slide the highlight pill under the active link.
  const movePill = (animate: boolean) => {
    const link = linkRefs.current[active];
    const pill = pillRef.current;
    if (!link || !pill) return;
    gsap.to(pill, {
      x: link.offsetLeft,
      width: link.offsetWidth,
      duration: animate ? 0.5 : 0,
      ease: "power3.out",
    });
  };

  useLayoutEffect(() => movePill(true));

  useEffect(() => {
    const onResize = () => movePill(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <Box
        ref={progressRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          bgcolor: "primary.main",
          transform: "scaleX(0)",
          transformOrigin: "left",
          zIndex: 1300,
        }}
      />
      <Box
        ref={barRef}
        component="header"
        sx={{
          position: "fixed",
          top: { xs: 12, md: 20 },
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "calc(100% - 24px)", md: "auto" },
          zIndex: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          pl: 2.5,
          pr: 1,
          py: 1,
          borderRadius: 999,
          bgcolor: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(14px) saturate(160%)",
          border: `1px solid ${palette.line}`,
          boxShadow: "0 10px 30px -12px rgba(21,21,21,0.18)",
        }}
      >
        <ButtonBase
          onClick={() => go("home")}
          sx={{ borderRadius: 999 }}
          aria-label="Back to top"
        >
          <Typography
            sx={{
              fontFamily: "h1.fontFamily",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {profile.name.split(" ")[0]}
            <Box component="span" sx={{ color: "primary.main" }}>
              .
            </Box>
          </Typography>
        </ButtonBase>

        <Box
          component="nav"
          sx={{ position: "relative", display: { xs: "none", md: "flex" } }}
        >
          <Box
            ref={pillRef}
            component="span"
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              borderRadius: 999,
              bgcolor: palette.ink,
            }}
          />
          {sections.map(({ id, label }) => (
            <ButtonBase
              key={id}
              ref={(el) => {
                linkRefs.current[id] = el;
              }}
              onClick={() => go(id)}
              aria-current={active === id ? "true" : undefined}
              sx={{
                position: "relative",
                px: 2,
                py: 1,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                color: active === id ? "#fff" : "text.secondary",
                transition: "color .3s",
                "&:hover": { color: active === id ? "#fff" : "text.primary" },
              }}
            >
              {label}
            </ButtonBase>
          ))}
        </Box>

        <IconButton
          sx={{ display: { md: "none" } }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <MenuRoundedIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: { sx: { bgcolor: "background.default", px: 3, pt: 2, pb: 5 } },
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Stack spacing={1}>
          {sections.map(({ id, label }, i) => (
            <ButtonBase
              key={id}
              onClick={() => go(id)}
              sx={{
                justifyContent: "flex-start",
                py: 1,
                fontFamily: "h1.fontFamily",
                fontSize: 36,
                fontWeight: 600,
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: 14,
                  color: "primary.main",
                  mr: 2,
                  fontFamily: "body1.fontFamily",
                }}
              >
                0{i + 1}
              </Box>
              {label}
            </ButtonBase>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
