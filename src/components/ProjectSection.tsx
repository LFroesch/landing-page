import { motion } from "framer-motion"
import type { Project } from "../data"
import LiveDemo from "./LiveDemo"

type Props = {
  project: Project
  index: number
}

export default function ProjectSection({ project, index }: Props) {
  const isRight = index % 2 === 1
  const num = String(index + 1).padStart(2, "0")
  const sectionClass = [
    "project-section",
    isRight ? "project-section--right" : "",
    project.hasLiveDemo ? "project-section--stacked" : "",
  ].filter(Boolean).join(" ")

  return (
    <section className={sectionClass}>
      <motion.div
        className="project-text"
        initial={{ opacity: 0, x: project.hasLiveDemo ? 0 : isRight ? 40 : -40, y: project.hasLiveDemo ? 20 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <div className="project-number">{num}</div>
        <h2 className="project-name">{project.name}</h2>
        <p className="project-tagline">{project.tagline}</p>
        <ul className="project-highlights">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
        <p className="project-tech">{project.tech.join(" · ")}</p>
        <div className="project-links">
          {project.liveUrl && (
            <a
              className="link-live"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="live-dot" />
              Live
            </a>
          )}
          <a href={project.github} target="_blank" rel="noreferrer">
            GitHub →
          </a>
        </div>
      </motion.div>

      <motion.div
        className={project.hasLiveDemo ? "project-media project-media--live" : "project-media"}
        initial={{ opacity: 0, x: project.hasLiveDemo ? 0 : isRight ? -40 : 40, y: project.hasLiveDemo ? 20 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        {project.hasLiveDemo ? (
          <LiveDemo />
        ) : project.screenshot ? (
          <img
            className="project-screenshot"
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            loading="lazy"
          />
        ) : (
          <span className="media-placeholder">screenshot / gif coming soon</span>
        )}
      </motion.div>
    </section>
  )
}
