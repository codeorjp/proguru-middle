import React from "react";
import styles from "common/styles/LessonTour.scss";
import userDesign from "components/lesson1/common/statics/userDesign";
import workSpace from "components/lesson1/common/statics/workSpace";

export const tourConfig = [
  {
    selector: "#userDesign",
    content: () => (
      <div className={styles.tourContent}>
        <p>あなたのデザイン</p>
        <div>
          この中の要素を
          <span>「クリック」</span>
          することでデザインを編集できます。
        </div>
        <img src={userDesign} alt="" />
      </div>
    ),
  },
  {
    selector: "#workSpace",
    content: () => (
      <div className={styles.tourContent}>
        <p>ワークスペース</p>
        <div>この中でデザインを調整できるよ！</div>
        <img src={workSpace} alt="" />
      </div>
    ),
  },
];

const selecters = {};
tourConfig.forEach((elm) => {
  if (!elm.selector) return;
  const id = elm.selector.replace("#", "");
  selecters[id] = id.replace("#", "");
});

export const tourSelecters = selecters;
