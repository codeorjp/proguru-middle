/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import ToastStore from "common/ToastStore";
import GenerateWorkSpace from "components/lesson1/common/components/workspace/GenerateWorkSpace";
import Stage3 from "components/lesson1/Stage3";

let store;
let component;

beforeEach(() => {
  // Storeのインスタンスを生成
  store = new Store(
    0, // userId
    { number: 1 }, // lesson
    { number: 3 }, // stage
    null // submittedWorkspace
  );

  const { stageConfig } = Stage3;
  store.setStageConfig(stageConfig);
  store.setStyle("SendSpeechBalloon", {});
  sessionStorage.clear();

  component = renderer.create(
    <Provider store={store} toastStore={ToastStore}>
      {Stage3.children}
      <GenerateWorkSpace presetColors={Stage3.presetColors || undefined} />
    </Provider>
  );
});

const correctStyle = {
  background: "#007FEB",
  borderRadius: "50px 0px 50px 50px",
  color: "#fff",
  fontSize: "16px",
  textAlign: "left",
  padding: "20px",
};

describe("Lesson1 Stage3", () => {
  test("Correct Answer", () => {
    // click playground SendSpeechBalloon
    const testInstance = component.root;
    testInstance.children[0].findByProps({ role: "button" }).props.onClick();

    // click workspace 角丸 to 50px 0px 50px 50px
    let borderRadius = testInstance.findByProps({ placeholder: "左上" });
    borderRadius.props.onChange({ target: { value: "50" } });
    borderRadius = testInstance.findByProps({ placeholder: "右上" });
    borderRadius.props.onChange({ target: { value: "0" } });
    borderRadius = testInstance.findByProps({ placeholder: "右下" });
    borderRadius.props.onChange({ target: { value: "50" } });
    borderRadius = testInstance.findByProps({ placeholder: "左下" });
    borderRadius.props.onChange({ target: { value: "50" } });

    const receive = testInstance.children[0].findByProps({ role: "button" })
      .children[0];
    const receiveStyle = receive.props.style;

    expect(receiveStyle).toStrictEqual(correctStyle);
  });
});
