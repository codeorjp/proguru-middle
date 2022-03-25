import React, { Component } from "react";
import BorderStyles from "components/lesson1/common/styles/workspace/Border.scss";
import styles from "components/lesson1/common/styles/designTool.scss";
import {
  convertArrayToText,
  convertTextToArray,
} from "components/lesson1/common/util/convertCssShortHand";
import { inject, observer } from "mobx-react";
import textCheck, { nullCheck } from "components/lesson1/common/util/textCheck";
import { removeLeadingZeros } from "components/lesson1/common/util/removeLeadingZeros";
import DesignWindow from "./DesignWindow";

const borderRadiusItems = [
  {
    placeholder: "左上",
    index: 0,
    posStyle: "leftTopPos",
  },
  {
    placeholder: "右上",
    index: 1,
    posStyle: "rightTopPos",
  },
  {
    placeholder: "右下",
    index: 2,
    posStyle: "rightBottomPos",
  },
  {
    placeholder: "左下",
    index: 3,
    posStyle: "leftBottomPos",
  },
];
class BorderRadius extends Component {
  generateInputs(borderRadiusValues, callback) {
    const { toastStore } = this.props;
    const elmArr = [];
    const newValues = borderRadiusValues;
    borderRadiusItems.forEach((elm) => {
      elmArr.push(
        <div
          key={elm.index}
          className={`${BorderStyles.borderInput} ${
            BorderStyles[elm.posStyle]
          }`}
        >
          <input
            type="text"
            value={borderRadiusValues[elm.index]}
            placeholder={elm.placeholder}
            onChange={(e) => {
              textCheck(e.target.value, toastStore);
              nullCheck(e.target.value, toastStore);
              newValues[elm.index] = removeLeadingZeros(e.target.value).replace(
                /\s+/g,
                ""
              );
              callback(newValues);
            }}
          />
        </div>
      );
    });
    return elmArr;
  }

  render() {
    const { title, value, store, name } = this.props;
    const { className } = store.clickElm;
    const arrVal = convertTextToArray(value);
    const borderRadiusValues = arrVal.length === 0 ? [0, 0, 0, 0] : arrVal;
    const input = {};
    return (
      <DesignWindow title={title}>
        <div className={`${styles.formField} ${BorderStyles.flex}`}>
          <div className={BorderStyles.borderField}>
            <div className={BorderStyles.centerRect}>
              <div className={BorderStyles.leftTop} />
              <div className={BorderStyles.rightTop} />
              <div className={BorderStyles.rightBottom} />
              <div className={BorderStyles.leftBottom} />
            </div>
            {this.generateInputs(borderRadiusValues, (inputValues) => {
              input[name] = convertArrayToText(inputValues);
              store.setStyle(className, input);
            })}
          </div>
        </div>
      </DesignWindow>
    );
  }
}

export default inject("store", "toastStore")(observer(BorderRadius));
