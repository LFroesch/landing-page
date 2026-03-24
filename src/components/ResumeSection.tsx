import { motion } from "framer-motion"

const ease = [0.25, 0.1, 0.25, 1] as const

const skills = [
  { label: "Languages", items: "TypeScript · Go · Python · SQL · Bash" },
  { label: "Frontend", items: "React · Next.js · Tailwind · Vite" },
  { label: "Backend", items: "Node.js · Express · Gin · REST · WebSockets" },
  { label: "Data", items: "PostgreSQL · MongoDB · Redis · Drizzle · Prisma" },
  { label: "Infra", items: "Docker · AWS · CI/CD · Nginx · Certbot" },
]

export default function ResumeSection() {
  return (
    <section className="resume-section">
      <motion.div
        className="resume-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
      >
        <h2 className="resume-title">Resume</h2>
        <div className="resume-rule" />
      </motion.div>

      <motion.p
        className="resume-summary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
      >
        I build tools I actually want to use. TypeScript, React, and Node are my
        daily stack — Go is my go-to for CLI tools and backend services. 47
        public repos and counting.
      </motion.p>

      <motion.div
        className="resume-skills"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
      >
        {skills.map((group) => (
          <div className="skill-row" key={group.label}>
            <span className="skill-label">{group.label}</span>
            <span className="skill-items">{group.items}</span>
          </div>
        ))}
      </motion.div>

      <div className="resume-columns">
        <motion.div
          className="resume-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          <h3 className="resume-col-title">Experience</h3>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-role">Network Technician</span>
              <span className="resume-date">2022–2024</span>
            </div>
            <span className="resume-company">Vista Broadband</span>
            <p className="resume-desc">
              Independent field routes across distributed wireless
              infrastructure. Diagnostics, customer-facing troubleshooting, 24/7
              on-call for critical outages.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="resume-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          <h3 className="resume-col-title">Education</h3>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-role">Backend Development</span>
              <span className="resume-date">2024–2025</span>
            </div>
            <span className="resume-company">Boot.dev</span>
            <p className="resume-desc">
              20+ courses — Python, Go, C, SQL, Docker, CI/CD, web security,
              algorithms, data structures.
            </p>
          </div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-role">Full-Stack & Tooling</span>
              <span className="resume-date">2024–present</span>
            </div>
            <span className="resume-company">Self-Directed</span>
            <p className="resume-desc">
              47 public repos. 10+ Go projects, 11+ TypeScript/JS web apps.
              Terminal-first daily workflow on Linux/WSL.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="resume-download"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.4, ease }}
      >
        <a href="/LucasFroeschner_Resume_3-23.pdf" download className="resume-btn">
          Download PDF →
        </a>
      </motion.div>
    </section>
  )
}
