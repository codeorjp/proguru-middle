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

import {
  ifIncludeText,
  assignReceivedText,
  fetchServer,
  ifIncludeImage,
  assignReceivedImage,
} from "./stage2/blocks/ReceiveMessages";
import {
  onSubmit,
  assignChatInput,
  onClickSelectImage,
  showFileDialog,
  sendSuccess,
  assignSelectedImage,
} from "./stage2/blocks/SendMessages";
import {
  varImage,
  display,
  compression,
  resizeImage,
  imageSizeConditions,
  fixedAspectResize,
  ifIncludeAddress,
  ifIncludePhoneNumber,
  ifMatchKeyword,
  displayConfirmDialog,
  alert,
  textHello,
} from "./stage2/blocks/CommonToReceiveAndSend";

const StageSettings = {
  1: {
    stageTask: "チャットをより良くカスタマイズしよう",
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
        editDesignComponent: [
          "imgSize",
          "border",
          "borderRadius",
          "background",
        ],
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
        editDesignComponent: [
          "imgSize",
          "border",
          "borderRadius",
          "background",
        ],
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
    ),
    checkPoint: [
      "「送信側の吹き出し」「受信側の吹き出し」は送信メッセージか受信メッセージか分かりやすいデザインにできた？",
      "「送信側のアイコン」「受信側のアイコン」は見やすいデザインにできた？",
      "「入力エリア」や「送信用のボタン」はそれぞれの特徴が分かりやすいデザインにできた？",
      "「全体設定」でチャット画面を見やすいデザインにできた？",
    ],
  },
  2: {
    stageTask: "テキストと画像の送受信ができるようにしよう！",
    workspace: {
      workspaceXML: `<xml>\
        <block type="fetchServer"><statement name="DO"><block type="ifIncludeText"><next><block type="ifIncludeImage" /></next></block></statement></block>\
        <block type="onSubmit" x="550" />\
        <block type="onClickSelectImage" x="550" y="300"><statement name="DO"><block type="showFileDialog" /></statement></block>\
      </xml>`,
      tools: [
        sendSuccess,
        display,
        compression,
        resizeImage,
        fixedAspectResize,
        assignReceivedText,
        assignReceivedImage,
        assignChatInput,
        assignSelectedImage,
        varImage,
        showFileDialog,
        ifIncludeText,
        ifIncludeImage,
        imageSizeConditions,
        ifIncludeAddress,
        ifIncludePhoneNumber,
        ifMatchKeyword,
        displayConfirmDialog,
        alert,
        textHello,
      ],
      unDeletableBlocks: [onSubmit, fetchServer, onClickSelectImage],
    },
    checkPoint: [
      "｢送信する」ボタンを押すとチャットに入力エリアに書き込んだテキストは送信して表示された？",
      "画像選択画面で選択した画像は送信してチャットに表示できた？",
      "｢実行する」ボタンを押すとチャットにクラス内の人が送信したテキストは表示された？",
      "｢実行する」ボタンを押すとチャットにクラス内の人が送信した画像は表示された？",
    ],
  },
};

export default StageSettings;
