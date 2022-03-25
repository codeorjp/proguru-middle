import React from "react";
import styles from "../styles/LessonCard.scss";

interface IlessonCard {
  id?: string;
  children: JSX.Element | JSX.Element[];
  noPadding?: boolean;
  fullHeight?: boolean;
}

export default ({ id, children, noPadding, fullHeight }: IlessonCard) => (
  <div
    id={id}
    className={`${styles.card} ${noPadding ? styles.cardNoPadding : ""} ${
      fullHeight ? styles.cardFullHeight : ""
    }`}
  >
    {children}
  </div>
);
