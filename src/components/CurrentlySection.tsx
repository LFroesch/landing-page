import { motion } from "framer-motion"
import { currentActivity } from "../data"

const categoryLabel = {
  learning: "Learning",
  building: "Building",
  career: "Career",
} as const

function CurrentlySection() {
  return (
    <section className="currently-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="currently-label">Currently</p>
        <ul className="currently-list">
          {currentActivity.map((item, i) => (
            <motion.li
              key={i}
              className="currently-item"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <span className="currently-category">{categoryLabel[item.category]}</span>
              <span className="currently-text">{item.label}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}

export default CurrentlySection
