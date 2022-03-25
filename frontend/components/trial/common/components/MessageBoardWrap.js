import React, { useState } from "react";
import styles from "components/trial/common/styles/MessageBoardWrap.scss";

export default ({ messageBoard, messageDB }) => {
  const [isMessageBoard, setIsMessageBoard] = useState(true);

  return (
    <div>
      <div className={styles.messageBoardTitle}>
        <div>
          <button
            type="button"
            className={styles.tabButton}
            onClick={() => setIsMessageBoard(true)}
          >
            <p
              className={`${styles.designAreaTitle} ${
                isMessageBoard ? styles.active : null
              }`}
            >
              あなたのチャット
            </p>
          </button>
          <button
            type="button"
            className={styles.tabButton}
            onClick={() => setIsMessageBoard(false)}
          >
            <p
              className={`${styles.designAreaTitle} ${
                !isMessageBoard ? styles.active : null
              }`}
            >
              データベースの画面
            </p>
          </button>
        </div>
        <p className={styles.windowButton}>● ● ●</p>
      </div>
      <div>{isMessageBoard ? messageBoard : messageDB}</div>
    </div>
  );
};
