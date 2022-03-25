/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import ChatInput from "components/lesson1/common/components/playground/ChatInput";

let store;
let component;

beforeEach(() => {
  // Storeのインスタンスを生成
  store = new Store(
    0, // userId
    { number: 0 }, // lesson
    { number: 0 }, // stage
    null // submittedWorkspace
  );
  store.setStyle("ChatInput", {});

  component = renderer.create(
    <Provider store={store}>
      <ChatInput />
    </Provider>
  );
});

describe("Chat Input", () => {
  test("render ChatInput", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set color: #757575", () => {
    store.setStyle("ChatInput", { color: "#757575" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set background: #F5F5F5", () => {
    // set background color #F5F5F5
    store.setStyle("ChatInput", { background: "#F5F5F5" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set font-size: 16px", () => {
    // set font size 16px
    store.setStyle("ChatInput", { fontSize: "16px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set text-align: left", () => {
    // set text align left
    store.setStyle("ChatInput", { textAlign: "left" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set padding: 14px 14px 14px 14px", () => {
    // set padding 14px
    store.setStyle("ChatInput", { padding: "14px 14px 14px 14px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set border-color: #D8D8D8, border-style: solid, boder-width: 1px", () => {
    store.setStyle("ChatInput", {
      border: {
        borderColor: "#D8D8D8",
        borderStyle: "solid",
        borderWidth: "1px",
      },
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set border-radius: 4px 4px 4px 4px", () => {
    // set boder radius 4px
    store.setStyle("ChatInput", { padding: "4px 4px 4px 4px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
