import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import styles from "./Carousel.module.css"; // CSS module import

export default function Carousel({ CarouselData, reverse }) {
  const [entries, setEntries] = useState([]);
  const [entriesNum, setEntriesNum] = useState(0);

  // Generate carousel items
  function getEntries() {
    const entriesList = CarouselData.map((entry, index) => {
      // Dynamically import the image
      const imagePath = require(`../../assets/images/logos/${entry.filename}`);

      return (
        <div key={index} className={styles.item}>
          <img src={imagePath} alt={entry.title} />
          <div className={styles.logoTitle}>{entry.title}</div>
        </div>
      );
    });

    setEntries(entriesList);
    setEntriesNum(CarouselData.length);
  }

  useEffect(() => {
    getEntries();
  }, [CarouselData]);

  return (
    <Row className="m-0 p-0">
      <div className={`${styles.slider} ${reverse ? styles.reverse : ""} m-0 p-0`}>
        <div
          className={styles.list}
          style={{
            minWidth: `calc(var(--carousel-item-width) * ${entriesNum * 2} + 20px * ${entriesNum * 2})`, // duplicate width for seamless scroll
          }}
        >
          {entries}
          {entries} {/* Duplicate items for infinite loop */}
        </div>
      </div>
    </Row>
  );
}
