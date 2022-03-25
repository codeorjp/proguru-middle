import React from "react";
import Modal from "common/components/Modal";
import LessonOverviews from "components/lessons/LessonOverviews";
import styles from "common/styles/ModalWindow.scss";

export default class BeforeLessonModal extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  openModal() {
    this.setState({
      isOpen: true,
    });
  }

  closeModal() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const modalStyle = {
      content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "block",
        width: "40em",
        height: "600px",
        overflow: "hidden",
        WebkitOverflowScrolling: "touch",
        borderRadius: "10px",
        outline: "none",
        padding: "0",
        textAlign: "center",
      },
    };
    const { classname, lessonId } = this.props;
    return (
      <div>
        <button
          className={classname}
          type="button"
          onClick={() => this.openModal()}
        >
          <span>レッスンを始める</span>
        </button>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.closeModal()}
          style={modalStyle}
        >
          <div className={styles.modalLayout}>
            <div className={styles.titleArea}>
              <h2
                className={styles.modalTitle}
              >{`レッスン${lessonId}で学ぶこと`}</h2>
            </div>
            <div className={styles.scrollableArea}>
              {LessonOverviews[lessonId]}
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
                <a href={`/lessons/${lessonId}/stages/1`}>
                  <button type="button">{`レッスン${lessonId}を始める`}</button>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
