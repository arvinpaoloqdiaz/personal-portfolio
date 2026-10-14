'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import Education from '../Education/Education';
import Work from '../Work/Work';

export default function ExperienceSection({ educationList, workList }) {
  const [isEducation, setIsEducation] = useState(false);

  return (
    <>
      <div className="row justify-content-center my-4">
        <div className="col-auto">
          <div
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.35rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            }}
          >
            <button
              type="button"
              onClick={() => setIsEducation(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.25rem',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                background: !isEducation ? 'var(--emerald-500)' : 'transparent',
                color: !isEducation ? '#042417' : 'var(--text-secondary)',
                fontWeight: !isEducation ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: !isEducation ? '0 4px 15px rgba(16, 185, 129, 0.35)' : 'none',
              }}
            >
              <FontAwesomeIcon icon={faBriefcase} />
              <span>Work Experience</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEducation(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.25rem',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                background: isEducation ? 'var(--emerald-500)' : 'transparent',
                color: isEducation ? '#042417' : 'var(--text-secondary)',
                fontWeight: isEducation ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isEducation ? '0 4px 15px rgba(16, 185, 129, 0.35)' : 'none',
              }}
            >
              <FontAwesomeIcon icon={faSchool} />
              <span>Education</span>
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
                {isEducation ? <Education educationList={educationList} /> : <Work workList={workList} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

