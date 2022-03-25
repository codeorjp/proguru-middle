/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import ToastStore from "common/ToastStore";
import GlobalSettingButton from "components/lesson1/common/components/playground/GlobalSettingButton";
import GenerateWorkSpace from "components/lesson1/common/components/workspace/GenerateWorkSpace";
import Stage7 from "components/lesson1/Stage7";

let store;
let component;

beforeEach(() => {
  // Storeのインスタンスを生成
  store = new Store(
    0, // userId
    { number: 1 }, // lesson
    { number: 7 }, // stage
    null // submittedWorkspace
  );

  const { stageConfig } = Stage7;
  store.setStageConfig(stageConfig);
  store.setStyle("SubmitButton", {});
  sessionStorage.clear();

  component = renderer.create(
    <Provider store={store} toastStore={ToastStore}>
      <GlobalSettingButton />
      {Stage7.children}
      <GenerateWorkSpace presetColors={Stage7.presetColors || undefined} />
    </Provider>
  );
});

const correctStyle = {
  background: "#d0021b",
  fontFamily: "Kosugi Maru",
};

describe("Lesson1 Stage7", () => {
  test("Correct Answer", () => {
    // click playground ChatBody
    const testInstance = component.root;
    testInstance.findByProps({ children: "全体設定" }).parent.props.onClick();

    // click workspace 背景色 to #d0021b
    const backgroundColor = testInstance.findAllByProps({
      children: "背景色",
    })[1].parent.parent.parent;
    backgroundColor.findByProps({ title: "#D0021B" }).props.onClick();

    // click workspace フォント to Kosugi Maru
    const fontFamily = testInstance.findAllByProps({ children: "フォント" })[1]
      .parent.parent.parent.children[1].children[0].children[0];
    fontFamily.props.onChange({ target: { value: "Kosugi Maru" } });

    const receive =
      testInstance.children[1].children[0].children[0].children[0];
    const receiveStyle = receive.props.style;

    expect(receiveStyle).toStrictEqual(correctStyle);
  });
});
