/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import ToastStore from "common/ToastStore";
import GenerateWorkSpace from "components/lesson1/common/components/workspace/GenerateWorkSpace";
import Stage6 from "components/lesson1/Stage6";

let store;
let component;

beforeEach(() => {
  // Storeのインスタンスを生成
  store = new Store(
    0, // userId
    { number: 1 }, // lesson
    { number: 6 }, // stage
    null // submittedWorkspace
  );

  const { stageConfig } = Stage6;
  store.setStageConfig(stageConfig);
  store.setStyle("SubmitButton", {});
  sessionStorage.clear();

  component = renderer.create(
    <Provider store={store} toastStore={ToastStore}>
      {Stage6.children}
      <GenerateWorkSpace presetColors={Stage6.presetColors || undefined} />
    </Provider>
  );
});

const correctStyle = {
  color: "#ffffff",
  background: "#007feb",
  borderRadius: "4px 4px 4px 4px",
  fontSize: "16px",
  textAlign: "center",
  padding: "14px 14px 14px 14px",
};

describe("Lesson1 Stage6", () => {
  test("Correct Answer", () => {
    // click playground SubmitButton
    const testInstance = component.root;
    testInstance.children[0].findByProps({ role: "button" }).props.onClick();

    // click workspace 文字色 to #ffffff
    const color = testInstance.findAllByProps({ children: "文字色" })[1].parent
      .parent.parent;
    color.findByProps({ title: "#FFF" }).props.onClick();

    // click workspace 角丸 to 4px 4px 4px 4px
    let borderRadius = testInstance.findByProps({ placeholder: "左上" });
    borderRadius.props.onChange({ target: { value: "4" } });
    borderRadius = testInstance.findByProps({ placeholder: "右上" });
    borderRadius.props.onChange({ target: { value: "4" } });
    borderRadius = testInstance.findByProps({ placeholder: "右下" });
    borderRadius.props.onChange({ target: { value: "4" } });
    borderRadius = testInstance.findByProps({ placeholder: "左下" });
    borderRadius.props.onChange({ target: { value: "4" } });

    // click workspace 背景色 to #007feb
    const backgroundColor = testInstance.findAllByProps({
      children: "背景色",
    })[1].parent.parent.parent;
    backgroundColor.findByProps({ title: "#007FEB" }).props.onClick();

    // click workspace 文字サイズ to 16px
    const fontSize = testInstance.findByProps({ children: "文字サイズ" }).parent
      .children[1];
    fontSize.props.onChange({ target: { value: 16 } });

    // click workspace 文字揃え to center
    const textAlign = testInstance.findByProps({ children: "文字揃え" }).parent
      .children[1];
    textAlign.children[1].props.onClick();

    // click workspace 余白 to 14px 14px 14px 14px
    let padding = testInstance.findByProps({ placeholder: "上" });
    padding.props.onChange({ target: { value: "14" } });
    padding = testInstance.findByProps({ placeholder: "右" });
    padding.props.onChange({ target: { value: "14" } });
    padding = testInstance.findByProps({ placeholder: "下" });
    padding.props.onChange({ target: { value: "14" } });
    padding = testInstance.findByProps({ placeholder: "左" });
    padding.props.onChange({ target: { value: "14" } });

    const receive = testInstance.children[0].findByProps({ role: "button" })
      .children[0];
    const receiveStyle = receive.props.style;

    expect(receiveStyle).toStrictEqual(correctStyle);
  });
});
