import { motion } from "framer-motion"
import ContactSection from "./components/ContactSection"
import CurrentlySection from "./components/CurrentlySection"
import OrbitalRings from "./components/OrbitalRings"
import PaperPlanes from "./components/PaperPlanes"
import ProjectSection from "./components/ProjectSection"
import ResumeSection from "./components/ResumeSection"
import ScrollToTop from "./components/ScrollToTop"
import { projects } from "./data"

function App() {
  return (
    <>
      {/* <OrbitalRings /> */}
      <PaperPlanes />

      <div className="page">
        <header className="hero">
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            Lucas
            <br />
            Froeschner
          </motion.h1>

          <motion.div
            className="hero-rule"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Software Developer · North Bay Area, CA
          </motion.p>

          <motion.nav
            className="hero-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a href="https://github.com/LFroesch" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lucas-froeschner187/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="/LucasFroeschner_Resume.pdf" download>
              Resume
            </a>
          </motion.nav>
        </header>

        {projects.map((project, i) => (
          <ProjectSection key={project.name} project={project} index={i} />
        ))}

        <CurrentlySection />

        <ResumeSection />

        <ContactSection />
      </div>

      <ScrollToTop />
    </>
  )
}

export default App
