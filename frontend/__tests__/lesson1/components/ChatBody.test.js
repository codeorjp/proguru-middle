/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import ChatBody from "components/lesson1/common/components/playground/ChatBody";

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
  store.setStyle("ChatBody", {});

  component = renderer.create(
    <Provider store={store}>
      <ChatBody />
    </Provider>
  );
});

describe("Chat Body", () => {
  test("render ChatBody", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set background: #FF0000", () => {
    store.setStyle("ChatBody", { background: "#FF0000" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set font-family: Kosugi Maru", () => {
    store.setStyle("ChatBody", { fontFamily: "Kosugi Maru" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
