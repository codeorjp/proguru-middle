import React from "react";
import styles from "components/lesson1/common/styles/playground/submitButton.scss";
import { inject, observer } from "mobx-react";
import BaseTouchComponent from "components/lesson1/common/components/playground/baseComponent/BaseTouchComponent";
import BaseTouchArea from "components/lesson1/common/components/playground/baseComponent/BaseTouchArea";

class SubmitButton extends BaseTouchComponent {
  constructor(props) {
    super(props);
    this.componentName = "SubmitButton";
    this.componentTitle = "メッセージ送信用のボタン";
  }

  render() {
    const { isSample } = this.props;

    // ストアからスタイルを取得
    const editStyle = this.getEditStyle();

    return (
      <BaseTouchArea
        className={styles.submitButtonWrap}
        onClick={() => {
          this.onClick();
        }}
        isSample={isSample}
        componentName={this.componentName}
      >
        <button style={editStyle} className={styles.submitButton} type="submit">
          送信する
        </button>
      </BaseTouchArea>
    );
  }
}

SubmitButton.defaultProps = {
  isSample: false,
  onClick: () => {},
};

export default inject("store")(observer(SubmitButton));
