import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styles from "components/lesson1/common/styles/designTool.scss";
import { SketchPicker } from "react-color";
import DesignWindow from "./DesignWindow";

class Color extends Component {
  render() {
    const { title, value, store, name, presetColors } = this.props;
    const { className } = store.clickElm;
    const input = {};
    return (
      <DesignWindow title={title}>
        <div className={`${styles.formField} ${styles.flexField}`}>
          <SketchPicker
            color={value}
            onChange={(color) => {
              input[name] = color.hex;
              store.setStyle(className, input);
            }}
            disableAlpha
            presetColors={presetColors}
          />
        </div>
      </DesignWindow>
    );
  }
}

export default inject("store")(observer(Color));
