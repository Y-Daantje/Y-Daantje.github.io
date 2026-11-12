import { useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SplitText from "./reactbits/SplitText";
import Magnet from "./reactbits/Magnet";
import { profile } from "../data";
import { gsap, MOTION_OK, scrollToSection, useGSAP } from "../lib/gsap";
import { palette } from "../theme";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".contact-fade", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        });
        gsap.fromTo(
          ".contact-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: ".contact-line", start: "top 90%" },
          },
        );
      });
    },
    { scope: root },
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Box
      ref={root}
      component="section"
      id="contact"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: 5,
        bgcolor: palette.night,
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          className="contact-fade"
          variant="overline"
          sx={{ color: "rgba(255,255,255,0.6)", display: "block", mb: 2 }}
        >
          <Box component="span" sx={{ color: "primary.main" }}>
            04
          </Box>{" "}
          — Contact
        </Typography>
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: { xs: "3.2rem", sm: "5rem", md: "8rem" },
            lineHeight: 1.1,
          }}
        >
          <SplitText
            text="Let's build"
            tag="span"
            splitType="chars"
            effect="rise"
            mask
            delay={30}
            duration={1}
            textAlign="left"
          />
          <br />
          <SplitText
            text="something great."
            tag="span"
            splitType="chars"
            effect="rise"
            mask
            delay={30}
            duration={1}
            textAlign="left"
            color="rgba(255,255,255,0.45)"
          />
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 6 }}
        >
          <Box className="contact-fade">
            <Magnet padding={70} magnetStrength={3}>
              <Button
                variant="contained"
                size="large"
                href={`mailto:${profile.email}`}
                startIcon={<MailOutlineRoundedIcon />}
                sx={{ px: 4, py: 1.75 }}
              >
                Send me an email
              </Button>
            </Magnet>
          </Box>
          <Box className="contact-fade">
            <Button
              size="large"
              onClick={copyEmail}
              endIcon={<ContentCopyRoundedIcon fontSize="small" />}
              sx={{
                px: 4,
                py: 1.75,
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.18)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
              }}
            >
              {profile.email}
            </Button>
          </Box>
        </Stack>

        <Box
          className="contact-line"
          sx={{
            mt: { xs: 10, md: 14 },
            height: "1px",
            bgcolor: "rgba(255,255,255,0.12)",
            transformOrigin: "left",
          }}
        />

        <Box
          component="footer"
          sx={{
            pt: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            justifyContent: "space-between",
            alignItems: { md: "center" },
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            {profile.socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  "&:hover": { color: "#fff" },
                }}
              >
                {s.label}
              </Link>
            ))}
            <Button
              onClick={() => scrollToSection("home")}
              aria-label="Back to top"
              sx={{
                minWidth: 0,
                width: 44,
                height: 44,
                p: 0,
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.18)",
                "&:hover svg": { transform: "translateY(-3px)" },
              }}
            >
              <NorthRoundedIcon
                fontSize="small"
                sx={{ transition: "transform .3s" }}
              />
            </Button>
          </Stack>
        </Box>
      </Container>

      <Snackbar
        open={copied}
        autoHideDuration={2200}
        onClose={() => setCopied(false)}
        message="Email copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
