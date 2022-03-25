import { action, decorate, observable, toJS } from "mobx";
import Storage from "components/lesson1/common/util/Storage";

class Store {
  constructor(lessonId) {
    this.lesson = {
      number: lessonId,
    };
    this.stage = {
      number: 0,
    };
    this.storage = new Storage(`trial-lesson-${this.lesson.number}`);
    this.schemas = {
      SendSpeechBalloon: {
        style: {
          font: { fontSize: "16px", textAlign: "right" },
          color: "#000",
          border: {},
          background: "",
          borderRadius: "",
        },
      },
      SendProfileIcon: {
        style: {
          imgSize: {
            width: "200px",
            height: "200px",
          },
          border: {
            borderWidth: "1px",
          },
          borderRadius: "",
          background: "#fff",
        },
      },
      ReceiveSpeechBalloon: {
        style: {
          font: { fontSize: "16px", textAlign: "right" },
          color: "#000",
          border: {},
          borderRadius: "",
          background: "",
        },
      },
      ReceiveProfileIcon: {
        style: {
          imgSize: {
            width: "200px",
            height: "200px",
          },
          border: {
            borderWidth: "1px",
          },
          borderRadius: "",
          background: "#fff",
        },
      },
      ChatInput: {
        style: {
          font: { fontSize: "14px" },
          color: "#000",
          border: {},
          borderRadius: "",
          background: "#fff",
          padding: "",
        },
      },
      SubmitButton: {
        style: {
          font: { fontSize: "14px" },
          color: "#000",
          border: {},
          borderRadius: "",
          background: "#fff",
          padding: "",
        },
      },
      ChatBody: {
        style: {
          background: "#fff",
        },
      },
    };
    this.clickElm = {
      title: "", // 編集するコンポーネントタイトル
      className: "", // CSSクラス名
      style: {}, // 当てるスタイル
      editDesignComponent: [], // 編集コンポーネント
    };
    this.stageConfig = [
      {
        // アタッチするデザイン編集項目
        className: "", // CSSクラス名
        editDesignComponent: [], // 編集コンポーネント
      },
    ];
    this.sendSpeechText = "こんにちは，私の名前は美咲です。";
    this.receiveSpeechText = "こんにちは，私の名前は翔太です。";
    this.isShowTour = this.checkShowTour(`trial-lesson${lessonId}-tour`);

    // sessionStorageのrestore処理
    this.schemas = this.storage.restoreWorkspace(this.schemas);
  }

  restoreSubmittedWorkspace(schemas) {
    if (schemas) {
      this.schemas = schemas;
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

  setClickElm(clickElm) {
    this.clickElm = clickElm;
  }

  setStyle(className, style) {
    const prevStyle = toJS(this.schemas[className].style);
    const nextStyle = {
      ...prevStyle,
      ...style,
    };
    this.schemas[className].style = nextStyle;
    this.clickElm.style = nextStyle;

    this.storage.saveWorkspace(this.schemas);
  }

  setSendSpeechText(text) {
    this.sendSpeechText = text;
  }

  setReceiveSpeechText(text) {
    this.receiveSpeechText = text;
  }

  setStageConfig(config) {
    this.stageConfig = config;
  }
}

decorate(Store, {
  clickElm: observable,
  schemas: observable,
  isFirstTime: observable,
  sendSpeechText: observable,
  receiveSpeechText: observable,
  setClickElm: action,
  setStageConfig: action,
  setStyle: action,
  setSpeechText: action,
  setSendSpeechText: action,
  setReceiveSpeechText: action,
});

export default Store;
