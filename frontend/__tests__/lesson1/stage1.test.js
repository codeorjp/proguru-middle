/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import GenerateWorkSpace from "components/lesson1/common/components/workspace/GenerateWorkSpace";
import Stage1 from "components/lesson1/Stage1";

let store;
let component;

beforeEach(() => {
  // Storeのインスタンスを生成
  store = new Store(
    0, // userId
    { number: 1 }, // lesson
    { number: 1 }, // stage
    null // submittedWorkspace
  );

  const { stageConfig } = Stage1;
  store.setStageConfig(stageConfig);
  store.setStyle("SendSpeechBalloon", {});
  sessionStorage.clear();

  component = renderer.create(
    <Provider store={store}>
      {Stage1.children}
      <GenerateWorkSpace presetColors={Stage1.presetColors || undefined} />
    </Provider>
  );
});

const correctStyle = {
  fontSize: "16px",
  textAlign: "right",
  color: "#ffffff",
  background: "#007aff",
  borderRadius: "",
};
const correctText = "生徒1です";

describe("Lesson1 Stage1", () => {
  test("Correct Answer", () => {
    // click playground SendSpeechBalloon
    const testInstance = component.root;
    testInstance.children[0].findByProps({ role: "button" }).props.onClick();

    // click workspace 文字色 to #FFFFFF
    const color = testInstance.findAllByProps({ children: "文字色" })[1].parent
      .parent.parent;
    color.findByProps({ title: "#FFF" }).props.onClick();

    // click workspace 背景色 to #007AFF
    const backgroundColor = testInstance.findAllByProps({
      children: "背景色",
    })[1].parent.parent.parent;
    backgroundColor.findByProps({ title: "#007aff" }).props.onClick();

    const sendSpeechText = testInstance.findByProps({
      value: "こんにちは，私の名前は美咲です。",
    });
    sendSpeechText.props.onChange({ target: { value: "生徒1です" } });

    const receive = testInstance.children[0].findByProps({ role: "button" })
      .children[0];
    const receiveStyle = receive.props.style;
    const receiveText = receive.props.children.props.children;

    expect(receiveStyle).toStrictEqual(correctStyle);
    expect(receiveText).toBe(correctText);
  });
});
