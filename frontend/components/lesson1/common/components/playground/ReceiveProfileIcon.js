import BaseProfileIcon from "components/lesson1/common/components/playground/baseComponent/BaseProfileIcon";
import { inject, observer } from "mobx-react";
import syota from "common/statics/syota.png";

class ReceiveProfileIcon extends BaseProfileIcon {
  constructor(props) {
    super(props);
    this.componentName = "ReceiveProfileIcon";
    this.componentTitle = "メッセージ受信側のアイコン";
    this.icon = syota;
  }
}

ReceiveProfileIcon.defaultProps = {
  isSample: false,
};

export default inject("store")(observer(ReceiveProfileIcon));
