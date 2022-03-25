import React from "react";
import { inject, observer } from "mobx-react";
import styles from "common/styles/layout.scss";

class PlayGroundWrap extends React.Component {
  renderChildren() {
    const { adjustBarStore, children } = this.props;
    if (adjustBarStore.isOpen) {
      return children;
    } else {
      return <div className={styles.playGroundHiddenInner}>{children}</div>;
    }
  }

  render() {
    const { adjustBarStore } = this.props;
    return (
      <div
        id="playGroundWrap"
        className={
          adjustBarStore.isOpen
            ? styles.playGroundWrap
            : styles.playGroundHidden
        }
      >
        {this.renderChildren()}
      </div>
    );
  }
}

export default inject("adjustBarStore")(observer(PlayGroundWrap));
