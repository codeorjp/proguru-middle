import React from "react";
import { inject, observer } from "mobx-react";
import SubmitArea from "common/BlocklyLesson/components/SubmitArea";
import styles from "components/trial/common/styles/MessageDB.scss";

const MessageDB = ({ types, store }) => (
  <div className={styles.wrapper}>
    <div className={styles.description}>データベースの画面</div>
    <div>
      <table rules="all" className={styles.table}>
        <thead>
          <tr>
            <th className={styles.id}>id</th>
            <th className={styles.userName}>userName</th>
            <th className={styles.body}>content</th>
            <th className={styles.createdAt}>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {store.tableItems.map((item) => {
            const { messageId, userName, body, createdAt, image } = item;

            let content;
            if (image) {
              content = (
                <td className={styles.body}>
                  <img src={image} height="50px" alt="" />
                </td>
              );
            } else {
              content = <td className={styles.body}>{body}</td>;
            }

            return (
              <tr key={messageId}>
                <td className={styles.id}>{messageId}</td>
                <td className={styles.userName}>{userName}</td>
                {content}
                <td className={styles.createdAt}>
                  {createdAt.format("h:mm A")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className={styles.messageboardFooterContents}>
      <SubmitArea types={types} />
    </div>
  </div>
);

export default inject("store")(observer(MessageDB));
