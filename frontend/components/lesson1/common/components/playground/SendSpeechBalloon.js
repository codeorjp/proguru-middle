import BaseSpeechBalloon from "components/lesson1/common/components/playground/baseComponent/BaseSpeechBalloon";
import { inject, observer } from "mobx-react";

class SendSpeechBalloon extends BaseSpeechBalloon {
  constructor(props) {
    super(props);
    this.componentName = "SendSpeechBalloon";
    this.componentTitle = "メッセージ送信側の吹き出し";
    this.isReceive = false;
  }
}

SendSpeechBalloon.defaultProps = {
  userName: "美咲",
  message: "こんにちは，私の名前は美咲です。",
  isSample: false,
};

export default inject("store")(observer(SendSpeechBalloon));
