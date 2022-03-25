import React from "react";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";
import SendProfileIcon from "components/lesson1/common/components/playground/SendProfileIcon";
import ReceiveSpeechBalloon from "components/lesson1/common/components/playground/ReceiveSpeechBalloon";
import ReceiveProfileIcon from "components/lesson1/common/components/playground/ReceiveProfileIcon";
import ChatInput from "components/lesson1/common/components/playground/ChatInput";
import SubmitButton from "components/lesson1/common/components/playground/SubmitButton";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import stageStyle from "components/lesson1/common/styles/Stage.scss";
import ChatBody from "components/lesson1/common/components/playground/ChatBody";

const StageSettings = {
  stageTask: "今まで学習したことを使って，チャット画面を自由にデザインしよう！",
  stageConfig: [
    {
      className: "SendSpeechBalloon",
      editDesignComponent: [
        "font",
        "border",
        "borderRadius",
        "color",
        "background",
        "padding",
        "sendText",
      ],
    },
    {
      className: "SendProfileIcon",
      editDesignComponent: ["imgSize", "border", "borderRadius", "background"],
    },
    {
      className: "ReceiveSpeechBalloon",
      editDesignComponent: [
        "font",
        "border",
        "borderRadius",
        "color",
        "background",
        "padding",
        "receiveText",
      ],
    },
    {
      className: "ReceiveProfileIcon",
      editDesignComponent: ["imgSize", "border", "borderRadius", "background"],
    },
    {
      className: "ChatInput",
      editDesignComponent: [
        "font",
        "border",
        "borderRadius",
        "color",
        "background",
        "padding",
      ],
    },
    {
      className: "SubmitButton",
      editDesignComponent: [
        "font",
        "border",
        "borderRadius",
        "color",
        "background",
        "padding",
      ],
    },
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
          <div>
            <p className={stageStyle.styleTitle}>送信側の吹き出し</p>
            <div className="sendMessageArea">
              <SendSpeechBalloon isDebug />
              <SendProfileIcon />
            </div>
          </div>
          <div>
            <p className={stageStyle.styleTitle}>受信側の吹き出し</p>
            <div className="sendMessageArea">
              <ReceiveProfileIcon />
              <ReceiveSpeechBalloon isDebug />
            </div>
          </div>
          <div className="submitArea">
            <ChatInput />
            <SubmitButton />
          </div>
        </ChatBody>
      </div>
    </>
  ),
  checkPoint: [
    "「送信側の吹き出し」「受信側の吹き出し」は送信メッセージか受信メッセージか分かりやすいデザインにできた？",
    "「送信側のアイコン」「受信側のアイコン」は見やすいデザインにできた？",
    "「入力エリア」や「送信用のボタン」はそれぞれの特徴が分かりやすいデザインにできた？",
    "「全体設定」でチャット画面を見やすいデザインにできた？",
  ],
};

export default StageSettings;
