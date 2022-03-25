/* eslint-disable react/no-access-state-in-setstate */
import React from "react";
import Modal from "common/components/Modal";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import * as Blockly from "blockly/core";
import { csrfToken, csrfParam } from "rails-ujs";
import styles from "common/styles/ModalWindow.scss";
import iconImage from "common/statics/finish_icon.png";
import GenerateCssCode from "components/lesson1/common/components/GenerateCssCode";

class StageFinishModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      checked: {},
      isModalOpen: false,
      disabled: false,
    };
    this.openModal = this.openModal.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isDesingLesson(lessonId, stageId) {
    return lessonId === 1 || (lessonId === 5 && stageId === 1);
  }

  openModal() {
    const { store } = this.props;
    if (store.schemas) {
      this.setState({
        code: JSON.stringify(toJS(store.schemas)),
      });
    } else {
      Blockly.WidgetDiv.hide();
      const workspace = Blockly.getMainWorkspace();
      const xml = Blockly.Xml.workspaceToDom(workspace);
      this.setState({
        code: Blockly.Xml.domToText(xml),
      });
    }
    this.setState({
      isModalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  toggleCheckbox(e) {
    const { id, checked } = e.target;
    const nextState = { ...this.state.checked };
    nextState[id] = checked;
    this.setState({ checked: nextState });
  }

  handleSubmit() {
    this.setState({
      disabled: true,
    });
  }

  render() {
    const { store, lessonId, stageId, checkPoint } = this.props;
    let submitButtonText = "";
    if (store.submittedWorkspace) {
      submitButtonText = store.stage.next_id
        ? "再提出して次のステージへ"
        : "再提出してコースを終了";
    } else {
      submitButtonText = store.stage.next_id
        ? "提出して次のステージへ"
        : "提出してコースを終了";
    }
    const modalStyle = {
      content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "block",
        width: "36em",
        height: "600px",
        overflow: "hidden",
        WebkitOverflowScrolling: "touch",
        borderRadius: "10px",
        outline: "none",
        padding: "0",
        textAlign: "center",
      },
    };

    return (
      <>
        <button
          id="submitButton"
          className={
            this.isDesingLesson(lessonId, stageId)
              ? styles.designUploadButton
              : styles.blocklyUploadButton
          }
          type="button"
          onClick={() => this.openModal()}
        >
          <span className={`bi bi-upload ${styles.buttonIcon}`} />
          <span>確認する</span>
        </button>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={() => this.closeModal()}
          style={modalStyle}
        >
          <div className={styles.modalLayout}>
            <div className={styles.titleArea}>
              <div className={styles.iconImage}>
                <img src={iconImage} width="94" alt="" />
              </div>
              <div>
                <h2
                  className={styles.modalTitle}
                >{`ステージ ${store.stage.number} は終わりましたか？`}</h2>
                <p className={styles.modalSubTitle}>
                  終わったら，先生にこのステージ内容を送信しましょう！
                </p>
              </div>
            </div>
            <div className={styles.scrollableArea}>
              {checkPoint.map((check, index) => (
                <React.Fragment key={check}>
                  <input
                    style={{ display: "none" }}
                    type="checkbox"
                    id={`checkbox${index}`}
                    onChange={this.toggleCheckbox}
                    checked={this.state.checked[`checkbox${index}`] || false}
                  />
                  <label
                    htmlFor={`checkbox${index}`}
                    className={styles.checkbox}
                  >
                    {check}
                  </label>
                </React.Fragment>
              ))}
            </div>
            <div>
              {this.isDesingLesson(lessonId, stageId) ? (
                <GenerateCssCode />
              ) : null}
            </div>
            <div className={styles.modalButtons}>
              <button
                className={styles.secondarybutton}
                type="button"
                onClick={() => this.closeModal()}
              >
                閉じる
              </button>
              <div className={styles.primarybutton}>
                <form
                  onSubmit={this.handleSubmit}
                  action="/workspaces"
                  method="POST"
                >
                  <input type="hidden" name="stage_id" value={store.stage.id} />
                  <input type="hidden" name="body" value={this.state.code} />
                  <input type="hidden" name={csrfParam()} value={csrfToken()} />
                  <button type="submit" disabled={this.state.disabled}>
                    {submitButtonText}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default inject("store")(observer(StageFinishModal));
