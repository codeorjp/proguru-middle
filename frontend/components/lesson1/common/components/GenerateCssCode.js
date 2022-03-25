import React, { useState } from "react";
import _ from "lodash";
import { inject, observer } from "mobx-react";
import flattenObject from "common/utils/flattenObject";
import styles from "components/lesson1/common/styles/cssCode.scss";

const GenerateCssCode = ({ store }) => {
  const editCss = {};
  store.stageConfig.forEach((config) => {
    editCss[config.className] = flattenObject(
      store.schemas[config.className].style
    );
  });

  const [open, setOpenFlg] = useState(false);

  const camelToKebab = (str) =>
    str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

  const cssCode = () => {
    const codes = [];
    _.forEach(editCss, (elm, key) => {
      const property = [];
      _.forEach(elm, (elm2, key2) => {
        property.push(
          <p key={key2}>
            <span className={styles.property}>{camelToKebab(key2)}</span>:
            <span className={styles.value}>{elm2 ? ` ${elm2}` : ` ""`}</span>;
          </p>
        );
      });
      codes.push(
        <div key={key}>
          <span className={styles.className}>
            .{camelToKebab(_.camelCase(key))}
          </span>
          <span className={styles.spacing}>:</span>
          {`{`}
          {property}
          {`}`}
        </div>
      );
    });

    return <div>{codes}</div>;
  };
  return (
    <div className={styles.wrap}>
      <div
        onClick={() => {
          setOpenFlg(!open);
        }}
        onKeyPress={() => {
          setOpenFlg(!open);
        }}
        role="button"
        tabIndex={0}
        className={styles.title}
      >
        あなたが作ったデザインのCSSを見る
      </div>
      {open ? <div className={styles.code}>{cssCode()}</div> : null}
    </div>
  );
};

export default inject("store")(observer(GenerateCssCode));
