import React from "react";
import { inject, observer } from "mobx-react";
import BaseTouchComponent from "components/lesson1/common/components/playground/baseComponent/BaseTouchComponent";
import styles from "components/lesson1/common/styles/playground/globalSettingButton.scss";
import touchItemStyles from "components/lesson1/common/styles/playground/touchItem.scss";

class GlobalSettingButton extends BaseTouchComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
    };
    this.componentName = "ChatBody";
    this.componentTitle = "チャット画面全体";
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.selectedOwn = this.selectedOwn.bind(this);
  }

  onMouseOver() {
    this.setState({ isMouseOver: true });
  }

  onMouseOut() {
    this.setState({ isMouseOver: false });
  }

  selectedOwn() {
    const { store } = this.props;
    return store.clickElm.className === this.componentName;
  }

  render() {
    return (
      <button
        className={styles.button}
        type="submit"
        onClick={() => {
          this.onClick();
        }}
      >
        <span className={`${styles.icon} bi bi-gear-fill`} />
        <span>全体設定</span>
        <div
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          className={`
            ${touchItemStyles.touchHoverItem}
            ${this.selectedOwn() ? touchItemStyles.isSelected : null}
            ${
              !this.selectedOwn() && !this.state.isMouseOver
                ? touchItemStyles.selectable
                : null
            }
          `}
        />
      </button>
    );
  }
}

GlobalSettingButton.defaultProps = {
  onClick: () => {},
};

export default inject("store")(observer(GlobalSettingButton));
