'use client';
import styles from './Work.module.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBriefcase, faBuilding } from '@fortawesome/free-solid-svg-icons';

export default function Work({ workList = [] }) {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const list = Array.isArray(workList)
    ? (typeof workList.toReversed === 'function' ? workList.toReversed() : [...workList].reverse())
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
            key={`work-${index}`}
            className={styles.timelineItem}
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } }
            }}
          >
            <div className={styles.timelineNode} />

            <div
              className={styles.timelineCard}
              onClick={() => setSelectedEntry(entry)}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`View details for ${entry.company}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedEntry(entry);
                }
              }}
            >
              <h4 className={styles.companyName}>{entry.company}</h4>
              <div className={styles.positionTitle}>{entry.position}</div>
              <div className={styles.dateBadge}>
                <FontAwesomeIcon icon={faCalendar} />
                <span>{entry.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            className={styles.modalOverlay}
            onClick={() => setSelectedEntry(null)}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 15, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>{selectedEntry.company}</h3>
                <button
                  className={styles.modalClose}
                  onClick={() => setSelectedEntry(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalMetaRow}>
                  <div><strong>Position:</strong> {selectedEntry.position}</div>
                  <div><strong>Department:</strong> {selectedEntry.department || 'N/A'}</div>
                  <div className={styles.dateBadge}>
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>{selectedEntry.date}</span>
                  </div>
                </div>

                {Array.isArray(selectedEntry.summary) && selectedEntry.summary.length > 0 && (
                  <div>
                    <h5 className="h6 mb-2" style={{ color: 'var(--emerald-400)' }}>Key Responsibilities & Highlights</h5>
                    <ul className={styles.summaryList}>
                      {selectedEntry.summary.map((point, i) => (
                        <li
                          key={i}
                          dangerouslySetInnerHTML={{ __html: point }}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {selectedEntry.description && (
                  <p
                    className={styles.modalDescription}
                    dangerouslySetInnerHTML={{ __html: selectedEntry.description }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

