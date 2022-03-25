import axios from "common/utils/axios";
import BlocklyJS from "blockly/javascript";
import moment from "moment";
import { decorate, observable } from "mobx";
import BlocklyLessonStore from "common/BlocklyLesson/BlocklyLessonStore";
import AnimationStore from "./AnimationStore";

class Store extends BlocklyLessonStore {
  constructor(userId, nickName, userIcon, lesson, stage, submittedWorkspace) {
    super(userId, submittedWorkspace);
    this.nickName = nickName;
    this.userIcon = userIcon;
    this.lesson = lesson;
    this.stage = stage;
    this.AnimationStore = AnimationStore;
    this.animate = this.animate.bind(this);
    this.receivedText = "";
    this.variables = {
      responseText: "",
      text: "",
    };
    this.servers = {
      serverA: "/api/say_hello",
      serverB: "cannot access serverB",
    };
    this.connectedServer = "";
    this.isFirstTime = this.checkFirstTime(
      `lesson${this.lesson.number}:isFirstTime`
    );
    this.isStageFirstTime = this.checkFirstTime(
      `lesson${this.lesson.number}-stage${this.stage.number}`
    );
  }

  init() {
    this.AnimationStore.reset();
    this.isExecute = false;
    this.receivedText = "";
    this.variables = {
      responseText: "",
      text: "",
    };
    this.connectedServer = "";
  }

  animate() {
    this.AnimationStore.animate();
  }

  addCommand(type, args, blockId) {
    this.AnimationStore.commands.push({
      type,
      args,
      blockId,
    });
  }

  skip(blockId) {
    this.addCommand("skip", null, blockId);
  }

  display(varName, blockId) {
    const msg = this.variables[varName];
    if (msg) {
      this.addCommand("display", { text: unescape(msg) }, blockId);
    }
  }

  assignText(text) {
    this.variables.text = text;
  }

  getMeridiem() {
    return moment().format("a");
  }

  connect(varName, callback, blockId, resolve) {
    if (varName && this.servers[varName]) {
      this.addCommand("connect", { before: "サーバと接続中..." }, blockId);

      if (varName === "serverA") {
        // serverAを選択してる場合のみ接続可能
        this.addCommand(
          "connectSuccess",
          { before: "接続成功しました！" },
          blockId
        );
        this.connectedServer = this.servers[varName];
        callback();
        resolve();
      } else {
        this.addCommand(
          "connectError",
          { before: "接続が失敗しました..." },
          blockId
        );
        resolve();
      }
    }
  }

  send(varName, blockId, resolve) {
    if (varName && this.variables[varName] && this.connectedServer) {
      this.addCommand(
        "request",
        { before: "メッセージを送信中...", after: "送信に成功しました！" },
        blockId
      );
      const formData = new FormData();
      formData.append("body", unescape(this.variables[varName]));
      formData.append("hour", new Date().getHours());
      axios.post(this.connectedServer, formData).then((res) => {
        this.receivedText = res.data.reply;
        resolve();
      });
    }
  }

  receiveResponse(callback, blockId) {
    if (this.receivedText !== "") {
      this.addCommand(
        "response",
        {
          before: "サーバからの応答を待ってます...",
          after: "応答を受け取りました！",
        },
        blockId
      );
      this.variables.responseText = this.receivedText;
      callback();
    }
  }
}

decorate(Store, {
  isFirstTime: observable,
});

export default Store;
