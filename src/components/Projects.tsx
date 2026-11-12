import { useRef } from "react";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./reactbits/SpotlightCard";
import { projects, type Project } from "../data";
import { gsap, MOTION_OK, useGSAP } from "../lib/gsap";
import { palette } from "../theme";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const linked = Boolean(project.href);
  return (
    <Box
      component={linked ? "a" : "div"}
      href={project.href}
      target={linked ? "_blank" : undefined}
      rel={linked ? "noopener noreferrer" : undefined}
      className="project-card"
      sx={{
        display: "block",
        color: "inherit",
        textDecoration: "none",
        height: "100%",
      }}
    >
      <SpotlightCard
        theme="light"
        spotlightColor="rgba(194, 89, 63, 0.18)"
        style={{
          padding: 12,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            aspectRatio: "16 / 10",
            bgcolor: palette.paper,
          }}
        >
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="project-img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform .9s cubic-bezier(.2,.8,.2,1)",
            }}
          />
          <Box
            className="project-arrow"
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "#fff",
              display: "grid",
              placeItems: "center",
              transform: "scale(0.6)",
              opacity: 0,
              transition: "all .45s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <ArrowOutwardRoundedIcon fontSize="small" />
          </Box>
        </Box>
        <Box
          sx={{
            p: 2.5,
            pt: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "baseline",
              mb: 1,
            }}
          >
            <Typography variant="h4" sx={{ fontSize: { xs: 24, md: 28 } }}>
              {project.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              0{index + 1}
            </Typography>
          </Stack>
          <Typography sx={{ color: "text.secondary", mb: 3, flex: 1 }}>
            {project.description}
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {project.tags.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                variant="outlined"
                sx={{ borderColor: palette.line }}
              />
            ))}
            {!linked && (
              <Chip
                label="Private"
                size="small"
                sx={{ bgcolor: palette.paper }}
              />
            )}
          </Stack>
        </Box>
      </SpotlightCard>
    </Box>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".project-reveal", {
          y: 80,
          opacity: 0,
          rotate: 2,
          stagger: 0.15,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".project-grid", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <Box
      ref={root}
      component="section"
      id="projects"
      sx={{ py: { xs: 12, md: 18 } }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Recent projects."
        />
        <Box
          className="project-grid"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            "& .project-card:hover .project-img": { transform: "scale(1.06)" },
            "& .project-card:hover .project-arrow": {
              transform: "scale(1)",
              opacity: 1,
            },
          }}
        >
          {projects.map((p, i) => (
            <Box key={p.title} className="project-reveal">
              <ProjectCard project={p} index={i} />
            </Box>
          ))}
          <Box className="project-reveal">
            <Box
              sx={{
                height: "100%",
                minHeight: 320,
                borderRadius: "24px",
                border: `1.5px dashed ${palette.line}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 4,
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  display: "grid",
                  placeItems: "center",
                  mb: 2.5,
                }}
              >
                <AutoAwesomeRoundedIcon
                  sx={{
                    color: "primary.main",
                    animation: "spin 8s linear infinite",
                  }}
                />
              </Box>
              <Typography variant="h5" sx={{ mb: 1 }}>
                More coming soon
              </Typography>
              <Typography sx={{ color: "text.secondary", maxWidth: 260 }}>
                I'm constantly working on new projects. Check back soon for
                updates!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
