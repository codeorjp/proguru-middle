/* eslint-disable object-curly-newline */
import React from "react";
import styles from "common/styles/StageIntroductionModal.scss";
import sendMessage from "components/lesson3/statics/sendMessage.png";
import receiveMessage from "components/lesson3/statics/receiveMessage.png";

import {
  fetchServer,
  ifIncludeText,
  assignReceivedText,
} from "./common/blocks/ReceiveMessages";
import {
  onSubmit,
  sendSuccess,
  assignChatInput,
} from "./common/blocks/SendMessages";
import {
  display,
  varText,
  textHello,
} from "./common/blocks/CommonToReceiveAndSend";

interface IstageSettings {
  [key: number]: {
    stageTask: string;
    workspace: {
      workspaceXML: string;
      tools: Array<object>;
      unDeletableBlocks: Array<object>;
    };
    checkPoint: string[];
    description?: JSX.Element | null;
    validationList?: {
      target: string;
      connection: "input" | "output";
      check: "null" | "scope";
      name?: string;
      type?: string;
      scope?: object;
      parent?: string;
    }[];
  };
}

const StageSettings: IstageSettings = {
  1: {
    stageTask: "送信ボタンを押したときに「こんにちは」と表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="onSubmit" /></xml>`,
      tools: [display, textHello],
      unDeletableBlocks: [onSubmit],
    },
    checkPoint: [
      "｢送信する」ボタンを押すとチャットに「こんにちは」と表示された？",
    ],
    validationList: [{ target: "display", connection: "input", check: "null" }],
  },
  2: {
    stageTask:
      "送信ボタンを押したとき，変数 [送信テキスト] に入力エリアの内容を保存し，表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="onSubmit" /></xml>`,
      tools: [display, assignChatInput, varText],
      unDeletableBlocks: [onSubmit],
    },
    checkPoint: [
      "｢送信する」ボタンを押すとチャットに入力エリアに書き込んだテキストは表示された？",
    ],
    validationList: [
      { target: "assignChatInput", connection: "input", check: "null" },
      { target: "display", connection: "input", check: "null" },
      {
        target: "varText",
        connection: "output",
        check: "null",
        type: "assignChatInput",
      },
    ],
  },
  3: {
    stageTask:
      "送信ボタンを押したとき，変数 [送信テキスト] に入力エリアの内容を保存し，サーバに送信しよう。送信に成功したら変数 [送信テキスト] を表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="onSubmit" /></xml>`,
      tools: [sendSuccess, display, assignChatInput, varText],
      unDeletableBlocks: [onSubmit],
    },
    checkPoint: [
      "｢送信する」ボタンを押すとチャットに入力エリアに書き込んだテキストが表示された？",
      "｢送信する」ボタンを押すと先生の画面に送信したテキストが表示された？",
    ],
    description: (
      <>
        このステージではクラスのチャットにテキストを送信する方法を学ぶよ！
        <br />
        「〇〇をサーバに送る」ブロックを使ってサーバにテキストを送信しよう！
        <div className={styles.imageWrapper}>
          <img src={sendMessage} width="100%" alt="" />
        </div>
      </>
    ),
    validationList: [
      { target: "assignChatInput", connection: "input", check: "null" },
      { target: "display", connection: "input", check: "null" },
      { target: "sendSuccess", connection: "input", check: "null" },
      {
        target: "varText",
        connection: "output",
        check: "null",
        type: "assignChatInput",
      },
    ],
  },
  4: {
    stageTask:
      "新着メッセージを受信したとき，変数 [受信テキスト] に新着テキストを保存し，表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="fetchServer" /></xml>`,
      tools: [ifIncludeText, assignReceivedText, display, varText],
      unDeletableBlocks: [fetchServer],
    },
    checkPoint: [
      "｢実行する」ボタンを押すとチャットにクラス内の人が送信したテキストは表示された？",
    ],
    description: (
      <>
        このステージではクラス内の人が送信したテキストを受信する方法を学ぶよ！
        <br />
        「サーバから新着メッセージを受信する」ブロックを使おう！
        <div className={styles.imageWrapper}>
          <img src={receiveMessage} width="100%" alt="" />
        </div>
      </>
    ),
    validationList: [
      { target: "assignReceivedText", connection: "input", check: "null" },
      { target: "display", connection: "input", check: "null" },
      {
        target: "varText",
        connection: "output",
        check: "null",
        type: "assignReceivedText",
      },
    ],
  },
  5: {
    stageTask:
      "今まで出てきたブロックを使って，テキストの送受信ができるようにしよう！",
    workspace: {
      workspaceXML: `<xml><block type="fetchServer" /><block type="onSubmit" y="250" /></xml>`,
      tools: [
        ifIncludeText,
        sendSuccess,
        display,
        assignReceivedText,
        assignChatInput,
        varText,
      ],
      unDeletableBlocks: [fetchServer, onSubmit],
    },
    checkPoint: [
      "｢送信する」ボタンを押すと入力エリアに書き込んだテキストは送信してチャットに表示された？",
      "｢実行する」ボタンを押すとチャットにクラス内の人が送信したテキストは表示された？",
    ],
    validationList: [
      { target: "assignChatInput", connection: "input", check: "null" },
      { target: "sendSuccess", connection: "input", check: "null" },
      { target: "assignReceivedText", connection: "input", check: "null" },
      {
        target: "display",
        connection: "input",
        check: "null",
        parent: "onSubmit",
      },
      {
        target: "display",
        connection: "input",
        check: "null",
        parent: "fetchServer",
      },
      {
        target: "varText",
        connection: "output",
        check: "null",
        type: "assignChatInput",
        parent: "onSubmit",
      },
      {
        target: "varText",
        connection: "output",
        check: "null",
        type: "assignReceivedText",
        parent: "fetchServer",
      },
      {
        target: "varText",
        connection: "output",
        check: "scope",
        name: "VAR",
        scope: {
          fetchServer: "'receivedText'",
          onSubmit: "'sendText'",
        },
      },
    ],
  },
};

export default StageSettings;
