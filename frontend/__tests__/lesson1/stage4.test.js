/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import ToastStore from "common/ToastStore";
import GenerateWorkSpace from "components/lesson1/common/components/workspace/GenerateWorkSpace";
import Stage4 from "components/lesson1/Stage4";

let store;
let component;

beforeEach(() => {
  // Storeのインスタンスを生成
  store = new Store(
    0, // userId
    { number: 1 }, // lesson
    { number: 4 }, // stage
    null // submittedWorkspace
  );

  const { stageConfig } = Stage4;
  store.setStageConfig(stageConfig);
  store.setStyle("SendProfileIcon", {});
  sessionStorage.clear();

  component = renderer.create(
    <Provider store={store} toastStore={ToastStore}>
      {Stage4.children}
      <GenerateWorkSpace presetColors={Stage4.presetColors || undefined} />
    </Provider>
  );
});

const correctStyle = {
  height: "70px",
  width: "70px",
  background: "#fff",
  borderRadius: "100px 100px 100px 100px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#a5a5a5",
};

describe("Lesson1 Stage4", () => {
  test("Correct Answer", () => {
    // click playground SendProfileIcon
    const testInstance = component.root;
    testInstance.children[0].findByProps({ role: "button" }).props.onClick();

    // click workspace 画像サイズ to 70px 70px
    const width = testInstance.findByProps({ children: "横幅" }).parent
      .children[1];
    width.props.onChange({ target: { value: 70 } });
    const height = testInstance.findByProps({ children: "高さ" }).parent
      .children[1];
    height.props.onChange({ target: { value: 70 } });

    // click workspace 枠線 to 1px solid #a5a5a5
    const borderWidth = testInstance.findByProps({ children: "線の太さ" })
      .parent.children[1].children[0];
    borderWidth.props.onChange({ target: { value: 1 } });
    const borderColor = testInstance.findAllByProps({ children: "枠線" })[1]
      .parent.parent.parent;
    borderColor.findByProps({ title: "#A5A5A5" }).props.onClick();

    // click workspace 角丸 to 100px 100px 100px 100px
    let borderRadius = testInstance.findByProps({ placeholder: "左上" });
    borderRadius.props.onChange({ target: { value: "100" } });
    borderRadius = testInstance.findByProps({ placeholder: "右上" });
    borderRadius.props.onChange({ target: { value: "100" } });
    borderRadius = testInstance.findByProps({ placeholder: "右下" });
    borderRadius.props.onChange({ target: { value: "100" } });
    borderRadius = testInstance.findByProps({ placeholder: "左下" });
    borderRadius.props.onChange({ target: { value: "100" } });

    const receive = testInstance.children[0].findByProps({ role: "button" })
      .children[0];
    const receiveStyle = receive.props.style;

    expect(receiveStyle).toStrictEqual(correctStyle);
  });
});
