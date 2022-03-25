/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import axios from "axios";
import Store from "components/lesson4/common/Store";
import MessageBoard from "common/BlocklyLesson/components/MessageBoard";
import BaseMessage from "../../mocks/mockMessage";

jest.mock("axios");
axios.get.mockResolvedValue({ data: { body: null } });

// see: https://stackoverflow.com/a/47781245
let dateNowSpy;
beforeAll(() => {
  // Lock Time
  dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => 1487076708000);
});

afterAll(() => {
  // Unlock Time
  dateNowSpy.mockRestore();
});

const userId = 0;
const otherUserId = 100;

const createStore = () =>
  new Store(
    userId, // userId
    "hoge", // nickname
    1, // studentNumber
    "usericon", // userIcon
    { number: 0 }, // lesson
    { number: 0 }, // stage
    null // submittedWorkspace
  );

test("snapshot", () => {
  const store = createStore();
  const component = renderer.create(
    <Provider store={store}>
      <MessageBoard types={["Image"]} />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("with messages", () => {
  const store = createStore();
  const SentTextMessage = new BaseMessage({
    messageId: 1,
    senderId: userId,
    type: "Text",
  });
  const SentImageMessage = new BaseMessage({
    messageId: 2,
    senderId: userId,
    type: "Image",
  });
  const ReceivedTextMessage = new BaseMessage({
    messageId: 3,
    senderId: otherUserId,
    type: "Text",
  });
  const ReceivedImageMessage = new BaseMessage({
    messageId: 4,
    senderId: otherUserId,
    type: "Image",
  });
  store.messages.push(
    SentTextMessage,
    SentImageMessage,
    ReceivedTextMessage,
    ReceivedImageMessage
  );
  const component = renderer.create(
    <Provider store={store}>
      <MessageBoard types={["Image"]} />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
