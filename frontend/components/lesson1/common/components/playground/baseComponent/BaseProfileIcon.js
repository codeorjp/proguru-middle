import React from "react";
import BaseTouchComponent from "components/lesson1/common/components/playground/baseComponent/BaseTouchComponent";
import styles from "components/lesson1/common/styles/playground/SendProfileIcon.scss";
import misaki from "common/statics/misaki.png";
import BaseTouchArea from "components/lesson1/common/components/playground/baseComponent/BaseTouchArea";

export default class BaseProfileIcon extends BaseTouchComponent {
  constructor(props) {
    super(props);
    this.componentName = "BaseProfileIcon";
    this.componentTitle = "ベースコンポーネント";
    this.icon = misaki;
  }

  render() {
    const { isSample } = this.props;
    // ストアからスタイルを取得
    const editStyle = this.getEditStyle();
    return (
      <BaseTouchArea
        onClick={() => {
          this.onClick();
        }}
        isSample={isSample}
        componentName={this.componentName}
      >
        <div style={editStyle} className={styles.profileIcon}>
          <img className={styles.iconImage} src={this.icon} alt="" />
        </div>
      </BaseTouchArea>
    );
  }
}
