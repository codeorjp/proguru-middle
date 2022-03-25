/* eslint-disable no-undef */
import { toJS } from "mobx";
import Store from "components/lesson1/common/Store";
import BaseTouchComponent from "components/lesson1/common/components/playground/baseComponent/BaseTouchComponent";
import Lesson from "../../../mocks/mockLesson";
import Stage from "../../../mocks/mockStage";

const emptyClickElm = {
  title: "",
  className: "",
  style: {},
  editDesignComponent: [],
};
const editStyle = {
  font: { fontSize: "12px", textAlign: "center" },
  background: "#fff",
  color: "#000",
  border: {
    borderWidth: "1px",
    borderStyle: "solid",
  },
  borderRadius: "",
  padding: "10px",
};
const stage5Config = [
  {
    className: "ChatInput",
    editDesignComponent: [
      "border",
      "font",
      "padding",
      "borderRadius",
      "color",
      "background",
    ],
  },
];

describe.skip("methods", () => {
  test.skip("onClick", () => {
    const store = new Store(0, Lesson, Stage, null);
    store.setStageConfig(stage5Config);
    // BaseTouchComponentはrenderメソッドがないため、mountができない
    // この手法だとpropsにstoreをアサインできないため積んだ
    const component = new BaseTouchComponent(store);
    // 浅めの継承構造だったのでChatInputを模することにした
    component.componentTitle = "ChatInput";
    component.componentName = "テキスト入力エリア";
    component.editStyle = editStyle;
    expect(toJS(store.clickElm)).toMatchObject(emptyClickElm);
    component.onClick();
    expect(toJS(store.clickElm)).toMatchObject({
      fontSize: "12px",
      textAlign: "center",
      background: "#fff",
      color: "#000",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "",
      padding: "10px",
    });
  });
});
