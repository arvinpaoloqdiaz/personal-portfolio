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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', flexDirection: 'column' }}>
          <div
            role="button"
            tabIndex={0}
            aria-pressed={!isEducation}
            onClick={() => setIsEducation(!isEducation)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setIsEducation(!isEducation); }}
            style={{
              cursor: 'pointer',
              width: '7rem',
              height: '3.5rem',
              borderRadius: '6rem',
              background: isEducation ? 'var(--green-hover)' : 'var(--green-main)',
              position: 'relative',
              transition: 'background 0.3s',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: isEducation ? '0.25rem' : '3.75rem',
                transition: 'left 0.3s',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                zIndex: 2,
                fontSize: '1.5rem',
              }}
            >
              <FontAwesomeIcon icon={isEducation ? faSchool : faBriefcase} style={{ color: isEducation ? 'var(--green-hover)' : 'var(--green-main)' }} />
            </div>
          </div>
          <div className="h4 mb-0 fw-bold text-brand">{isEducation ? 'My Education' : 'My Work'}</div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <AnimatePresence mode="wait">
            <motion.div
              key={isEducation ? 'education' : 'work'}
              style={{ transformOrigin: 'top center' }}
              initial={{ opacity: 0, scaleY: 0.9 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
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
