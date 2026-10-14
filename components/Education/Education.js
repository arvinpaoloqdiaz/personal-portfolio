'use client';
import styles from './Education.module.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export default function Education({ educationList = [] }) {
  const [educList, setEducList] = useState([]);

  function isOdd(num) {
    return num % 2 !== 0;
  }

  useEffect(() => {
    const list = Array.isArray(educationList)
      ? (typeof educationList.toReversed === 'function' ? educationList.toReversed() : [...educationList].reverse())
      : [];
    let educationArray = list.map((entry, index) => {
      return (
        <div className={`${styles.children} ${isOdd(index) ? styles.qualifications__grid__right : styles.qualifications__grid__left}`} key={`educ-${index}`}>
          <div></div>
          <div className={`${styles.qualifications__width} ${isOdd(index) ? styles.qualifications__left : styles.qualifications__right}`} data-myvalue={`${index + 1}`}>
            <div className={`${styles.qualifications__container} ${isOdd(index) ? styles.container__left : styles.container__right}`}>
              <p className="fw-bold mb-1">{entry.subtitle}</p>
              <p className="mb-1">{entry.title}</p>
              <p className="mb-0 text-muted"><FontAwesomeIcon icon={faCalendar} /> {entry.date}</p>
            </div>
          </div>
          <div></div>
        </div>
      );
    });
    setEducList(educationArray);
  }, [educationList]);

  return (
    <motion.div
      className={styles.list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delayChildren: 0.05 }
        }
      }}
    >
      {educList.map((child, idx) => (
        <motion.div
          className={styles.item}
          key={idx}
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } } }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
