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
import image1 from "./statics/image1.jpg";
import image2 from "./statics/image2.jpg";
import image3 from "./statics/image3.jpg";
import image4 from "./statics/image4.jpg";
import image5 from "./statics/image5.jpg";
import image6 from "./statics/image6.jpg";
import image7 from "./statics/image7.jpg";
import image8 from "./statics/image8.jpg";
import image9 from "./statics/image9.jpg";
import image10 from "./statics/image10.jpg";

const createObjectURL =
  (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
const sampleImages = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8,
  9: image9,
  10: image10,
};

class Store extends BlocklyLessonStore {
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
    this.fetchServerID = "";
    this.processID = "";
    this.isFirstTime = this.checkFirstTime(
      `lesson${this.lesson.number}:isFirstTime`
    );
    this.isStageFirstTime = this.checkFirstTime(
      `lesson${this.lesson.number}-stage${this.stage.number}`
    );
    this.setSampleImage = this.setSampleImage.bind(this);
    this.init();
    axios.get("/api/lessons/1/stages/8/workspaces").then((res) => {
      const { workspace } = res.data;
      this.messageBoardStyle = workspace ? JSON.parse(workspace.body) : null;
    });
  }

  init() {
    clearInterval(this.fetchServerID);
    clearInterval(this.processID);
    this.isExecute = false;
    this.messages = [];
    this.variables = {
      receivedImage: "",
      sendImage: "",
      newImage: "",
      selectedImage: "", // `選ばれた画像`ブロックの変数
      inputText: "",
    };
    this.imageQuality = 1.0;
    this.selectedImageFile = "";
    this.clickSelectImageCallback = () => {};
    this.callbackSelectImage = () => {};
    this.callbackSelectImagePromiseResolve = () => {};
    this.last_id = null;
    this.newMessages = [];
  }

  setSampleImage() {
    const property = {
      senderId: this.userId,
      senderType: "Student",
      userName: this.nickName,
      userNumber: this.studentNumber,
      icon: this.userIcon,
      createdAt: moment(),
      type: "Image",
    };

    Object.keys(sampleImages).forEach((key) => {
      this.variables[`sampleImage${key}`] = {
        ...property,
        messageId: _.uniqueId("message_not_sent_"),
        content: sampleImages[key],
      };
    });
  }

  // CommonToReceiveAndSend Function
  display(varName) {
    const message = this.variables[varName];
    if (message && message.content) {
      const { content } = message;
      this.messages.push({
        ...message,
        content:
          typeof content === "object" ? createObjectURL(content) : content,
      });
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

  fetchMessage() {
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
            image_url,
          } = message;
          if (image_url) {
            this.newMessages.push({
              messageId: id,
              senderId: sender_id,
              senderType: sender_type,
              userName: nickname,
              userNumber: number,
              icon: icon_url,
              content: image_url,
              createdAt: moment(sent_at * 1000),
              type: "Image",
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

  // Receive Function
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
      this.newMessages[0].content !== ""
    );
  }

  assignReceivedImage(varName) {
    if (varName) {
      this.variables[varName] = this.newMessages[0];
    }
  }

  // SendImage Function
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
      content: this.selectedImageFile,
      createdAt: moment(),
      type: "Image",
    };
    this.callbackSelectImage(this.callbackSelectImagePromiseResolve);
  }

  async send(varName, callback) {
    if (varName && this.variables[varName]) {
      if (this.variables[varName].content) {
        // 画像がない場合は送信しない
        const formData = new FormData();
        formData.append("kind", "lesson");
        if (typeof this.variables[varName].content === "string") {
          formData.append(
            "image",
            await ObjectURLToBlob(this.variables[varName].content)
          );
        } else {
          formData.append("image", this.variables[varName].content);
        }

        axios.post(Endpoint.message, formData).then((res) => {
          this.variables[varName].messageId = res.data.id;
          this.variables[varName].createdAt = moment(res.data.created_at);
          callback();
        });
      }
    }
  }

  assignSelectedImage(varName) {
    if (varName) {
      this.variables[varName] = this.variables.selectedImage;
    }
  }
}

decorate(Store, {
  isFirstTime: observable,
  messages: observable,
  messageBoardStyle: observable,
  clickImageButton: action,
  setInputFileElement: action,
  onSelectImage: action,
});

export default Store;
