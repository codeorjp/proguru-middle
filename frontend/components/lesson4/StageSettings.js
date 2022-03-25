/* eslint-disable object-curly-newline */
import React from "react";
import styles from "common/styles/StageIntroductionModal.scss";
import sendMessage from "components/lesson4/statics/sendMessage.png";
import displaySelectImage from "components/lesson4/statics/selectImage.png";
import receiveMessage from "components/lesson4/statics/receiveMessage.png";

import {
  fetchServer,
  ifIncludeImage,
  assignReceivedImage,
} from "./common/blocks/ReceiveImages";
import {
  onClickSelectImage,
  showFileDialog,
  sendSuccess,
  assignSelectedImage,
} from "./common/blocks/SendImages";
import {
  varImage,
  display,
  compression,
  resizeImage,
  imageSizeConditions,
  onExecute,
  sampleImage,
  fixedAspectResize,
} from "./common/blocks/CommonToReceiveAndSend";

const selectImageStyle = {
  height: "16px",
  color: "#0b77d4",
  paddingRight: "4px",
};

const StageSettings = {
  1: {
    stageTask: "実行したときにサンプル画像を表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [display, sampleImage],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: [
      "｢実行する」ボタンを押すとチャットにサンプル画像が表示された？",
    ],
    validationList: [{ target: "display", connection: "input", check: "null" }],
  },
  2: {
    stageTask:
      "サンプル画像1を圧縮率10%，幅と高さをそれぞれ300pxにリサイズしてから表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [display, compression, resizeImage, sampleImage],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: [
      "チャットにサンプル画像の圧縮率を変えて表示できた？",
      "チャットにサンプル画像のサイズを変えて表示できた？",
    ],
    validationList: [
      { target: "display", connection: "input", check: "null" },
      { target: "compression", connection: "input", check: "null" },
      { target: "resizeImage", connection: "input", check: "null" },
    ],
  },
  3: {
    stageTask:
      "サンプル画像の幅と高さが500px以上の場合のみ，幅と高さをそれぞれ300pxにリサイズしてから表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [
        display,
        compression,
        resizeImage,
        imageSizeConditions,
        sampleImage,
      ],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: [
      "サイズに応じてサンプル画像のサイズを変えてチャットに表示できた？",
    ],
    validationList: [
      { target: "display", connection: "input", check: "null" },
      { target: "compression", connection: "input", check: "null" },
      { target: "resizeImage", connection: "input", check: "null" },
      { target: "imageSizeConditions", connection: "input", check: "null" },
    ],
  },
  4: {
    stageTask:
      "サンプル画像に対して圧縮やリサイズをしてからサーバへ送信しよう。送信に成功したらサンプル画像を表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="onExecute" /></xml>`,
      tools: [
        sendSuccess,
        display,
        compression,
        resizeImage,
        imageSizeConditions,
        sampleImage,
      ],
      unDeletableBlocks: [onExecute],
    },
    checkPoint: [
      "サーバにサンプル画像のサイズや圧縮率を変えて送信できた？",
      "サイズや圧縮率を変えて送信した画像はチャットに表示できた？",
      "｢送信する」ボタンを押すと先生の画面に送信した画像が表示された？",
    ],
    description: (
      <>
        このステージではクラスのチャットに画像を送信する方法を学ぶよ！
        <br />
        「〇〇をサーバに送る」ブロックを使ってサーバに画像を送信しよう！
        <div className={styles.imageWrapper}>
          <img src={sendMessage} width="100%" alt="" />
        </div>
      </>
    ),
    validationList: [
      { target: "display", connection: "input", check: "null" },
      { target: "compression", connection: "input", check: "null" },
      { target: "resizeImage", connection: "input", check: "null" },
      { target: "imageSizeConditions", connection: "input", check: "null" },
      { target: "sendSuccess", connection: "input", check: "null" },
    ],
  },
  5: {
    stageTask: (
      <p>
        <i className="bi bi-image" style={selectImageStyle}></i>
        を押したら画像選択画面が表示されます。選んだ画像を変数に保存し表示しよう。
      </p>
    ),
    workspace: {
      workspaceXML: `<xml><block type="onClickSelectImage"><statement name="DO"><block type="showFileDialog" /></statement></block></xml>`,
      tools: [
        showFileDialog,
        imageSizeConditions,
        display,
        resizeImage,
        compression,
        assignSelectedImage,
        varImage,
      ],
      unDeletableBlocks: [onClickSelectImage],
    },
    checkPoint: [
      "画像選択画面は表示された？",
      "画像選択画面で選択した画像をチャットに表示できた？",
    ],
    description: (
      <>
        このステージではクラスのチャットにパソコンに保存されている画像を扱うよ！
        <br />
        「画像選択画面を表示する」ブロックを使おう！
        <div className={styles.imageWrapper}>
          <img src={displaySelectImage} width="100%" alt="" />
        </div>
      </>
    ),
    validationList: [
      { target: "display", connection: "input", check: "null" },
      { target: "compression", connection: "input", check: "null" },
      { target: "resizeImage", connection: "input", check: "null" },
      { target: "imageSizeConditions", connection: "input", check: "null" },
      { target: "assignSelectedImage", connection: "input", check: "null" },
      {
        target: "varImage",
        connection: "output",
        check: "null",
        type: "assignSelectedImage",
      },
    ],
  },
  6: {
    stageTask: (
      <p>
        <i className="bi bi-image" style={selectImageStyle} />
        を押したとき，画像選択画面を表示しよう。選んだ画像を変数に保存して，圧縮やリサイズをしてから送信し，送信に成功したら画像を表示しよう。
      </p>
    ),
    workspace: {
      workspaceXML: `<xml><block type="onClickSelectImage" /></xml>`,
      tools: [
        showFileDialog,
        sendSuccess,
        imageSizeConditions,
        display,
        resizeImage,
        compression,
        assignSelectedImage,
        varImage,
      ],
      unDeletableBlocks: [onClickSelectImage],
    },
    checkPoint: [
      "先生の画面に画像選択画面で選択した画像は表示された？",
      "選んだ画像を適切な圧縮率とサイズにできた？",
      "サーバに送信した画像はチャットに表示できた？",
    ],
    validationList: [
      { target: "display", connection: "input", check: "null" },
      { target: "compression", connection: "input", check: "null" },
      { target: "resizeImage", connection: "input", check: "null" },
      { target: "imageSizeConditions", connection: "input", check: "null" },
      { target: "sendSuccess", connection: "input", check: "null" },
      { target: "assignSelectedImage", connection: "input", check: "null" },
      {
        target: "varImage",
        connection: "output",
        check: "null",
        type: "assignSelectedImage",
      },
    ],
  },
  7: {
    stageTask:
      "新着メッセージを受信したとき，変数に新着画像を保存し，表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="fetchServer" /></xml>`,
      tools: [ifIncludeImage, display, assignReceivedImage, varImage],
      unDeletableBlocks: [fetchServer],
    },
    checkPoint: [
      "｢実行する」ボタンを押すとチャットにクラス内の人が送信した画像は表示された？",
    ],
    validationList: [
      { target: "display", connection: "input", check: "null" },
      { target: "assignReceivedImage", connection: "input", check: "null" },
      {
        target: "varImage",
        connection: "output",
        check: "null",
        type: "assignReceivedImage",
      },
    ],
  },
  8: {
    stageTask:
      "新着メッセージを受信したとき，変数に新着画像を保存し，圧縮やリサイズしてから表示しよう。",
    workspace: {
      workspaceXML: `<xml><block type="fetchServer" /></xml>`,
      tools: [
        ifIncludeImage,
        imageSizeConditions,
        display,
        compression,
        resizeImage,
        assignReceivedImage,
        varImage,
      ],
      unDeletableBlocks: [fetchServer],
    },
    checkPoint: [
      "｢実行する」ボタンを押すとチャットにクラス内の人が送信した画像のサイズや圧縮率を変えて表示できた？",
    ],
    description: (
      <>
        このステージではクラス内の人が送信した画像を受信する方法を学ぶよ！
        <br />
        「サーバから新着メッセージを受信する」ブロックを使おう！
        <div className={styles.imageWrapper}>
          <img src={receiveMessage} width="100%" alt="" />
        </div>
      </>
    ),
    validationList: [
      { target: "display", connection: "input", check: "null" },
      { target: "compression", connection: "input", check: "null" },
      { target: "resizeImage", connection: "input", check: "null" },
      { target: "imageSizeConditions", connection: "input", check: "null" },
      { target: "assignReceivedImage", connection: "input", check: "null" },
      {
        target: "varImage",
        connection: "output",
        check: "null",
        type: "assignReceivedImage",
      },
    ],
  },
  9: {
    stageTask:
      "今まで出てきたブロックを使って，画像の送受信ができるようにしよう！",
    workspace: {
      workspaceXML: `<xml><block type="fetchServer" /><block type="onClickSelectImage" y="300" /></xml>`,
      tools: [
        showFileDialog,
        ifIncludeImage,
        sendSuccess,
        imageSizeConditions,
        display,
        compression,
        resizeImage,
        fixedAspectResize,
        assignReceivedImage,
        assignSelectedImage,
        varImage,
      ],
      unDeletableBlocks: [fetchServer, onClickSelectImage],
    },
    checkPoint: [
      "画像選択画面で選択した画像は送信してチャットに表示できた？",
      "｢実行する」ボタンを押すとチャットにクラス内の人が送信した画像は表示された？",
    ],
    validationList: [
      {
        target: "display",
        connection: "input",
        check: "null",
        parent: "onClickSelectImage",
      },
      {
        target: "display",
        connection: "input",
        check: "null",
        parent: "fetchServer",
      },
      {
        target: "compression",
        connection: "input",
        check: "null",
        parent: "onClickSelectImage",
      },
      {
        target: "compression",
        connection: "input",
        check: "null",
        parent: "fetchServer",
      },
      {
        target: "resizeImage",
        connection: "input",
        check: "null",
        parent: "onClickSelectImage",
      },
      {
        target: "resizeImage",
        connection: "input",
        check: "null",
        parent: "fetchServer",
      },
      {
        target: "fixedAspectResize",
        connection: "input",
        check: "null",
        parent: "onClickSelectImage",
      },
      {
        target: "fixedAspectResize",
        connection: "input",
        check: "null",
        parent: "fetchServer",
      },
      {
        target: "imageSizeConditions",
        connection: "input",
        check: "null",
        parent: "onClickSelectImage",
      },
      {
        target: "imageSizeConditions",
        connection: "input",
        check: "null",
        parent: "fetchServer",
      },
      { target: "sendSuccess", connection: "input", check: "null" },
      { target: "assignSelectedImage", connection: "input", check: "null" },
      { target: "assignReceivedImage", connection: "input", check: "null" },
      {
        target: "varImage",
        connection: "output",
        check: "null",
        type: "assignSelectedImage",
        parent: "onClickSelectImage",
      },
      {
        target: "varImage",
        connection: "output",
        check: "null",
        type: "assignReceivedImage",
        parent: "fetchServer",
      },
      {
        target: "varImage",
        connection: "output",
        check: "scope",
        name: "VAR",
        scope: {
          fetchServer: "'receivedImage'",
          onClickSelectImage: "'sendImage'",
        },
      },
    ],
  },
};

export default StageSettings;
