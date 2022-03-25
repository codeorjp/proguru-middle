import React from "react";
import { inject, observer } from "mobx-react";
import styles from "../styles/AdjustBar.scss";

class AdjustBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.adjustBarStore.toggle();
  }

  render() {
    const { isOpen } = this.props.adjustBarStore;
    return (
      <div
        className={`${styles.bar}`}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        role="button"
        tabIndex={0}
      >
        <div className={styles.centerBar}>
          <p
            className={`bi bi-play-fill ${styles.barIcon} ${
              isOpen ? "" : styles.barIconRotate
            }`}
          />
        </div>
      </div>
    );
  }
}

export default inject("adjustBarStore")(observer(AdjustBar));
