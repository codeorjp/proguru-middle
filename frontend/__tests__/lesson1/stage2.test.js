/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import ToastStore from "common/ToastStore";
import GenerateWorkSpace from "components/lesson1/common/components/workspace/GenerateWorkSpace";
import Stage2 from "components/lesson1/Stage2";

let store;
let component;

beforeEach(() => {
  // Storeのインスタンスを生成
  store = new Store(
    0, // userId
    { number: 1 }, // lesson
    { number: 2 }, // stage
    null // submittedWorkspace
  );

  const { stageConfig } = Stage2;
  store.setStageConfig(stageConfig);
  store.setStyle("SendSpeechBalloon", {});
  sessionStorage.clear();

  component = renderer.create(
    <Provider store={store} toastStore={ToastStore}>
      {Stage2.children}
      <GenerateWorkSpace presetColors={Stage2.presetColors || undefined} />
    </Provider>
  );
});

const correctStyle = {
  background: "#007FEB",
  borderRadius: "",
  color: "#fff",
  fontSize: "16px",
  textAlign: "left",
  padding: "20px 20px 20px 20px",
};

describe("Lesson1 Stage2", () => {
  test("Correct Answer", () => {
    // click playground SendSpeechBalloon
    const testInstance = component.root;
    testInstance.children[0].findByProps({ role: "button" }).props.onClick();

    // click workspace 文字サイズ to 16px
    const fontSize = testInstance.findByProps({ children: "文字サイズ" }).parent
      .children[1];
    fontSize.props.onChange({ target: { value: 16 } });

    // click workspace 文字揃え to left
    const textAlign = testInstance.findByProps({ children: "文字揃え" }).parent
      .children[1];
    textAlign.children[0].props.onClick();

    // click workspace 余白 to 20px 20px 20px 20px
    let padding = testInstance.findByProps({ placeholder: "上" });
    padding.props.onChange({ target: { value: "20" } });
    padding = testInstance.findByProps({ placeholder: "右" });
    padding.props.onChange({ target: { value: "20" } });
    padding = testInstance.findByProps({ placeholder: "下" });
    padding.props.onChange({ target: { value: "20" } });
    padding = testInstance.findByProps({ placeholder: "左" });
    padding.props.onChange({ target: { value: "20" } });

    const receive = testInstance.children[0].findByProps({ role: "button" })
      .children[0];
    const receiveStyle = receive.props.style;

    expect(receiveStyle).toStrictEqual(correctStyle);
  });
});
