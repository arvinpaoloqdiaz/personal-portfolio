'use client';
import styles from './Education.module.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export default function Education({ educationList = [] }) {
  const list = Array.isArray(educationList)
    ? (typeof educationList.toReversed === 'function' ? educationList.toReversed() : [...educationList].reverse())
    : [];

  return (
    <div className={styles.timelineWrapper}>
      <motion.div
        className={styles.timelineTrack}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.05 }
          }
        }}
      >
        {list.map((entry, index) => (
          <motion.div
            key={`educ-${index}`}
            className={styles.timelineItem}
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } }
            }}
          >
            <div className={styles.timelineNode} />

            <div className={styles.timelineCard}>
              <h4 className={styles.degreeTitle}>{entry.subtitle}</h4>
              <div className={styles.institutionName}>{entry.title}</div>
              <div className={styles.dateBadge}>
                <FontAwesomeIcon icon={faCalendar} />
                <span>{entry.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

