import React from "react";
import styles from "common/styles/LessonTour.scss";
import userDesign from "components/lesson1/common/statics/userDesign";
import workSpace from "components/lesson1/common/statics/workSpace";

export const tourConfig = [
  {
    selector: "#sampleDesign",
    content: () => (
      <div className={styles.tourContent}>
        <p>デザイン見本</p>
        <div>この中の要素を見て，同じデザインを作ろう！</div>
      </div>
    ),
  },
  {
    selector: "#userDesign",
    content: () => (
      <div className={styles.tourContent}>
        <p>あなたのデザイン</p>
        <div>
          この中の要素を
          <span>「クリック」</span>
          することでデザインを編集できます。デザイン見本を参考にデザインを調整しよう！
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
  {
    selector: "#submitButton",
    content: () => (
      <div className={styles.tourContent}>
        <p>【確認する】ボタン</p>
        <div>ステージを完了したら【確認する】ボタンを押して提出しよう！</div>
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
