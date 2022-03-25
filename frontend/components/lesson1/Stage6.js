import React from "react";
import ChatInput from "components/lesson1/common/components/playground/ChatInput";
import SubmitButton from "components/lesson1/common/components/playground/SubmitButton";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";
import SendProfileIcon from "components/lesson1/common/components/playground/SendProfileIcon";
import styles from "common/styles/StageIntroductionModal.scss";
import sendButton from "components/lesson1/statics/sendButton.png";

const defaultStyle = {
  font: { fontSize: "10px", textAlign: "right" },
  color: "#000",
  border: {},
  background: "#fff",
  padding: "0px",
};
const sampleStyle = {
  fontSize: "16px",
  color: "#5C5C5C",
  background: "#F5F5F5",
  padding: "14px",
  border: "1px solid #d8d8d8",
  borderRadius: "4px",
};
const sampleStyle2 = {
  fontSize: "16px",
  background: "#007FEB",
  color: "#fff",
  padding: "14px",
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
    "デザイン見本に合わせて，送信ボタンの文字の大きさを16px，配置を中央揃え，余白を上下左右14pxにしよう。また，全ての角を4pxにしよう。",
  stageConfig: [
    {
      className: "SubmitButton",
      editDesignComponent: [
        "font",
        "padding",
        "borderRadius",
        "color",
        "background",
      ],
    },
  ],
  presetColors: ["#007FEB", "#FFF"],
  children: (
    <>
      <div key={playGroundKey.userStyleArea}>
        <div className="sendMessageArea">
          <SendSpeechBalloon isSample style={sampleSendSpeechBalloonStyle} />
          <SendProfileIcon isSample style={sampleSendProfileIconStyle} />
        </div>
        <div className="submitArea">
          <ChatInput isSample style={sampleStyle} />
          <SubmitButton defaultStyle={defaultStyle} />
        </div>
      </div>
      <div key={playGroundKey.sampleStyleArea}>
        <div className="sendMessageArea">
          <SendSpeechBalloon isSample style={sampleSendSpeechBalloonStyle} />
          <SendProfileIcon isSample style={sampleSendProfileIconStyle} />
        </div>
        <div className="submitArea">
          <ChatInput isSample style={sampleStyle} />
          <SubmitButton isSample style={sampleStyle2} />
        </div>
      </div>
    </>
  ),
  checkPoint: ["デザイン見本のような「メッセージ送信用のボタン」を作れた？"],
  description: (
    <>
      このステージではチャット画面の送信ボタンのデザインを編集するよ！
      <br />
      送信ボタンをクリックして，デザインを編集しよう！
      <div className={styles.imageWrapper}>
        <img src={sendButton} width="100%" alt="" />
      </div>
    </>
  ),
};

export default StageSettings;
