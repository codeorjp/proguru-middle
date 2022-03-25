import BaseProfileIcon from "components/lesson1/common/components/playground/baseComponent/BaseProfileIcon";
import { inject, observer } from "mobx-react";
import misaki from "common/statics/misaki.png";

class SendProfileIcon extends BaseProfileIcon {
  constructor(props) {
    super(props);
    this.componentName = "SendProfileIcon";
    this.componentTitle = "メッセージ送信側のアイコン";
    this.icon = misaki;
  }
}

SendProfileIcon.defaultProps = {
  isSample: false,
};

export default inject("store")(observer(SendProfileIcon));
