import React from "react";
import styles from "common/styles/LessonTour.scss";
import connectBlock from "components/lesson2/common/statics/connectBlock";
import displayText from "components/lesson2/common/statics/displayText";
import clientServerAnimation from "components/lesson2/common/statics/clientServerAnimation";

export const tourConfig = [
  {
    selector: "#workSpace",
    content: () => (
      <div className={styles.tourContent}>
        <p>ワークスペース</p>
        <div>ブロックを組み立てて，プログラミングしよう！</div>
        <img src={connectBlock} alt="" />
      </div>
    ),
  },
  {
    selector: "#executeButton",
    content: () => (
      <div className={styles.tourContent}>
        <p>【実行する】ボタン</p>
        <div>
          ワークスペースでブロックを組み立てたら，【実行する】ボタンを押そう！
        </div>
      </div>
    ),
  },
  {
    selector: "#terminal",
    content: () => (
      <div className={styles.tourContent}>
        <p>コンピュータの画面</p>
        <div>
          サーバと通信してる時や「〇〇を表示する」ブロックを使うとここにテキストが表示されるよ！
        </div>
        <img src={displayText} alt="" />
      </div>
    ),
  },
  {
    selector: "#clientServerAnimation",
    content: () => (
      <div className={styles.tourContent}>
        <p>アニメーション画面</p>
        <div>サーバとの通信の様子はここに表示されるよ！</div>
        <img src={clientServerAnimation} alt="" />
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
