/* eslint-disable no-undef */
import axios from "axios";
import React from "react";
import { Provider } from "mobx-react";
import moment from "moment";
import renderer from "react-test-renderer";
import Store from "components/lesson3/common/Store";
import MessageBoard from "common/BlocklyLesson/components/MessageBoard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let store: any;
let component: any;

beforeEach(() => {
  // axios
  mockedAxios.get.mockResolvedValue({ data: {} });

  // Storeのインスタンスを生成
  // constructorのaxios.get()でError検出する
  store = new Store(
    0, // userId
    "生徒1", // nickName
    0, // studnetNumber
    null, // userIcon
    { number: 3 }, // lesson
    { number: 1 }, // stage
    null // submittedWorkspace
  );

  // Component
  component = renderer.create(
    <Provider store={store}>
      <MessageBoard types={["Text"]} />
    </Provider>
  );
});

const addMessage = (messageId: number, content: string) => {
  store.messages.push({
    messageId,
    senderId: store.userId,
    senderType: "Student",
    userName: store.nickName,
    userNumber: store.studentNumber,
    icon: null,
    content,
    createdAt: moment("20200202", "YYYYMMDD"),
    type: "Text",
  });
};

describe("Message Board", () => {
  test("render MessageBoard", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("add message", () => {
    addMessage(1, "こんにちは");

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("add two message", () => {
    addMessage(1, "こんにちは");
    addMessage(2, "おはよう");

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
