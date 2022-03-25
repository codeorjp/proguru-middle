import React from "react";
import styles from "common/styles/StageIntroductionModal.scss";
import serverConnection from "components/lesson2/statics/serverConnection.png";
import serverConnectionError from "components/lesson2/statics/serverConnectionError.png";
import sendMessage from "components/lesson2/statics/sendMessage.png";
import receiveMessage from "components/lesson2/statics/receiveMessage.png";
import {
  display,
  onExecute,
  receiveResponse,
  connectSuccess,
  send,
  serverDropdown,
  responseText,
  ifMorningOrAfternoon,
  textHelloJa,
  textMyName,
  textGoodMorning,
  textHelloWorld,
  textHello,
  textWorld,
  textExclamation,
  loop,
  connect,
} from "./common/blocks/Block";

const StageSettings = {
  1: {
    stageTask: "コンピュータに「Hello World!」と表示させよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [display, textHelloWorld],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: ["コンピュータの画面に「Hello World!」と表示された？"],
  },
  2: {
    stageTask: "コンピュータに「Hello」「World」「!」と順番に表示させよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [display, textHello, textWorld, textExclamation],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: [
      "コンピュータの画面に「Hello」「World」「!」と順に表示された？",
    ],
  },
  3: {
    stageTask: "コンピュータに，Helloと10回繰り返し表示させよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [loop, display, textHello],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: ["コンピュータの画面に「Hello」と10回表示された？"],
  },
  4: {
    stageTask: "サーバとの接続を成功させよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [connect, serverDropdown],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: ["サーバ「192.168.0.1」への接続が成功することを確認できた？"],
    description: (
      <>
        このステージではサーバに接続する方法を学ぶよ！
        <br />
        「〇〇に接続する」ブロックを使ってサーバへ接続しよう！
        <div className={styles.imageWrapper}>
          <img src={serverConnection} width="100%" alt="" />
        </div>
        指定するサーバを間違えると接続に失敗しちゃうので注意してね！
        <div className={styles.imageWrapper}>
          <img src={serverConnectionError} width="100%" alt="" />
        </div>
      </>
    ),
  },
  5: {
    stageTask:
      "サーバに接続し，接続に成功したら「こんにちは」とメッセージを送ろう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [connectSuccess, send, serverDropdown, textHelloJa],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: [
      "サーバ「192.168.0.1」への接続が成功することを確認できた？",
      "｢こんにちは」とサーバに送ったらコンピュータの画面に「送信に成功しました！」と表示された？",
    ],
    description: (
      <>
        このステージではサーバにメッセージを送信する方法を学ぶよ！
        <br />
        「〇〇をサーバに送る」ブロックを使ってサーバへ「こんにちは」と送信しよう！
        <div className={styles.imageWrapper}>
          <img src={sendMessage} width="100%" alt="" />
        </div>
      </>
    ),
  },
  6: {
    stageTask:
      "サーバに接続し，成功したら自分のニックネームを送ろう。サーバからの応答の受け取りに成功したら，応答の内容を表示させよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [
        connectSuccess,
        send,
        receiveResponse,
        display,
        serverDropdown,
        textMyName,
        responseText,
      ],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: [
      "ニックネームをサーバに送ったらコンピュータの画面に「送信に成功しました！」と表示された？",
      "サーバからの応答を受け取ったらコンピュータの画面に「応答を受け取りました！」と表示された？",
      'コンピュータの画面に「サーバで "自分のニックネーム" を受け取りました！」は表示された？',
    ],
    description: (
      <>
        このステージではサーバに送信したメッセージに対しての応答を受け取る方法を学ぶよ！
        <br />
        「サーバから応答を受け取る」ブロックを使って応答を受け取って表示させよう！
        <div className={styles.imageWrapper}>
          <img src={receiveMessage} width="100%" alt="" />
        </div>
      </>
    ),
  },
  7: {
    stageTask:
      "「もし〜なら〜」ブロックを使って，午前なら「おはよう」，午後なら「こんにちは」とメッセージを送ろう。応答の受け取りに成功したら，応答の内容を表示させよう！",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [
        connectSuccess,
        send,
        receiveResponse,
        ifMorningOrAfternoon,
        display,
        serverDropdown,
        responseText,
        textGoodMorning,
        textHelloJa,
      ],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: [
      "｢もし〜なら〜」ブロックを使って，午前なら「おはよう」，午後なら「こんにちは」とサーバに送ることができた？",
      "コンピュータの画面に応答の内容は表示された？午前なら「おはよう！」，午後なら「こんにちは！」と返ってくるよ！",
    ],
  },
};

export default StageSettings;
