/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import _ from "lodash";
import BlocklyJS from "blockly/javascript";
import moment from "moment";
import axios from "common/utils/axios";
import { action, decorate, observable } from "mobx";
import BlocklyLessonStore from "common/BlocklyLesson/BlocklyLessonStore";
import Endpoint from "common/utils/Endpoint";
import { ObjectURLToBlob } from "common/BlocklyLesson/utils/ImageTranslator";

const createObjectURL =
  (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class Store extends BlocklyLessonStore {
  constructor(
    userId,
    nickName,
    studentNumber,
    userIcon,
    lesson,
    stage,
    submittedWorkspace,
    kind
  ) {
    super(userId, submittedWorkspace);
    this.nickName = nickName;
    this.studentNumber = studentNumber;
    this.userIcon = userIcon;
    this.lesson = lesson;
    this.stage = stage;
    this.kind = kind;
    this.fetchServerID = "";
    this.processID = "";
    this.init();
    axios.get("/api/lessons/5/stages/1/workspaces").then((res) => {
      const { workspace } = res.data;
      this.messageBoardStyle = workspace ? JSON.parse(workspace.body) : null;
    });
  }

  init() {
    clearInterval(this.fetchServerID);
    clearInterval(this.processID);
    this.isExecute = false;
    this.messages = []; // for render message
    this.variables = {
      sendText: "",
      receivedText: "",
      newMessage: "",
      inputText: "",
      receivedImage: "",
      sendImage: "",
      newImage: "",
      selectedImage: "", // `選ばれた画像`ブロックの変数
      text: "",
    };
    this.submitCallback = async () => {};
    this.imageQuality = 1.0;
    this.selectedImageFile = "";
    this.clickSelectImageCallback = () => {};
    this.callbackSelectImage = () => {};
    this.callbackSelectImagePromiseResolve = () => {};
    this.first_id = null;
    this.last_id = null;
    this.existPastMessage = false;
    this.newMessages = []; // message queue
  }

  checkExistPastMessage(messages) {
    if (messages.length < 20) {
      this.existPastMessage = false;
    } else {
      this.existPastMessage = true;
    }
  }

  setChatInput(inputText) {
    this.variables.inputText = {
      messageId: _.uniqueId("message_not_sent_"),
      senderId: this.userId,
      senderType: "Student",
      userName: this.nickName,
      userNumber: this.studentNumber,
      icon: this.userIcon,
      type: "Text",
      content: inputText,
      createdAt: moment(),
    };
  }

  submit() {
    this.submitCallback().then((callback) => {
      if (callback) {
        callback(() => this.setChatInput(""));
      }
    });
  }

  // CommonToReceiveAndSend Function
  // newMessagesに追加してるキューを見て、renderする
  display(varName) {
    const message = this.variables[varName];
    if (message && message.content) {
      const { content, type } = message;
      switch (type) {
        case "Image":
          this.messages.push({
            ...message,
            content:
              typeof content === "object" ? createObjectURL(content) : content,
          });
          break;
        case "Text":
          this.messages.push({
            ...message,
          });
          break;
        default:
          break;
      }
    }
  }

  alert(varName) {
    const message = this.variables[varName];
    if (message && message.content) {
      const { content, type } = message;
      if (type === "Text") {
        window.alert(unescape(content));
      }
    }
  }

  getImageWidth(varName, resolve) {
    const msg = this.variables[varName];
    if (!msg) {
      resolve("no msg");
      return;
    }

    const img = new Image();
    img.src = msg.content;
    img.onload = () => resolve(img.width);
  }

  getImageHeight(varName, resolve) {
    const msg = this.variables[varName];
    if (!msg) {
      resolve("no msg");
      return;
    }

    const img = new Image();
    img.src = msg.content;
    img.onload = () => resolve(img.height);
  }

  compression(object, resolve) {
    const { varName, compressionRate } = object;
    const msg = this.variables[varName];
    if (!msg) {
      resolve("no msg");
      return;
    }

    this.imageQuality = compressionRate / 100;
    const imgSrc = msg.content;
    const img = new Image();
    const canvas = document.createElement("canvas");
    img.crossOrigin = "Anonymous";
    img.addEventListener("load", async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      this.variables[varName].content = await this._canvasToObjectURL(
        canvas,
        "image/jpeg"
      );
      resolve("compress");
    });
    if (!/blob/.test(imgSrc)) {
      const queryStringForHandleCORSError = "?not-from-cache-please";
      img.src = imgSrc + queryStringForHandleCORSError;
    } else {
      img.src = imgSrc;
    }
  }

  resizeImage(object, resolve) {
    const { varName, width, height } = object;
    const msg = this.variables[varName];
    if (!msg) {
      resolve("no msg");
      return;
    }

    this.imageQuality = 1.0;
    const imgSrc = msg.content;
    const img = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    img.crossOrigin = "Anonymous";
    img.addEventListener("load", async () => {
      img.width = width;
      img.height = height;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      this.variables[varName].content = await this._canvasToObjectURL(
        canvas,
        "image/jpeg"
      );
      resolve("resize");
    });
    if (!/blob/.test(imgSrc)) {
      const queryStringForHandleCORSError = "?not-from-cache-please";
      img.src = imgSrc + queryStringForHandleCORSError;
    } else {
      img.src = imgSrc;
    }
  }

  fixedAspectResize(object, resolve) {
    const { varName, isHeight, size } = object;
    const msg = this.variables[varName];
    if (!msg) {
      resolve("no msg");
      return;
    }

    this.imageQuality = 1.0;
    const imgSrc = msg.content;
    const img = new Image();
    const canvas = document.createElement("canvas");
    img.crossOrigin = "Anonymous";
    img.addEventListener("load", async () => {
      if (isHeight) {
        canvas.width = Math.round(img.width * (size / img.height));
        canvas.height = size;
      } else {
        canvas.height = Math.round(img.height * (size / img.width));
        canvas.width = size;
      }
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      this.variables[varName].content = await this._canvasToObjectURL(
        canvas,
        "image/jpeg"
      );
      resolve("resize");
    });
    if (!/blob/.test(imgSrc)) {
      const queryStringForHandleCORSError = "?not-from-cache-please";
      img.src = imgSrc + queryStringForHandleCORSError;
    } else {
      img.src = imgSrc;
    }
  }

  _canvasToObjectURL(canvas, type) {
    return new Promise((resolve) => {
      const base64 = canvas.toDataURL(type, this.imageQuality);
      const bin = atob(base64.replace(/^.*,/, ""));
      const buffer = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i += 1) {
        buffer[i] = bin.charCodeAt(i);
      }
      const blob = new Blob([buffer.buffer], { type });
      return resolve(createObjectURL(blob));
    });
  }

  isIncludeAddress(varName) {
    // ref: https://lab.sonicmoov.com/development/javascript/javascript-regex-sample/
    const addressRegexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    const message = this.variables[varName];

    if (message && message.content) {
      return addressRegexp.test(message.content);
    }
    return false;
  }

  isIncludePhoneNumber(varName) {
    // ref: https://github.com/sakatam/a-better-jp-phone-regex
    const phoneNumberRegexp = /^(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?\d{4}-?\d{4}|050-?\d{4}-?\d{4})$/;

    const message = this.variables[varName];

    if (message && message.content) {
      return phoneNumberRegexp.test(message.content);
    }
    return false;
  }

  isMatchKeyword(varName, resolve) {
    axios
      .get(Endpoint.keyword)
      .then((res) => {
        const { keywords } = res.data;
        const keywordList = keywords.map((item) => item.content);

        const message = this.variables[varName];
        if (message && message.content) {
          keywordList.forEach((keyword) => {
            if (message.content.includes(keyword)) resolve(true);
          });
        }
        resolve(false);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  }

  confirmDialog(varName) {
    const message = this.variables[varName];
    if (message && message.content) {
      return window.confirm(unescape(message.content));
    }
    return false;
  }

  assignText(text) {
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

  // Receive Function
  // this.newMessagesがメッセージのキューになっていて、そこにMessageを追加する処理
  getPastMessages() {
    axios
      .get(Endpoint.message, {
        params: {
          kind: this.kind,
          first_id: this.first_id,
        },
      })
      .then((res) => {
        const { messages } = res.data;
        this.checkExistPastMessage(messages);
        if (messages.length === 0) return;
        this.first_id = messages[0].id;

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
            image_url,
          } = message;
          const pushData = {
            messageId: id,
            senderId: sender_id,
            senderType: sender_type,
            userName: nickname,
            userNumber: number,
            icon: icon_url,
            content: body,
            createdAt: moment(sent_at * 1000),
          };

          if (image_url) {
            this.newMessages.push({
              ...pushData,
              content: message.image_url,
              type: "Image",
            });
          } else if (body !== null) {
            this.newMessages.push({
              ...pushData,
              content: body,
              type: "Text",
            });
          }
        });
      });
  }

  fetchMessage() {
    axios
      .get(Endpoint.message, {
        params: {
          kind: this.kind,
          last_id: this.last_id,
        },
      })
      .then((res) => {
        const { messages } = res.data;
        if (messages.length === 0) return;
        if (!this.last_id) {
          this.checkExistPastMessage(messages);
          this.first_id = messages[0].id;
        }
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
            image_url,
          } = message;
          const pushData = {
            messageId: id,
            senderId: sender_id,
            senderType: sender_type,
            userName: nickname,
            userNumber: number,
            icon: icon_url,
            createdAt: moment(sent_at * 1000),
          };

          if (image_url) {
            this.newMessages.push({
              ...pushData,
              content: message.image_url,
              type: "Image",
            });
          } else if (body !== null) {
            this.newMessages.push({
              ...pushData,
              content: body,
              type: "Text",
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
        clearInterval(this.fetchServerID);
        clearInterval(this.processID);
      });
  }

  fetchServer(callback) {
    this.fetchMessage();
    this.fetchServerID = setInterval(() => {
      this.fetchMessage();
    }, 5000);

    this.processID = setInterval(() => {
      callback();
      this.newMessages.shift();
    }, 250);
  }

  isResponseIncludeImage() {
    return (
      _.has(this.newMessages[0], "content") &&
      this.newMessages[0].type === "Image"
    );
  }

  assignReceivedImage(varName) {
    if (varName) {
      this.variables[varName] = this.newMessages[0];
    }
  }

  isResponseIncludeText() {
    return (
      _.has(this.newMessages[0], "content") &&
      this.newMessages[0].type === "Text"
    );
  }

  assignReceivedText(varName) {
    if (varName) {
      this.variables[varName] = this.newMessages[0];
    }
  }

  // SendImage Function
  onSubmit(callback) {
    this.submitCallback = callback;
  }

  onClickSelectImage(callback) {
    this.clickSelectImageCallback = callback;
  }

  clickImageButton() {
    this.clickSelectImageCallback();
  }

  setInputFileElement(element) {
    this.inputFileElement = element;
  }

  showFileDialog(callback, resolve) {
    this.callbackSelectImagePromiseResolve = resolve;
    this.callbackSelectImage = callback;
    this.inputFileElement.click();
  }

  onSelectImage(file) {
    // file: FileObject
    this.selectedImageFile = createObjectURL(file);
    this.variables.selectedImage = {
      messageId: _.uniqueId("message_not_sent_"),
      senderId: this.userId,
      senderType: "Student",
      userName: this.nickName,
      userNumber: this.studentNumber,
      icon: this.userIcon,
      type: "Image",
      content: this.selectedImageFile,
      createdAt: moment(),
    };
    this.callbackSelectImage(this.callbackSelectImagePromiseResolve);
  }

  async send(varName, callback, resolve) {
    if (varName && this.variables[varName].content) {
      // 画像がない場合は送信しない
      const formData = new FormData();
      formData.append("kind", this.kind);

      switch (this.variables[varName].type) {
        case "Image":
          if (typeof this.variables[varName].content === "string") {
            formData.append(
              "image",
              await ObjectURLToBlob(this.variables[varName].content)
            );
          } else {
            formData.append("image", this.variables[varName].content);
          }
          break;
        case "Text":
          formData.append("body", this.variables[varName].content);
          break;
        default:
          break;
      }
      axios.post(Endpoint.message, formData).then((res) => {
        this.variables[varName].messageId = res.data.id;
        this.variables[varName].createdAt = moment(res.data.created_at);
        callback();
        resolve();
      });
    }
  }

  assignSelectedImage(varName) {
    if (varName) {
      this.variables[varName] = this.variables.selectedImage;
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
  existPastMessage: observable,
  messageBoardStyle: observable,
  setChatInput: action,
  submit: action,
  clickImageButton: action,
  setInputFileElement: action,
  onSelectImage: action,
});

export default Store;
