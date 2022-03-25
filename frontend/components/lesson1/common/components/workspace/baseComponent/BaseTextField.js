import React, { Component } from "react";
import styles from "components/lesson1/common/styles/designTool.scss";
import DesignWindow from "components/lesson1/common/components/workspace/DesignWindow";

class BaseTextField extends Component {
  render() {
    const { title, value, onChange } = this.props;
    return (
      <DesignWindow title={title}>
        <div className={`${styles.formField} ${styles.flexField}`}>
          <textarea
            name="textfield"
            rows="4"
            cols="40"
            className={`${styles.fullWidth} ${styles.textArea}`}
            value={value}
            placeholder="テキストを入力してください"
            onChange={onChange}
          />
        </div>
      </DesignWindow>
    );
  }
}

export default BaseTextField;
