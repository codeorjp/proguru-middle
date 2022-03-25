import React from "react";
import ChatInput from "components/lesson1/common/components/playground/ChatInput";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";
import SendProfileIcon from "components/lesson1/common/components/playground/SendProfileIcon";
import styles from "common/styles/StageIntroductionModal.scss";
import inputArea from "components/lesson1/statics/inputArea.png";

const sampleStyle = {
  fontSize: "16px",
  color: "#5C5C5C",
  background: "#F5F5F5",
  padding: "14px",
  border: "1px solid #d8d8d8",
  borderRadius: "4px",
};
const sampleSendSpeechBalloonStyle = {
  fontSize: "16px",
  textAlign: "right",
  padding: "10px",
  borderRadius: "30px 0 30px 30px",
  color: "#fff",
  background: "#007FEB",
};
const sampleSendProfileIconStyle = {
  width: "70px",
  height: "70px",
  background: "#fff",
  borderRadius: "100px",
  border: "1px solid #A5A5A5",
};

const StageSettings = {
  stageTask:
    "デザイン見本に合わせて，テキストを入力するエリアの枠線の太さを1px，文字の大きさを16px，余白を上下左右14pxにしよう。また，全ての角を4pxにしよう。",
  stageConfig: [
    {
      className: "ChatInput",
      editDesignComponent: [
        "border",
        "font",
        "padding",
        "borderRadius",
        "color",
        "background",
      ],
    },
  ],
  presetColors: ["#757575", "#F5F5F5", "#D8D8D8"],
  children: (
    <>
      <div key={playGroundKey.userStyleArea}>
        <div className="sendMessageArea">
          <SendSpeechBalloon isSample style={sampleSendSpeechBalloonStyle} />
          <SendProfileIcon isSample style={sampleSendProfileIconStyle} />
        </div>
        <div className="submitArea">
          <ChatInput />
        </div>
      </div>
      <div key={playGroundKey.sampleStyleArea}>
        <div className="sendMessageArea">
          <SendSpeechBalloon isSample style={sampleSendSpeechBalloonStyle} />
          <SendProfileIcon isSample style={sampleSendProfileIconStyle} />
        </div>
        <div className="submitArea">
          <ChatInput isSample style={sampleStyle} />
        </div>
      </div>
    </>
  ),
  checkPoint: ["デザイン見本のような「テキスト入力エリア」を作れた？"],
  description: (
    <>
      このステージではチャット画面のテキスト入力エリアのデザインを編集するよ！
      <br />
      テキスト入力エリアをクリックしてデザインを編集しよう！
      <div className={styles.imageWrapper}>
        <img src={inputArea} width="100%" alt="" />
      </div>
    </>
  ),
};

export default StageSettings;
