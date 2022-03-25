import React, { useState } from "react";
import Tour from "reactour";
import { inject, observer } from "mobx-react";
import styles from "components/trial/common/styles/Tour.scss";

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

  return tourConfig && store.isShowTour ? (
    <Tour steps={tourConfig} {...toruOptions} />
  ) : null;
};

export default inject("store")(observer(LessonTour));
