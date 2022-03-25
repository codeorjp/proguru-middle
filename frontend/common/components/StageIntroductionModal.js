import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import Modal from "common/components/Modal";
import styles from "common/styles/ModalWindow.scss";

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

const StageIntroductionModal = ({ store, description }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    store.setFirstTimeDone(
      `lesson${store.lesson.number}-stage${store.stage.number}`
    );
  };

  return (
    <Modal
      isOpen={store.isStageFirstTime && description && isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
    >
      <div className={styles.modalLayout}>
        <div className={styles.titleArea}>
          <h2
            className={styles.modalTitle}
          >{`ステージ${store.stage.number}で学ぶこと`}</h2>
        </div>
        <div className={styles.scrollableArea}>{description}</div>
        <div
          className={styles.modalButtons}
          style={{ justifyContent: "center" }}
        >
          <button
            className={styles.secondarybutton}
            type="button"
            onClick={closeModal}
          >
            閉じる
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default inject("store")(observer(StageIntroductionModal));
