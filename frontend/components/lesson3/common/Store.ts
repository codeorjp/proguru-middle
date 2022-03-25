import _ from "lodash";
import BlocklyJS from "blockly/javascript";
import moment from "moment";
import { action, decorate, observable } from "mobx";
import BlocklyLessonStore from "common/BlocklyLesson/BlocklyLessonStore";
import axios from "common/utils/axios";
import Endpoint from "common/utils/Endpoint";

class Store extends BlocklyLessonStore {
  nickName: string;
  studentNumber: number;
  userIcon: any; // blob?
  lesson: any;
  stage: any;
  submitCallback: Function | null;
  fetchServerID: number | null;
  isFirstTime: boolean;
  isStageFirstTime: boolean;
  messageBoardStyle: object;
  messages: object[];
  variables: any;
  last_id: number;

  constructor(
    userId,
    nickName,
    studentNumber,
    userIcon,
    lesson,
    stage,
    submittedWorkspace
  ) {
    super(userId, submittedWorkspace);
    this.nickName = nickName;
    this.studentNumber = studentNumber;
    this.userIcon = userIcon;
    this.lesson = lesson;
    this.stage = stage;
    this.fetchServerID = null;
    this.isFirstTime = this.checkFirstTime(
      `lesson${this.lesson.number}:isFirstTime`
    );
    this.isStageFirstTime = this.checkFirstTime(
      `lesson${this.lesson.number}-stage${this.stage.number}`
    );
    this.init();
    axios.get("/api/lessons/1/stages/8/workspaces").then((res) => {
      const { workspace } = res.data;
      this.messageBoardStyle = workspace ? JSON.parse(workspace.body) : null;
    });
  }

  init() {
    clearInterval(this.fetchServerID);
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
    this.last_id = null;
  }

  setChatInput(inputText: string) {
    this.variables.inputText = {
      messageId: _.uniqueId("message_not_sent_"),
      senderId: this.userId,
      senderType: "Student",
      userName: this.nickName,
      userNumber: this.studentNumber,
      icon: this.userIcon,
      content: inputText,
      createdAt: moment(),
      type: "Text",
    };
  }

  submit() {
    this.submitCallback().then((callback) => {
      if (callback) {
        callback(() => this.setChatInput(""));
      }
    });
  }

  setInputFileElement() {}

  // CommonToReceiveAndSend Function
  display(varName: string) {
    const message = this.variables[varName];
    if (message && message.content) {
      this.messages.push({
        ...message,
      });
    }
  }

  assignText(text: string) {
    this.variables.text = {
      messageId: _.uniqueId("message_not_sent_"),
      senderId: this.userId,
      senderType: "Student",
      userName: this.nickName,
      userNumber: this.studentNumber,
      icon: this.userIcon,
      content: unescape(text),
      createdAt: moment(),
      type: "Text",
    };
  }

  fetchMessage(callback: Function) {
    axios
      .get(Endpoint.message, {
        params: {
          kind: "lesson",
          last_id: this.last_id,
        },
      })
      .then((res) => {
        const { messages } = res.data;
        if (messages.length === 0) return;
        this.last_id = messages[messages.length - 1].id;

        _.map(messages, (message) => {
          const {
            id,
            sender_id,
            sender_type,
            nickname,
            number,
            icon_url,
            sent_at,
            body,
          } = message;
          this.variables.newMessage = {
            messageId: id,
            senderId: sender_id,
            senderType: sender_type,
            userName: nickname,
            userNumber: number,
            icon: icon_url,
            content: body,
            createdAt: moment(sent_at * 1000),
            type: "Text",
          };
          callback();
        });
      })
      .catch((error) => {
        console.log(error);
        clearInterval(this.fetchServerID);
      });
  }

  // Receive Function
  fetchServer(callback: Function) {
    this.fetchMessage(callback);
    this.fetchServerID = window.setInterval(() => {
      this.fetchMessage(callback);
    }, 5000);
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

  assignReceivedText(varName: string) {
    if (varName) {
      this.variables[varName] = this.variables.newMessage;
    }
  }

  // Send Function
  onSubmit(callback: Function) {
    this.submitCallback = callback;
  }

  send(varName: string, callback: Function, resolve: (value?: string) => void) {
    if (varName && this.variables[varName]) {
      if (this.variables[varName].content) {
        // テキストが空の場合は送信しない
        const params = new URLSearchParams();
        params.append("kind", "lesson");
        params.append("body", this.variables[varName].content);
        axios.post(Endpoint.message, params).then((res) => {
          this.variables[varName].messageId = res.data.id;
          this.variables[varName].createdAt = moment(res.data.created_at);
          callback();
          resolve();
        });
      }
    }
  }

  assignChatInput(varName: string) {
    if (varName) {
      this.variables[varName] = this.variables.inputText;
    }
  }
}

decorate(Store, {
  isFirstTime: observable,
  variables: observable,
  messages: observable,
  messageBoardStyle: observable,
  setChatInput: action,
  submit: action,
});

export default Store;
