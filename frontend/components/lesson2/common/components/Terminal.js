import _ from "lodash";
import React from "react";
import { inject, observer } from "mobx-react";
import styles from "../styles/Terminal.scss";

const {
  body,
  header,
  headerContents,
  headerLeft,
  headerRight,
  main,
  mainContents,
  overlay,
  displayNone,
} = styles;

const Terminal = ({ store, animationStore }) => {
  const { terminalTexts } = animationStore;
  return (
    <div className={body}>
      <div className={header}>
        <div className={headerContents}>
          <p className={headerLeft}>コンピュータの画面</p>
          <p className={headerRight}>● ● ●</p>
        </div>
      </div>
      <div className={main}>
        {_.map(terminalTexts, (text, index) => (
          <p key={index} className={mainContents}>
            {text}
          </p>
        ))}
        <div className={store.isShowExecuteOverlay ? overlay : displayNone}>
          {store.isExecute ? (
            <p>プログラムを実行中...</p>
          ) : (
            <p>
              プログラムを組んだら
              <br />
              「実行する」ボタンを押してね
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default inject("store", "animationStore")(observer(Terminal));
