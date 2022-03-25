import React, { useState } from "react";
import Tour from "reactour";
import { inject, observer } from "mobx-react";
import styles from "../styles/LessonTour.scss";

const LessonTour = ({ tourConfig, store }) => {
  const [isOpen, toggleIsOpen] = useState(true);
  const toruOptions = {
    isOpen,
    rounded: 5,
    closeWithMask: false,
    className: styles.LessonTour,
    nextButton: <>次へ</>,
    prevButton: <>前へ</>,
    lastStepNextButton: <>始める</>,
    disableDotsNavigation: false,
    showNavigation: false,
    showCloseButton: true,
    onRequestClose: () => toggleIsOpen(!isOpen),
  };
  const { isFirstTime, lesson, stage } = store;

  if (isFirstTime && lesson.number !== 5 && stage.number === 1) {
    store.setFirstTimeDone(`lesson${lesson.number}:isFirstTime`);
    return <Tour steps={tourConfig} {...toruOptions} />;
  }
};

export default inject("store")(observer(LessonTour));
