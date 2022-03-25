import React from "react";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";
import SendProfileIcon from "components/lesson1/common/components/playground/SendProfileIcon";
import ReceiveSpeechBalloon from "components/lesson1/common/components/playground/ReceiveSpeechBalloon";
import ReceiveProfileIcon from "components/lesson1/common/components/playground/ReceiveProfileIcon";
import ChatInput from "components/lesson1/common/components/playground/ChatInput";
import SubmitButton from "components/lesson1/common/components/playground/SubmitButton";
import ChatBody from "components/lesson1/common/components/playground/ChatBody";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import styles from "common/styles/StageIntroductionModal.scss";
import chatBody from "components/lesson1/statics/chatBody.png";

const sampleChatInput = {
  fontSize: "16px",
  color: "#5C5C5C",
  background: "#F5F5F5",
  padding: "14px",
  border: "1px solid #d8d8d8",
  borderRadius: "4px",
};
const sampleSubmit = {
  fontSize: "16px",
  background: "#007FEB",
  color: "#fff",
  padding: "14px",
  borderRadius: "4px",
};
const sampleSendSpeechBalloon = {
  fontSize: "16px",
  textAlign: "right",
  padding: "10px 20px 10px 10px",
  borderRadius: "30px 0 30px 30px",
  color: "#fff",
  background: "#007FEB",
};
const sampleRecieveSpeechBalloon = {
  fontSize: "16px",
  textAlign: "left",
  padding: "10px 10px 10px 20px",
  borderRadius: "0 30px 30px 30px",
  color: "#2D2D2D",
  background: "#DEDEDE",
};
const sampleProfileIcon = {
  width: "70px",
  height: "70px",
  background: "#F0F0F0",
  borderRadius: "100px",
  border: "1px solid #A5A5A5",
};

const StageSettings = {
  stageTask: "チャット画面の背景色や使用するフォントを変えよう。",
  stageConfig: [
    {
      className: "ChatBody",
      editDesignComponent: ["background", "fontFamily"],
    },
  ],
  isGlobalSettings: true,
  noPadding: true,
  children: (
    <>
      <div key={playGroundKey.userStyleArea}>
        <ChatBody>
          <div className="sendMessageArea">
            <SendSpeechBalloon isSample style={sampleSendSpeechBalloon} />
            <SendProfileIcon isSample style={sampleProfileIcon} />
          </div>
          <div className="sendMessageArea">
            <ReceiveProfileIcon isSample style={sampleProfileIcon} />
            <ReceiveSpeechBalloon isSample style={sampleRecieveSpeechBalloon} />
          </div>
          <div className="submitArea">
            <ChatInput isSample style={sampleChatInput} />
            <SubmitButton isSample style={sampleSubmit} />
          </div>
        </ChatBody>
      </div>
    </>
  ),
  checkPoint: [
    "「全体設定」ボタンから，チャット画面の背景色や使用するフォントを変えることはできた？",
  ],
  description: (
    <>
      このステージではチャット画面の全体的なデザインを編集するよ！
      <br />
      「全体設定」をクリックして，デザインを編集しよう！
      <div className={styles.imageWrapper}>
        <img src={chatBody} width="100%" alt="" />
      </div>
    </>
  ),
};

export default StageSettings;
