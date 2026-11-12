import { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import SectionHeading from "./SectionHeading";
import ScrollVelocity from "./reactbits/ScrollVelocity";
import { skills, tools } from "../data";
import { gsap, MOTION_OK, useGSAP } from "../lib/gsap";
import { palette } from "../theme";

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row) => {
          const bar = row.querySelector<HTMLElement>(".skill-fill");
          const num = row.querySelector<HTMLElement>(".skill-num");
          const level = Number(row.dataset.level);
          const counter = { v: 0 };
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 88%" },
          });
          tl.from(row, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" })
            .fromTo(
              bar,
              { scaleX: 0 },
              { scaleX: level / 100, duration: 1.4, ease: "expo.out" },
              0.15,
            )
            .to(
              counter,
              {
                v: level,
                duration: 1.4,
                ease: "expo.out",
                onUpdate: () =>
                  num && (num.textContent = `${Math.round(counter.v)}%`),
              },
              0.15,
            );
        });
      });
    },
    { scope: root },
  );

  return (
    <Box
      ref={root}
      component="section"
      id="skills"
      sx={{
        pt: { xs: 12, md: 18 },
        pb: { xs: 8, md: 10 },
        bgcolor: palette.night,
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title="What I work with."
          light
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            columnGap: 8,
            rowGap: 4,
          }}
        >
          {skills.map((s) => (
            <Box key={s.name} className="skill-row" data-level={s.level}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>{s.name}</Typography>
                <Typography
                  className="skill-num"
                  sx={{
                    color: "rgba(255,255,255,0.55)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.level}%
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 4,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                <Box
                  className="skill-fill"
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 4,
                    transformOrigin: "left",
                    transform: `scaleX(${s.level / 100})`,
                    background: `linear-gradient(90deg, ${palette.sage}, ${palette.clay})`,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      <Box
        sx={{
          mt: { xs: 10, md: 16 },
          "& .scroller": { fontFamily: "h1.fontFamily", fontWeight: 600 },
        }}
      >
        <ScrollVelocity
          texts={[
            tools.join("  ·  ") + "  ·  ",
            "Clean code  ·  Responsive  ·  Accessible  ·  Animated  ·  ",
          ]}
          velocity={60}
          color="rgba(255,255,255,0.9)"
          outlineAlternate
          fadeEdges
          skewWithVelocity={6}
        />
      </Box>
    </Box>
  );
}
