'use client';
import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import styles from './Carousel.module.css';
import Image from 'next/image';

export default function Carousel({ CarouselData, reverse }) {
  const [entries, setEntries] = useState([]);
  const [entriesNum, setEntriesNum] = useState(0);

  useEffect(() => {
    if (!CarouselData || CarouselData.length === 0) return;
    const items = CarouselData.map((entry, index) => (
      <div key={index} className={styles.item}>
        <img
          src={`/images/logos/${entry.filename}`}
          alt={entry.title}
          width={80}
          height={80}
        />
        <div className={styles.logoTitle}>{entry.title}</div>
      </div>
    ));
    setEntries(items);
    setEntriesNum(CarouselData.length);
  }, [CarouselData]);

  return (
    <Row className="m-0 p-0">
      <div className={`${styles.slider} ${reverse ? styles.reverse : ''} m-0 p-0`}>
        <div
          className={styles.list}
          style={{
            minWidth: `calc(var(--carousel-item-width) * ${entriesNum * 2} + 20px * ${entriesNum * 2})`,
          }}
        >
          {entries}
          {entries}
        </div>
      </div>
    </Row>
  );
}
