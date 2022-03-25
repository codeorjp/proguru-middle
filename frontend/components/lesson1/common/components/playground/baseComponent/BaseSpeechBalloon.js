import React from "react";
import BaseTouchComponent from "components/lesson1/common/components/playground/baseComponent/BaseTouchComponent";
import styles from "components/lesson1/common/styles/playground/sendSpeechBalloon.scss";
import BaseTouchArea from "components/lesson1/common/components/playground/baseComponent/BaseTouchArea";

export default class BaseSpeechBalloon extends BaseTouchComponent {
  constructor(props) {
    super(props);
    this.componentName = "BaseSpeechBalloon";
    this.componentTitle = "ベースコンポーネント";
    this.isReceive = false;
  }

  getDebugText() {
    const { store } = this.props;
    return this.isReceive ? store.receiveSpeechText : store.sendSpeechText;
  }

  render() {
    const { userName, message, isSample, isDebug } = this.props;

    // ストアからスタイルを取得
    const editStyle = this.getEditStyle();

    return (
      <div className={styles.balloon}>
        <p
          style={
            this.isReceive ? { textAlign: "left" } : { textAlign: "right" }
          }
        >
          {userName}
        </p>
        <BaseTouchArea
          onClick={() => {
            this.onClick();
          }}
          isSample={isSample}
          componentName={this.componentName}
        >
          <div style={editStyle}>
            <p className={styles.message}>
              {isDebug ? this.getDebugText() : message}
            </p>
          </div>
        </BaseTouchArea>
      </div>
    );
  }
}
