import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styles from "components/lesson1/common/styles/playground/touchItem.scss";

class BaseTouchArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
    };
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
    const { componentName, store } = this.props;
    return store.clickElm.className === componentName;
  }

  render() {
    const { className, children, isSample, onClick, style } = this.props;
    return (
      <>
        {isSample ? (
          <div style={style} className={className}>
            {children}
          </div>
        ) : (
          <div
            style={style}
            className={`${className} ${styles.touchItem}`}
            onClick={onClick}
            onKeyPress={onClick}
            role="button"
            tabIndex={0}
          >
            {children}
            <div
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
              className={`
                ${styles.touchHoverItem}
                ${this.selectedOwn() ? styles.isSelected : null}
                ${
                  !this.selectedOwn() && !this.state.isMouseOver
                    ? styles.selectable
                    : null
                }
              `}
            />
          </div>
        )}
      </>
    );
  }
}

export default inject("store")(observer(BaseTouchArea));
