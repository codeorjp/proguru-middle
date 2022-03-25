/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import SubmitButton from "components/lesson1/common/components/playground/SubmitButton";

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
  store.setStyle("SubmitButton", {});

  component = renderer.create(
    <Provider store={store}>
      <SubmitButton />
    </Provider>
  );
});

describe("Submit Button", () => {
  test("render SubmitButton", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set color: #FFFFFF", () => {
    store.setStyle("SubmitButton", { color: "#FFFFFF" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set background: #007FEB", () => {
    store.setStyle("SubmitButton", { background: "#007FEB" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set font-size: 16px", () => {
    store.setStyle("SubmitButton", { fontSize: "16px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set text-align: center", () => {
    store.setStyle("SubmitButton", { textAlign: "center" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set padding: 14px 14px 14px 14px", () => {
    store.setStyle("SubmitButton", { padding: "14px 14px 14px 14px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set border-radius: 4px 4px 4px 4px", () => {
    store.setStyle("SubmitButton", { padding: "4px 4px 4px 4px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
