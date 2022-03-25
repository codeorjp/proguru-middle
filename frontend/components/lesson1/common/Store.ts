import { action, decorate, observable, toJS } from "mobx";
import Storage from "components/lesson1/common/util/Storage";
import { DesignSchemaType } from "common/types/DesignSchemaType";
import { ComponentStyleType } from "common/types/ComponentStyleType";
import { LessonType } from "common/types/LessonType";
import { StageType } from "common/types/StageType";

type ClickElement = {
  title: string;
  className: string;
  style: ComponentStyleType;
  editDesignComponent: string[];
};

type StageConfig = {
  className: string;
  editDesignComponent: string[];
}[];

class Store {
  storage: Storage;
  schemas: DesignSchemaType;
  clickElm: ClickElement;
  stageConfig: StageConfig;
  sendSpeechText: string;
  receiveSpeechText: string;
  isFirstTime: boolean;
  isStageFirstTime: boolean;

  constructor(
    public userId: number | string,
    public lesson: LessonType,
    public stage: StageType,
    public submittedWorkspace: any
  ) {
    this.storage = new Storage(`${window.location.href}-user${this.userId}`);
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
    this.isFirstTime = this.checkFirstTime(
      `lesson${this.lesson.number}:isFirstTime`
    );
    this.isStageFirstTime = this.checkFirstTime(
      `lesson${this.lesson.number}-stage${this.stage.number}`
    );

    // sessionStorageのrestore処理
    this.schemas = this.storage.restoreWorkspace(this.schemas);
  }

  restoreSubmittedWorkspace(schemas: DesignSchemaType): void {
    if (schemas) {
      this.schemas = schemas;
    }
  }

  checkFirstTime(url: string): boolean {
    try {
      const isFirstTime = window.localStorage.getItem(url);
      return isFirstTime !== "false";
    } catch {
      return true;
    }
  }

  setFirstTimeDone(url: string): void {
    this.isFirstTime = false;
    try {
      window.localStorage.setItem(url, "false");
    } catch {}
  }

  setClickElm(clickElm: ClickElement): void {
    this.clickElm = clickElm;
  }

  setStyle(className: string, style: ComponentStyleType): void {
    const prevStyle = toJS(this.schemas[className].style);
    const nextStyle = {
      ...prevStyle,
      ...style,
    };
    this.schemas[className].style = nextStyle;
    this.clickElm.style = nextStyle;

    this.storage.saveWorkspace(this.schemas);
  }

  setSendSpeechText(text: string): void {
    this.sendSpeechText = text;
  }

  setReceiveSpeechText(text: string): void {
    this.receiveSpeechText = text;
  }

  setStageConfig(config: StageConfig): void {
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
  setSendSpeechText: action,
  setReceiveSpeechText: action,
  setFirstTimeDone: action,
});

export default Store;
