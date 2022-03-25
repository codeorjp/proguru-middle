/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import ToastStore from "common/ToastStore";
import GenerateWorkSpace from "components/lesson1/common/components/workspace/GenerateWorkSpace";
import Stage5 from "components/lesson1/Stage5";

let store;
let component;

beforeEach(() => {
  // Storeのインスタンスを生成
  store = new Store(
    0, // userId
    { number: 1 }, // lesson
    { number: 5 }, // stage
    null // submittedWorkspace
  );

  const { stageConfig } = Stage5;
  store.setStageConfig(stageConfig);
  store.setStyle("ChatInput", {});
  sessionStorage.clear();

  component = renderer.create(
    <Provider store={store} toastStore={ToastStore}>
      {Stage5.children}
      <GenerateWorkSpace presetColors={Stage5.presetColors || undefined} />
    </Provider>
  );
});

const correctStyle = {
  color: "#757575",
  background: "#f5f5f5",
  borderRadius: "4px 4px 4px 4px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#d8d8d8",
  fontSize: "16px",
  textAlign: "left",
  padding: "14px 14px 14px 14px",
};

describe("Lesson1 Stage5", () => {
  test("Correct Answer", () => {
    // click playground ChatInput
    const testInstance = component.root;
    testInstance.children[0].findByProps({ role: "button" }).props.onClick();

    // click workspace 文字色 to #757575
    const color = testInstance.findAllByProps({ children: "文字色" })[1].parent
      .parent.parent;
    color.findByProps({ title: "#757575" }).props.onClick();

    // click workspace 枠線 to 1px solid #d8d8d8
    const borderWidth = testInstance.findByProps({ children: "線の太さ" })
      .parent.children[1].children[0];
    borderWidth.props.onChange({ target: { value: 1 } });
    const borderColor = testInstance.findAllByProps({ children: "枠線" })[1]
      .parent.parent.parent;
    borderColor.findByProps({ title: "#D8D8D8" }).props.onClick();

    // click workspace 角丸 to 4px 4px 4px 4px
    let borderRadius = testInstance.findByProps({ placeholder: "左上" });
    borderRadius.props.onChange({ target: { value: "4" } });
    borderRadius = testInstance.findByProps({ placeholder: "右上" });
    borderRadius.props.onChange({ target: { value: "4" } });
    borderRadius = testInstance.findByProps({ placeholder: "右下" });
    borderRadius.props.onChange({ target: { value: "4" } });
    borderRadius = testInstance.findByProps({ placeholder: "左下" });
    borderRadius.props.onChange({ target: { value: "4" } });

    // click workspace 背景色 to #f5f5f5
    const backgroundColor = testInstance.findAllByProps({
      children: "背景色",
    })[1].parent.parent.parent;
    backgroundColor.findByProps({ title: "#F5F5F5" }).props.onClick();

    // click workspace 文字サイズ to 16px
    const fontSize = testInstance.findByProps({ children: "文字サイズ" }).parent
      .children[1];
    fontSize.props.onChange({ target: { value: 16 } });

    // click workspace 文字揃え to left
    const textAlign = testInstance.findByProps({ children: "文字揃え" }).parent
      .children[1];
    textAlign.children[0].props.onClick();

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
