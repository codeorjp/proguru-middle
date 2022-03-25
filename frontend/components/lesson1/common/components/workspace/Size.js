import React, { Component } from "react";
import styles from "components/lesson1/common/styles/designTool.scss";
import { inject, observer } from "mobx-react";
import textCheck from "components/lesson1/common/util/textCheck";
import DesignWindow from "./DesignWindow";

class Size extends Component {
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

  render() {
    const { title, placeholder, value, toastStore } = this.props;
    const widthValue = value.width.replace("px", "");
    const heightValue = value.height.replace("px", "");
    return (
      <DesignWindow title={title}>
        <div className={`${styles.formField}`}>
          <div className={styles.flexField}>
            <p className={styles.unit}>横幅</p>
            <input
              type="text"
              value={widthValue || ""}
              placeholder={placeholder}
              onChange={(e) => {
                textCheck(e.target.value, toastStore);
                this.onChange({ width: `${e.target.value}px` });
              }}
            />
            <p className={styles.unit}>
              <span>(ピクセル)</span>
              px
            </p>
          </div>
          <div className={styles.flexField}>
            <p className={styles.unit}>高さ</p>
            <input
              type="text"
              value={heightValue || ""}
              placeholder={placeholder}
              onChange={(e) => {
                textCheck(e.target.value, toastStore);
                this.onChange({ height: `${e.target.value}px` });
              }}
            />
            <p className={styles.unit}>
              <span>(ピクセル)</span>
              px
            </p>
          </div>
        </div>
      </DesignWindow>
    );
  }
}

export default inject("store", "toastStore")(observer(Size));
