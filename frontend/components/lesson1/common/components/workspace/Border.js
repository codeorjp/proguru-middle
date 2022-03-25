import React, { Component } from "react";
import styles from "components/lesson1/common/styles/designTool.scss";
import { inject, observer } from "mobx-react";
import BorderStyles from "components/lesson1/common/styles/workspace/Border.scss";
import { SketchPicker } from "react-color";
import textCheck from "components/lesson1/common/util/textCheck";
import DesignWindow from "./DesignWindow";

class Border extends Component {
  onChange(input) {
    const { store, name, value } = this.props;
    const { className } = store.clickElm;
    const pushData = {};

    pushData[name] = {
      ...value,
      ...input,
      borderStyle: "solid",
    };
    store.setStyle(className, pushData);
  }

  render() {
    const { title, placeholder, value, toastStore, presetColors } = this.props;
    const borderWidthValue = value.borderWidth
      ? value.borderWidth.replace("px", "")
      : 0;
    return (
      <DesignWindow title={title}>
        <div className={styles.formField}>
          <div className={BorderStyles.widthField}>
            <p>線の太さ</p>
            <div className={BorderStyles.flex}>
              <input
                type="text"
                value={borderWidthValue}
                placeholder={placeholder}
                className={BorderStyles.widthInput}
                onChange={(e) => {
                  textCheck(e.target.value, toastStore);
                  this.onChange({ borderWidth: `${e.target.value}px` });
                }}
              />
              <p className={styles.unit}>
                <span>(ピクセル)</span>
                px
              </p>
            </div>
          </div>
          <div>
            <SketchPicker
              color={value.borderColor}
              onChange={(color) => {
                this.onChange({ borderColor: color.hex });
              }}
              presetColors={presetColors}
            />
          </div>
        </div>
      </DesignWindow>
    );
  }
}

export default inject("store", "toastStore")(observer(Border));
