import React from "react";
import stageStyle from "components/lesson1/common/styles/Stage.scss";

interface Iwrap {
  children: JSX.Element;
}

export default ({ children }: Iwrap) => (
  <div className={stageStyle.messageBoard}>
    <div className={stageStyle.messageBoardTitle}>
      <p className={stageStyle.designAreaTitle}>あなたのチャット</p>
      <p className={stageStyle.windowButton}>● ● ●</p>
    </div>
    <div>{children}</div>
  </div>
);
