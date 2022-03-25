import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import flattenObject from "common/utils/flattenObject";
import submitAreaStyles from "common/BlocklyLesson/styles/SubmitArea.scss";

class SubmitArea extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {};
    this.styleNames = [
      "SendSpeechBalloon",
      "SendProfileIcon",
      "ReceiveSpeechBalloon",
      "ReceiveProfileIcon",
      "ChatInput",
      "SubmitButton",
      "ChatBody",
    ];
    this.handleOnClickImageButton = this.handleOnClickImageButton.bind(this);
    this.handleInputFileClick = this.handleInputFileClick.bind(this);
    this.handleOnChangeSelectImage = this.handleOnChangeSelectImage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  // Text
  handleInputChange(e) {
    this.props.store.setChatInput(e.target.value);
  }

  handleOnSubmit() {
    this.props.store.submit();
  }

  // Image
  handleOnChangeSelectImage(event) {
    const { files } = event.target;
    if (
      files.length === 1 &&
      files[0].type === "image/jpeg" &&
      files[0].size !== 0
    ) {
      this.props.store.onSelectImage(files[0]);
    }
  }

  handleInputFileClick(e) {
    e.stopPropagation();
    e.target.value = "";
  }

  handleOnClickImageButton() {
    this.props.store.clickImageButton();
  }

  render() {
    const { types } = this.props;
    const { variables, messageBoardStyle } = this.props.store;

    if (messageBoardStyle) {
      this.styleNames.forEach((styleName) => {
        this.styles[styleName] = flattenObject(
          toJS(messageBoardStyle)[styleName].style
        );
      });
    }

    return (
      <div className={submitAreaStyles.submitArea}>
        <div
          className={submitAreaStyles.imageSelectButtonWrap}
          style={{ display: types.includes("Image") ? "block" : "none" }}
        >
          <button
            className={submitAreaStyles.imageSelectButton}
            type="button"
            onClick={this.handleOnClickImageButton}
          >
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/jpeg"
              ref={(input) => this.props.store.setInputFileElement(input)}
              onClick={this.handleInputFileClick}
              onChange={this.handleOnChangeSelectImage}
            />
            <i
              className={`bi bi-image ${submitAreaStyles.buttonIcon}`}
              style={{ cursor: "pointer" }}
            ></i>
          </button>
        </div>
        <div className={submitAreaStyles.inputWrap}>
          <input
            style={messageBoardStyle ? this.styles.ChatInput : null}
            className={submitAreaStyles.input}
            onChange={this.handleInputChange}
            value={variables.inputText.content || ""}
            disabled={!types.includes("Text")}
          />
        </div>
        <div className={submitAreaStyles.submitButtonWrap}>
          <button
            style={messageBoardStyle ? this.styles.SubmitButton : null}
            className={submitAreaStyles.submitButton}
            type="button"
            onClick={this.handleOnSubmit}
            disabled={!types.includes("Text")}
          >
            送信する
          </button>
        </div>
      </div>
    );
  }
}

export default inject("store")(observer(SubmitArea));
