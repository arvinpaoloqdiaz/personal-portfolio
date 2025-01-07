import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import "./carousel.css";

export default function Carousel({ CarouselData, reverse }) {
  const [entries, setEntries] = useState([]);
  const [entriesNum, setEntriesNum] = useState(0); // Default to 0 instead of empty string
  const [isSecond, setIsSecond] = useState(reverse); // Control reverse direction

  // Function to generate the entries dynamically based on CarouselData
  function getEntries() {
    const entriesList = CarouselData.map((entry, index) => {
      // Dynamically import the image based on the filename
      const imagePath = require(`../../assets/images/logos/${entry.filename}`);

      // Calculate animation delay dynamically based on the index
      const delay = (14 / CarouselData.length) * index; // Adjust timing as needed

      return (
        <div
          key={index}
          className="item"
          style={{
            animationDelay: `${delay}s`, // Delay for staggered effect
          }}
        >
         
          <img src={imagePath} alt={entry.title} />
          <div className="logo-title">{entry.title}</div>
        </div>
      );
    });
    setEntries(entriesList);
    setEntriesNum(CarouselData.length); // Set the number of entries
  }

  useEffect(() => {
    getEntries();
  }, [CarouselData]);

  return (
    <Row>
      <div className={`slider ${isSecond ? 'reverse' : ''}`}> {/* Conditionally apply 'reverse' class */}
        <div
          className="list"
          style={{
            minWidth: `calc(var(--carousel-item-width) * ${entriesNum})`, // Set the width dynamically based on entriesNum
          }}
        >
          {entries}
        </div>
      </div>
    </Row>
  );
}
