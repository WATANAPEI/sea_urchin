import React, { useState, useEffect } from "react";
import styles from "../styles/style.css";
// @ts-ignore

export interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  wordLanguageID: number;
  meaningLanguageID: number;
}

export interface WordCardProps {
  wordFront: string;
  languageFront?: string;
  wordBack: string;
  languageBack?: string;
}

function WordCard({
  wordFront,
  languageFront,
  wordBack,
  languageBack
}: WordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    if (!isFlipped) {
      event.currentTarget.style.transform = "rotateY(180deg)";
      setIsFlipped(true);
    } else {
      event.currentTarget.style.transform = "rotateY(0deg)";
      setIsFlipped(false);
    }
  }
  return (
    <div className={styles.flipCard}>
      <div id="flipCardInner" className={styles.flipCardInner} onClick={handleClick}>
        <React.Fragment>
          <div className={styles.flipCardFront}>{wordFront}</div>
          <div className={styles.flipCardBack}>{wordBack}</div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default WordCard;
