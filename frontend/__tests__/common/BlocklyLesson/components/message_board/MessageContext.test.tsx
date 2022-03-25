/* eslint-disable no-undef */
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MessageContext from "common/BlocklyLesson/components/message_board/MessageContext";
import SentTextMessage from "common/BlocklyLesson/components/message_board/messages/SentTextMessage";
import ReceivedTextMessage from "common/BlocklyLesson/components/message_board/messages/ReceivedTextMessage";
import SentImageMessage from "common/BlocklyLesson/components/message_board/messages/SentImageMessage";
import ReceivedImageMessage from "common/BlocklyLesson/components/message_board/messages/ReceivedImageMessage";
import * as styles from "../../../../mocks/mockMessageBoardStyle";
import BaseMessage from "../../../../mocks/mockMessage";

configure({ adapter: new Adapter() });

describe("render Message Component conditions", () => {
  const Message = new BaseMessage({
    messageId: 1,
    senderId: 1,
    type: "Text",
  });

  const mountMessageContext = (cond) =>
    mount(
      <MessageContext
        isText={cond.isText}
        isSent={cond.isSent}
        hasStudentsDesign={false}
        key={1}
        message={Message}
        styles={styles}
      />
    );

  test("condition for SentTextMessage", () => {
    const cond = {
      isText: true,
      isSent: true,
    };
    const component = mountMessageContext(cond);
    expect(component).toHaveLength(1);
    expect(component.find(SentTextMessage)).toHaveLength(1);
  });

  test("condition for ReceivedTextMessage", () => {
    const cond = {
      isText: true,
      isSent: false,
    };
    const component = mountMessageContext(cond);
    expect(component).toHaveLength(1);
    expect(component.find(ReceivedTextMessage)).toHaveLength(1);
  });

  test("condition for SentImageMessage", () => {
    const cond = {
      isText: false,
      isSent: true,
    };
    const component = mountMessageContext(cond);
    expect(component).toHaveLength(1);
    expect(component.find(SentImageMessage)).toHaveLength(1);
  });

  test("condition for ReceivedImageMessage", () => {
    const cond = {
      isText: false,
      isSent: false,
    };
    const component = mountMessageContext(cond);
    expect(component).toHaveLength(1);
    expect(component.find(ReceivedImageMessage)).toHaveLength(1);
  });
});
