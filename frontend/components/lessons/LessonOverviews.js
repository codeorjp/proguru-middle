import React from "react";
import lesson1 from "components/lessons/statics/lesson1.png";
import lesson2 from "components/lessons/statics/lesson2.gif";
import lesson3 from "components/lessons/statics/lesson3.gif";
import lesson4 from "components/lessons/statics/lesson4.gif";
import lesson5 from "components/lessons/statics/lesson5.gif";
import styles from "components/lessons/styles/Modal.scss";

const lessonOverViews = {
  1: (
    <div>
      <p className={styles.description}>
        レッスン1では，
        <span>クラス内で使うチャット画面</span>
        のデザインに関して学んでいくよ！
        <br />
        使う人にとって見やすい
        <span>文字のサイズや色・デザイン</span>
        を考えながらチャット画面を作成しよう！
      </p>
      <div className={styles.center}>
        <img src={lesson1} width="80%" alt="" />
      </div>
    </div>
  ),
  2: (
    <div>
      <p className={styles.description}>
        レッスン2では，
        <span>サーバに接続しデータを送受信する</span>
        方法について学んでいくよ！
        <br />
        サーバへの接続からデータを送信するまでの流れや
        <span>IPアドレス</span>
        が何を表しているのか，ふだんSNSなどでメッセージをやりとりしている仕組みを学ぼう！
      </p>
      <div className={styles.center}>
        <img src={lesson2} width="80%" alt="" />
      </div>
    </div>
  ),
  3: (
    <div>
      <p className={styles.description}>
        レッスン3では，クラス内で
        <span>テキストを送受信することが可能なチャット</span>
        を作成するよ！チャットアプリの仕組みについて学ぼう！
      </p>
      <div className={styles.center}>
        <img src={lesson3} width="80%" alt="" />
      </div>
    </div>
  ),
  4: (
    <div>
      <p className={styles.description}>
        レッスン4では，クラス内で
        <span>画像を送受信することが可能なチャット</span>
        を作成するよ！テキストだけでなく，画像の扱い方について学ぼう！
      </p>
      <div className={styles.center}>
        <img src={lesson4} width="80%" alt="" />
      </div>
    </div>
  ),
  5: (
    <div>
      <p className={styles.description}>
        レッスン5では，これまでのレッスンをふまえて
        <span>
          チャット画面のデザイン，テキストと画像の両方を送受信することが可能なチャット
        </span>
        を作成するよ！
      </p>
      <div className={styles.center}>
        <img src={lesson5} width="80%" alt="" />
      </div>
    </div>
  ),
};

export default lessonOverViews;
