/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import _ from "lodash";
import moment from "moment";
import { action, decorate, observable } from "mobx";
import BlocklyLessonStore from "common/BlocklyLesson/BlocklyLessonStore";
import userIcon from "components/trial/common/statics/pengin.png";
import raionIcon from "components/trial/common/statics/raion.png";

const createObjectURL =
  (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

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
    this.init();
    this.tableItems = [
      {
        messageId: 0,
        senderId: null,
        userName: "他の人",
        userNumber: 1,
        icon: raionIcon,
        image: raionIcon,
        createdAt: moment(),
      },
    ];
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
    this.first_id = null;
    this.last_id = null;
    this.newMessage = null;
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

  // Receive Function
  fetchServer(callback) {
    this.tableItems.forEach((item) => {
      const {
        messageId,
        senderId,
        userName,
        userNumber,
        icon,
        image,
        createdAt,
      } = item;
      this.newMessage = {
        messageId,
        senderId,
        senderType: "Student",
        userName,
        userNumber,
        icon,
        content: image,
        createdAt,
        type: "Image",
      };
      callback();
    });
  }

  isResponseIncludeImage() {
    return _.has(this.newMessage, "content") && this.newMessage.content !== "";
  }

  assignReceivedImage(varName) {
    if (varName) {
      this.variables[varName] = this.newMessage;
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
      userNumber: this.userNumber,
      icon: this.userIcon,
      content: this.selectedImageFile,
      createdAt: moment(),
      type: "Image",
    };
    this.callbackSelectImage(this.callbackSelectImagePromiseResolve);
  }

  send(varName, callback) {
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
        image: content,
        userName,
        userNumber,
        senderId,
        senderType,
        createdAt,
      });
      callback();
    }
  }

  assignSelectedImage(varName) {
    if (varName) {
      this.variables[varName] = this.variables.selectedImage;
    }
  }
}

decorate(Store, {
  messages: observable,
  tableItems: observable,
  messageBoardStyle: observable,
  isShowTour: observable,
  clickImageButton: action,
  setInputFileElement: action,
  onSelectImage: action,
});

export default Store;
