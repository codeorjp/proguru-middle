import React from "react";
import BaseTouchComponent from "components/lesson1/common/components/playground/baseComponent/BaseTouchComponent";
import styles from "components/lesson1/common/styles/playground/chatInput.scss";
import { inject, observer } from "mobx-react";
import BaseTouchArea from "components/lesson1/common/components/playground/baseComponent/BaseTouchArea";

class ChatInput extends BaseTouchComponent {
  constructor(props) {
    super(props);
    this.state = {
      sampleInput: "",
    };
    this.componentName = "ChatInput";
    this.componentTitle = "テキスト入力エリア";
  }

  render() {
    const { isSample, value, placeholder } = this.props;

    // ストアからスタイルを取得
    const editStyle = this.getEditStyle();

    return (
      <BaseTouchArea
        className={styles.inputWrap}
        onClick={() => {
          this.onClick();
        }}
        isSample={isSample}
        componentName={this.componentName}
      >
        <input
          style={editStyle}
          placeholder={placeholder}
          className={styles.input}
          value={isSample ? this.state.sampleInput : value}
          onChange={(e) => {
            this.setState({
              sampleInput: e.target.value,
            });
          }}
        />
      </BaseTouchArea>
    );
  }
}

ChatInput.defaultProps = {
  value: "テキストを入力するエリア",
  placeholder: "テキストを入力するエリア",
  isSample: false,
};

export default inject("store")(observer(ChatInput));
