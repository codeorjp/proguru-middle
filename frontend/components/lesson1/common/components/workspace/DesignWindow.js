import React, { Component } from "react";
import styles from "../../styles/designTool.scss";

export default class DesignWindow extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className={styles.window}>
        <div className={styles.title}>{title}</div>
        <div className={styles.body}>{children}</div>
      </div>
    );
  }
}
