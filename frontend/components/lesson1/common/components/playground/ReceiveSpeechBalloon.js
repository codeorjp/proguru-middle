import BaseSpeechBalloon from "components/lesson1/common/components/playground/baseComponent/BaseSpeechBalloon";
import { inject, observer } from "mobx-react";

class ReceiveSpeechBalloon extends BaseSpeechBalloon {
  constructor(props) {
    super(props);
    this.componentName = "ReceiveSpeechBalloon";
    this.componentTitle = "メッセージ受信側の吹き出し";
    this.isReceive = true;
  }
}

ReceiveSpeechBalloon.defaultProps = {
  userName: "翔太",
  message: "こんにちは，私の名前は翔太です。",
  isSample: false,
};

export default inject("store")(observer(ReceiveSpeechBalloon));
