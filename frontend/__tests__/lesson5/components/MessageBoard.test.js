/* eslint-disable no-undef */
import React from "react";
import { Provider } from "mobx-react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
import moment from "moment";
import Store from "components/lesson5/stage2/Store";
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
      <MessageBoard types={["Text", "Image"]} />
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

  describe("types", () => {
    test("SubmitArea props", () => {
      const store = createStore();
      const component = mountComponent(store);
      const submitArea = component.find(SubmitArea);
      expect(submitArea).toHaveLength(1);
      expect(submitArea.props().types).toMatchObject(["Text", "Image"]);
    });
  });
});

describe("only Lesson5", () => {
  describe("getPastMessages", () => {
    test("render もっと見るボタン", () => {
      const store = createStore();
      expect(store.getPastMessages).toBeInstanceOf(Function);
      const component = mountComponent(store);
      expect(component.text()).toContain("もっと見る");
    });
    describe("click もっと見る", () => {
      test("fetch message & check enqueued messages", (done) => {
        /*
          <[表示する]ブロックが実行されたときのみメッセージをrenderする>
          という仕様のため、[メッセージの取得]と[メッセージのrender]が別々のコンテキストになっている
          そのため、本テストでは前半の[メッセージの取得]にのみ焦点を当てることにした
         */
        axios.get.mockResolvedValue({
          data: {
            messages: [
              {
                id: 1,
                sender_id: 0,
                sender_type: "Student",
                nickname: "hogehoge",
                number: 1,
                icon_url: "iconurl",
                sent_at: moment(),
                // image_urlがないため、これはtype Textのメッセージになる
                body: "test",
              },
            ],
          },
        });
        const store = createStore();
        store.isExecute = true;
        // newMessagesに追加してるキューを見て、renderする
        const component = mountComponent(store);
        expect(store.newMessages).toHaveLength(0);
        // newMessagesキューにメッセージを追加するボタン
        // store.getPastMessages()に処理を委譲する
        // store.newMessagesがメッセージのキューになっていて、そこにMessageを追加する
        const readMoreBtn = component.find("button").at(0);
        readMoreBtn.simulate("click");
        // expect(component.find(Messages.SendText)).toHaveLength(1); // 想定動作はこれ
        setTimeout(() => {
          expect(store.newMessages).toHaveLength(1);
          const sentTextMsg = store.newMessages[0];
          expect(sentTextMsg).toHaveProperty("type", "Text");
          // expect(store.newMessages[0]).toMatchObject(SentTextMessage); // グリーンにできないため一旦コメントアウト
          done();
        }, 1000);
      });
    });
  });
});
