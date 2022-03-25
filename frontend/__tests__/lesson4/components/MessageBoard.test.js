/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
import Store from "components/lesson4/common/Store";
import MessageBoard from "common/BlocklyLesson/components/MessageBoard";
import * as Messages from "common/BlocklyLesson/components/Message";
import SubmitArea from "common/BlocklyLesson/components/SubmitArea";
import MessageBoardStyle, {
  SendSpeechBalloonStyle,
  SendProfileIconStyle,
  ReceiveSpeechBalloonStyle,
  ReceiveProfileIconStyle,
} from "../../mocks/mockMessageBoardStyle";
import BaseMessage from "../../mocks/mockMessage";

// see: https://jestjs.io/docs/ja/mock-functions#%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%AE%E3%83%A2%E3%83%83%E3%82%AF
// create module mock
jest.mock("axios");
axios.get.mockResolvedValue({ data: { body: null } });

configure({ adapter: new Adapter() });

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

const mountComponent = (store) =>
  mount(
    <Provider store={store}>
      <MessageBoard types={["Image"]} />
    </Provider>
  );

// NOTICE: テスト内容はLesson3.MessageBoardとほぼ同一
describe("common test", () => {
  test("toggle isExecute", () => {
    const store = createStore();
    const component = mountComponent(store);
    store.isExecute = true;
    expect(component.find("p").at(1).text()).toEqual("プログラムを実行中...");

    store.isExecute = false;
    expect(component.find("p").at(1).text()).toEqual(
      `プログラムを組んだら「実行する」ボタンを押してね`
    );
  });

  describe("render Messages", () => {
    test("render SendText", () => {
      const store = createStore();
      const SentTextMessage = new BaseMessage({
        messageId: 1,
        senderId: userId,
        type: "Text",
      });
      store.messages.push(SentTextMessage);
      const component = mountComponent(store);
      expect(component.find(".sendMessageArea")).toHaveLength(1);
      expect(component.find(Messages.SendText)).toHaveLength(1);
      expect(component.find(Messages.SendText).text()).toContain("出席番号");
    });

    test("render SendImage", () => {
      const store = createStore();
      const SentImageMessage = new BaseMessage({
        messageId: 2,
        senderId: userId,
        type: "Image",
      });
      store.messages.push(SentImageMessage);
      const component = mountComponent(store);
      expect(component.find(".sendMessageArea")).toHaveLength(1);
      expect(component.find(Messages.SendImage)).toHaveLength(1);
      expect(component.find(Messages.SendImage).text()).toContain("出席番号");
    });

    test("render ReceiveText", () => {
      const store = createStore();
      const ReceivedTextMessage = new BaseMessage({
        messageId: 3,
        senderId: otherUserId,
        type: "Text",
      });
      store.messages.push(ReceivedTextMessage);
      const component = mountComponent(store);
      expect(component.find(".sendMessageArea")).toHaveLength(1);
      expect(component.find(Messages.ReceiveText)).toHaveLength(1);
      expect(component.find(Messages.ReceiveText).text()).toContain("出席番号");
    });

    test("render ReceiveImage", () => {
      const store = createStore();
      const ReceivedImageMessage = new BaseMessage({
        messageId: 4,
        senderId: otherUserId,
        type: "Image",
      });
      store.messages.push(ReceivedImageMessage);
      const component = mountComponent(store);
      expect(component.find(".sendMessageArea")).toHaveLength(1);
      expect(component.find(Messages.ReceiveImage)).toHaveLength(1);
      expect(component.find(Messages.ReceiveImage).text()).toContain(
        "出席番号"
      );
    });

    test("render timeline", () => {
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
      const component = mountComponent(store);
      expect(component.find(".sendMessageArea")).toHaveLength(4);
      expect(component.find(Messages.SendText)).toHaveLength(1);
      expect(component.find(Messages.SendImage)).toHaveLength(1);
      expect(component.find(Messages.ReceiveText)).toHaveLength(1);
      expect(component.find(Messages.ReceiveImage)).toHaveLength(1);
    });

    describe("duplicated", () => {
      test("message ids", () => {
        const store = createStore();
        const Message = new BaseMessage({
          messageId: 1,
          senderId: userId,
          type: "Text",
        });
        const duplicated = new BaseMessage({
          messageId: 1,
          senderId: userId,
          type: "Text",
        });
        store.messages.push(Message, duplicated);
        const component = mountComponent(store);
        expect(component.find(".sendMessageArea")).toHaveLength(1);
        expect(component.find(Messages.SendText)).toHaveLength(1);
      });
      test.skip("duplicated ids but not match senderId", () => {
        const store = createStore();
        const Message = new BaseMessage({
          messageId: 1,
          senderId: userId,
          type: "Text",
        });
        const duplicated = new BaseMessage({
          messageId: 1,
          senderId: otherUserId,
          type: "Text",
        });
        store.messages.push(Message, duplicated);
        const component = mountComponent(store);
        expect(component.find(".sendMessageArea")).toHaveLength(2);
        expect(component.find(Messages.SendText)).toHaveLength(2);
      });
    });
  });

  describe("dependency messageBoardStyle", () => {
    test("SendText props", () => {
      const store = createStore();
      const SentTextMessage = new BaseMessage({
        messageId: 1,
        senderId: userId,
        type: "Text",
      });
      store.messages.push(SentTextMessage);
      store.messageBoardStyle = MessageBoardStyle;
      const component = mountComponent(store);
      const sendText = component.find(Messages.SendText);
      expect(sendText).toHaveLength(1);
      expect(sendText.props().balloon).toMatchObject(SendSpeechBalloonStyle);
      expect(sendText.props().profileIcon).toMatchObject(SendProfileIconStyle);
    });
    test("SendImage props", () => {
      const store = createStore();
      const SentImageMessage = new BaseMessage({
        messageId: 2,
        senderId: userId,
        type: "Image",
      });
      store.messages.push(SentImageMessage);
      store.messageBoardStyle = MessageBoardStyle;
      const component = mountComponent(store);
      const sendImage = component.find(Messages.SendImage);
      expect(sendImage).toHaveLength(1);
      expect(sendImage.props().profileIcon).toMatchObject(SendProfileIconStyle);
    });
    test("ReceiveText props", () => {
      const store = createStore();
      const ReceivedTextMessage = new BaseMessage({
        messageId: 3,
        senderId: otherUserId,
        type: "Text",
      });
      store.messages.push(ReceivedTextMessage);
      store.messageBoardStyle = MessageBoardStyle;
      const component = mountComponent(store);
      const receiveText = component.find(Messages.ReceiveText);
      expect(receiveText).toHaveLength(1);
      expect(receiveText.props().balloon).toMatchObject(
        ReceiveSpeechBalloonStyle
      );
      expect(receiveText.props().profileIcon).toMatchObject(
        ReceiveProfileIconStyle
      );
    });
    test("ReceiveImage props", () => {
      const store = createStore();
      const ReceivedImageMessage = new BaseMessage({
        messageId: 4,
        senderId: otherUserId,
        type: "Image",
      });
      store.messages.push(ReceivedImageMessage);
      store.messageBoardStyle = MessageBoardStyle;
      const component = mountComponent(store);
      const receiveImage = component.find(Messages.ReceiveImage);
      expect(receiveImage).toHaveLength(1);
      expect(receiveImage.props().profileIcon).toMatchObject(
        ReceiveProfileIconStyle
      );
    });
  });
});

describe("only Lesson4", () => {
  describe("types", () => {
    test("SubmitArea props", () => {
      const store = createStore();
      const component = mountComponent(store);
      const submitArea = component.find(SubmitArea);
      expect(submitArea).toHaveLength(1);
      expect(submitArea.props().types).toMatchObject(["Image"]);
    });
  });

  describe("undefined parameters", () => {
    describe("getPastMessages", () => {
      test("in lesson4 case", () => {
        const store = createStore();
        expect(store.getPastMessages).toBeUndefined();
        const component = mountComponent(store);
        expect(component.text()).not.toContain("もっと見る");
      });
      test("other lesson case", () => {
        const store = createStore();
        store.getPastMessages = () => [];
        const component = mountComponent(store);
        expect(component.text()).toContain("もっと見る");
      });
    });
  });
});
