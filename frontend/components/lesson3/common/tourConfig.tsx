import React from "react";
import styles from "common/styles/LessonTour.scss";
import connectBlock from "components/lesson3/common/statics/connectBlock.gif";
import displayText from "components/lesson3/common/statics/displayText.gif";

interface ItourConfig {
  selector: string;
  content: () => JSX.Element;
}

export const tourConfig: ItourConfig[] = [
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
    selector: "#messageBoard",
    content: () => (
      <div className={styles.tourContent}>
        <p>チャット画面</p>
        <div>
          プログラミングを通して，クラスみんなのチャットができるようにしましょう！
        </div>
        <img src={displayText} alt="" />
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

interface Iselecters {
  [key: string]: string;
}

const selecters: Iselecters = {};
tourConfig.forEach((elm) => {
  if (!elm.selector) return;
  const id = elm.selector.replace("#", "");
  selecters[id] = id.replace("#", "");
});

export const tourSelecters = selecters;
