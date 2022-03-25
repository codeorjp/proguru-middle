/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import SendProfileIcon from "components/lesson1/common/components/playground/SendProfileIcon";

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
  store.setStyle("SendProfileIcon", {});

  component = renderer.create(
    <Provider store={store}>
      <SendProfileIcon />
    </Provider>
  );
});

describe("Send Profile Icon", () => {
  test("render SendProfileIcon", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set width: 70px, height: 70px", () => {
    store.setStyle("SendProfileIcon", {
      imgSize: {
        width: "70px",
        height: "70px",
      },
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set border-color: #A5A5A5, border-style: solid, boder-width: 1px", () => {
    store.setStyle("SendProfileIcon", {
      border: {
        borderColor: "#A5A5A5",
        borderStyle: "solid",
        borderWidth: "1px",
      },
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set border-radius: 50px 50px 50px 50px", () => {
    store.setStyle("SendProfileIcon", {
      borderRadius: "50px 50px 50px 50px",
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set background: #00ff00", () => {
    store.setStyle("SendProfileIcon", { background: "#00ff00" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
