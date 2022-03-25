/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson1/common/Store";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";

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
  store.setStyle("SendSpeechBalloon", {});

  component = renderer.create(
    <Provider store={store}>
      <SendSpeechBalloon isDebug />
    </Provider>
  );
});

describe("Send Speech Balloon", () => {
  test("render SendSpeechBalloon", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set color: #ff0000", () => {
    // set text color #ff0000
    store.setStyle("SendSpeechBalloon", { color: "#ff0000" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set background: #00ff00", () => {
    // set background color #00ff00
    store.setStyle("SendSpeechBalloon", { background: "#00ff00" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set send speech text", () => {
    store.setSendSpeechText("こんにちは，僕の名前は生徒1です。");

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set font-size: 20px", () => {
    // set font size 20px
    store.setStyle("SendSpeechBalloon", { fontSize: "20px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set text-align: left", () => {
    // set text align left
    store.setStyle("SendSpeechBalloon", { textAlign: "left" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set padding: 10px 10px 10px 10px", () => {
    // set padding 10px
    store.setStyle("SendSpeechBalloon", { padding: "10px 10px 10px 10px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("set border-radius: 30px 0px 30px 30px", () => {
    // set boder radius 30px 0px 30px 30px
    store.setStyle("SendSpeechBalloon", { padding: "30px 0px 30px 30px" });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
