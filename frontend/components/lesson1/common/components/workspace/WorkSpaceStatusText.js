import React from "react";
import styles from "common/styles/WorkSpaceStatusText.scss";
import { inject, observer } from "mobx-react";

class WorkSpaceStatusText extends React.Component {
  onRemoveClick() {
    this.props.store.setClickElm({
      title: "",
      className: "",
      style: {},
      editDesignComponent: [],
    });
  }

  render() {
    return (
      <div className={`${styles.bgGray} ${styles.flex} ${styles.spaceBetween}`}>
        <p>{this.props.title}</p>
        <button
          type="button"
          onClick={() => {
            this.onRemoveClick();
          }}
          className={styles.removeButton}
        >
          選択を外す
        </button>
      </div>
    );
  }
}

export default inject("store")(observer(WorkSpaceStatusText));
