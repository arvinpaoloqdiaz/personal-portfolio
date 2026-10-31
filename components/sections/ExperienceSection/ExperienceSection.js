'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import Education from '../Education/Education';
import Work from '../Work/Work';
import styles from './ExperienceSection.module.css';

export default function ExperienceSection({ educationList, workList }) {
  const [isEducation, setIsEducation] = useState(false);

  const workCount = Array.isArray(workList) ? workList.length : 0;
  const educationCount = Array.isArray(educationList) ? educationList.length : 0;

  return (
    <>
      <div className="row justify-content-center my-4">
        <div className="col-auto">
          <div className={styles.switcherDock}>
            <button
              type="button"
              onClick={() => setIsEducation(false)}
              className={`${styles.tabBtn} ${!isEducation ? styles.activeTab : ''}`}
              aria-selected={!isEducation}
            >
              <FontAwesomeIcon icon={faBriefcase} />
              <span>Work Experience</span>
              {workCount > 0 && <span className={styles.tabBadge}>{workCount}</span>}
            </button>

            <button
              type="button"
              onClick={() => setIsEducation(true)}
              className={`${styles.tabBtn} ${isEducation ? styles.activeTab : ''}`}
              aria-selected={isEducation}
            >
              <FontAwesomeIcon icon={faSchool} />
              <span>Education</span>
              {educationCount > 0 && <span className={styles.tabBadge}>{educationCount}</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <AnimatePresence mode="wait">
            <motion.div
              key={isEducation ? 'education' : 'work'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="experience-container">
                {isEducation ? (
                  <Education educationList={educationList} />
                ) : (
                  <Work workList={workList} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
