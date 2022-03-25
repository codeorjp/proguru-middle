/* eslint-disable camelcase */
import _ from "lodash";
import moment from "moment";
import { action, decorate, observable } from "mobx";
import BlocklyLessonStore from "common/BlocklyLesson/BlocklyLessonStore";
import userIcon from "components/trial/common/statics/pengin.png";
import raionIcon from "components/trial/common/statics/raion.png";

class Store extends BlocklyLessonStore {
  constructor(lessonId) {
    super(0, null);
    this.lessonId = lessonId;
    this.lesson = {
      number: this.lessonId,
    };
    this.stage = {
      number: 0,
    };
    this.nickName = "あなた";
    this.userNumber = 0;
    this.userIcon = userIcon;
    this.tableItems = [
      {
        messageId: 0,
        senderId: null,
        userName: "他の人",
        userNumber: 1,
        icon: raionIcon,
        body: "どうもライオンです。どうもライオンです。",
        createdAt: moment(),
      },
    ];
    this.init();
    this.isShowTour = this.checkShowTour(`trial-lesson${this.lessonId}-tour`);

    try {
      const saveStyle = window.sessionStorage.getItem(`trial-lesson-1`);
      this.messageBoardStyle = JSON.parse(saveStyle);
    } catch (e) {
      this.messageBoardStyle = null;
    }
  }

  checkShowTour(key) {
    let isFirstTime = false;
    try {
      if (window.sessionStorage.getItem(key)) {
        isFirstTime = false;
      } else {
        window.sessionStorage.setItem(key, true);
        isFirstTime = true;
      }
      return isFirstTime;
    } catch {
      return true;
    }
  }

  init() {
    this.isExecute = false;
    this.messages = [];
    this.submitCallback = async () => {};
    this.variables = {
      sendText: "",
      receivedText: "",
      newMessage: "",
      inputText: "",
      text: "",
    };
    this.first_id = null;
    this.last_id = null;
  }

  setChatInput(inputText) {
    this.variables.inputText = {
      messageId: _.uniqueId("message_not_sent_"),
      senderId: this.userId,
      senderType: "Student",
      userName: this.nickName,
      userNumber: this.userNumber,
      icon: this.userIcon,
      content: inputText,
      createdAt: moment(),
      type: "Text",
    };
  }

  submit() {
    this.submitCallback().then((callback) => {
      callback(() => this.setChatInput(""));
    });
  }

  setInputFileElement() {}

  // CommonToReceiveAndSend Function
  display(varName) {
    const message = this.variables[varName];
    if (message && message.content) {
      this.messages.push({
        ...message,
      });
    }
  }

  // Receive Function
  fetchServer(callback) {
    this.tableItems.forEach((item) => {
      const {
        messageId,
        senderId,
        userName,
        userNumber,
        icon,
        body,
        createdAt,
      } = item;
      this.variables.newMessage = {
        messageId,
        senderId,
        senderType: "Student",
        userName,
        userNumber,
        icon,
        content: body,
        createdAt,
        type: "Text",
      };
      callback();
    });
  }

  isResponseIncludeText() {
    let isInclude = false;
    if (
      _.has(this.variables.newMessage, "content") &&
      this.variables.newMessage.content !== ""
    ) {
      isInclude = true;
    }
    return isInclude;
  }

  assignReceivedText(varName) {
    if (varName) {
      this.variables[varName] = this.variables.newMessage;
    }
  }

  // Send Function
  onSubmit(callback) {
    this.submitCallback = callback;
  }

  send(varName, callback, resolve) {
    const message = this.variables[varName];
    if (message && message.content) {
      const {
        senderId,
        senderType,
        userName,
        userNumber,
        content,
        createdAt,
      } = message;
      message.messageId = this.tableItems.length;
      this.tableItems.push({
        messageId: this.tableItems.length,
        icon: userIcon,
        body: content,
        userName,
        userNumber,
        senderId,
        senderType,
        createdAt,
      });
      callback();
      resolve();
    }
  }

  assignChatInput(varName) {
    if (varName) {
      this.variables[varName] = this.variables.inputText;
    }
  }
}

decorate(Store, {
  variables: observable,
  messages: observable,
  tableItems: observable,
  messageBoardStyle: observable,
  isShowTour: observable,
  setChatInput: action,
  submit: action,
});

export default Store;
