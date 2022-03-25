import { toJS } from "mobx";
import { ComponentStyleType } from "common/types/ComponentStyleType";
import Store from "components/lesson1/common/Store";
import Lesson from "../mocks/mockLesson";
import Stage from "../mocks/mockStage";

const DefaultStyles = {
  SendSpeechBalloon: {
    style: {
      font: { fontSize: "16px", textAlign: "right" },
      color: "#000",
      border: {},
      background: "",
      borderRadius: "",
    },
  },
};

const ClickElement = {
  title: "メッセージ送信側の吹き出し",
  className: "SendSpeechBalloon",
  editDesignComponent: ["color", "background", "sendText"],
  style: {
    font: { fontSize: "16px", textAlign: "right" },
    color: "#000",
    border: {},
    background: "",
    borderRadius: "",
  },
};

// new style samples
const font: ComponentStyleType = {
  font: {
    fontSize: "12px",
    textAlign: "center",
  },
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fontColor: ComponentStyleType = {
  color: "5D3636",
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bgColor: ComponentStyleType = {
  background: "B15A5A",
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const padding: ComponentStyleType = {
  padding: "10px 10px 10px 10px",
};

describe("methods", () => {
  describe("setStyle", () => {
    let store: Store;
    beforeEach(() => {
      store = new Store(0, Lesson, Stage, null);
      store.setClickElm(ClickElement);
    });
    describe("happy path", () => {
      test("change schemas", () => {
        const schema = toJS(store.schemas.SendSpeechBalloon);
        expect(schema).toMatchObject(DefaultStyles.SendSpeechBalloon);

        store.setStyle("SendSpeechBalloon", font);
        const newStyle = toJS(store.schemas.SendSpeechBalloon);
        expect(newStyle).toMatchObject({
          style: {
            font: { fontSize: "12px", textAlign: "center" },
            color: "#000",
            border: {},
            background: "",
            borderRadius: "",
          },
        });
      });
      test("change clickElm", () => {
        const clickElm = toJS(store.clickElm.style);
        expect(clickElm).toMatchObject(DefaultStyles.SendSpeechBalloon.style);

        store.setStyle("SendSpeechBalloon", font);
        const newStyle = toJS(store.clickElm.style);
        expect(newStyle).toMatchObject({
          font: { fontSize: "12px", textAlign: "center" },
          color: "#000",
          border: {},
          background: "",
          borderRadius: "",
        });
      });
    });
    describe("unhappy path", () => {
      test("undefined className", () => {
        const undefinedClassName = "kyoncy";
        const schemas = toJS(store.schemas);
        expect(schemas).not.toHaveProperty(undefinedClassName);
        expect(() => {
          store.setStyle(undefinedClassName, font);
        }).toThrow(TypeError);
      });
    });
  });
});
