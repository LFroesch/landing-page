import { motion } from "framer-motion"

const ease = [0.25, 0.1, 0.25, 1] as const

export default function ContactSection() {
  return (
    <section className="contact-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
      >
        <h2 className="contact-title">Get In Touch</h2>
        <div className="contact-rule" />
        <p className="contact-status">
          Open to backend and fullstack roles — remote or North Bay Area, CA.
        </p>
        <a className="contact-email" href="mailto:lucas.froeschner@gmail.com">
          lucas.froeschner@gmail.com
        </a>
        <nav className="contact-links">
          <a
            href="https://github.com/LFroesch"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-froeschner187/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="/LucasFroeschner_Resume_3-23.pdf" download>
            Resume
          </a>
        </nav>
      </motion.div>
    </section>
  )
}
