import React, { Component } from "react";
import styles from "components/lesson1/common/styles/designTool.scss";
import { inject, observer } from "mobx-react";
import {
  convertArrayToText,
  convertTextToArray,
} from "components/lesson1/common/util/convertCssShortHand";
import paddingStyles from "components/lesson1/common/styles/workspace/Padding.scss";
import textCheck, { nullCheck } from "components/lesson1/common/util/textCheck";
import { removeLeadingZeros } from "components/lesson1/common/util/removeLeadingZeros";
import DesignWindow from "./DesignWindow";

const paddingItems = [
  {
    placeholder: "上",
    index: 0,
    posStyle: "topPos",
  },
  {
    placeholder: "右",
    index: 1,
    posStyle: "rightPos",
  },
  {
    placeholder: "下",
    index: 2,
    posStyle: "bottomPos",
  },
  {
    placeholder: "左",
    index: 3,
    posStyle: "leftPos",
  },
];

export class Padding extends Component {
  generateInputs(paddingValues, callback) {
    const { toastStore } = this.props;
    const elmArr = [];
    const newValues = paddingValues;
    paddingItems.forEach((elm) => {
      elmArr.push(
        <div
          key={elm.index}
          className={`${paddingStyles.paddingInput} ${
            paddingStyles[elm.posStyle]
          }`}
        >
          <input
            type="text"
            value={paddingValues[elm.index]}
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
    const paddingValues = arrVal.length === 0 ? [0, 0, 0, 0] : arrVal;
    const input = {};
    return (
      <DesignWindow title={title}>
        <div className={`${styles.formField} ${styles.flexField}`}>
          <div className={paddingStyles.paddingField}>
            <div className={paddingStyles.centerRect} />
            {this.generateInputs(paddingValues, (inputValues) => {
              input[name] = convertArrayToText(inputValues);
              store.setStyle(className, input);
            })}
          </div>
        </div>
      </DesignWindow>
    );
  }
}

export default inject("store", "toastStore")(observer(Padding));
