import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styles from "components/lesson1/common/styles/designTool.scss";
import FontStyles from "components/lesson1/common/styles/workspace/Font.scss";
import textCheck from "components/lesson1/common/util/textCheck";
import DesignWindow from "./DesignWindow";

const alignItems = [
  {
    alignName: "left",
  },
  {
    alignName: "center",
  },
  {
    alignName: "right",
  },
];

class Font extends Component {
  onChange(input) {
    const { store, name, value } = this.props;
    const { className } = store.clickElm;
    const pushData = {};
    pushData[name] = {
      ...value,
      ...input,
    };
    store.setStyle(className, pushData);
  }

  generateButtons(val, callback) {
    const elmArr = [];
    alignItems.forEach((elm) => {
      elmArr.push(
        <button
          key={elm.alignName}
          type="button"
          className={this.getActiveStyle(val, elm.alignName)}
          onClick={() => {
            callback(elm.alignName);
          }}
        >
          <span
            className={`bi bi-text-${elm.alignName} ${FontStyles.alignIcon}`}
          />
        </button>
      );
    });
    return elmArr;
  }

  getActiveStyle(data, align) {
    return data === align ? FontStyles.isActive : "";
  }

  render() {
    const { title, placeholder, value, toastStore } = this.props;
    const fontSizeValue = value.fontSize.replace("px", "");
    return (
      <DesignWindow title={title}>
        <div className={`${styles.formField} ${styles.flexField}`}>
          <p>文字サイズ</p>
          <input
            type="text"
            value={fontSizeValue || ""}
            placeholder={placeholder}
            className={FontStyles.sizeInput}
            onChange={(e) => {
              textCheck(e.target.value, toastStore);
              this.onChange({ fontSize: `${e.target.value}px` });
            }}
          />
          <p className={styles.unit}>
            <span>(ピクセル)</span>
            px
          </p>
        </div>
        <div className={`${styles.formField} ${styles.flexField}`}>
          <p>文字揃え</p>
          <div className={FontStyles.textAlignField}>
            {this.generateButtons(value.textAlign, (align) => {
              this.onChange({ textAlign: align });
            })}
          </div>
        </div>
      </DesignWindow>
    );
  }
}

export default inject("store", "toastStore")(observer(Font));
