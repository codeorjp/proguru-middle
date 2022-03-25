import React from "react";
import SentTextMessage from "common/BlocklyLesson/components/message_board/messages/SentTextMessage";
import ReceivedTextMessage from "common/BlocklyLesson/components/message_board/messages/ReceivedTextMessage";
import SentImageMessage from "common/BlocklyLesson/components/message_board/messages/SentImageMessage";
import ReceivedImageMessage from "common/BlocklyLesson/components/message_board/messages/ReceivedImageMessage";
import { MessageType } from "common/BlocklyLesson/components/message_board/messages/MessageType";

interface MessageContextProps {
  isText: boolean;
  isSent: boolean;
  hasStudentsDesign: boolean;
  key: number;
  message: MessageType;
  styles: any;
}

const MessageContext: React.FC<MessageContextProps> = ({
  isText,
  isSent,
  hasStudentsDesign,
  styles,
  message,
}) => {
  return (
    <>
      <SentTextMessage
        isShow={isText && isSent}
        hasStudentsDesign={hasStudentsDesign}
        styles={styles}
        message={message}
      />
      <ReceivedTextMessage
        isShow={isText && !isSent}
        hasStudentsDesign={hasStudentsDesign}
        styles={styles}
        message={message}
      />
      <SentImageMessage
        isShow={!isText && isSent}
        hasStudentsDesign={hasStudentsDesign}
        styles={styles}
        message={message}
      />
      <ReceivedImageMessage
        isShow={!isText && !isSent}
        hasStudentsDesign={hasStudentsDesign}
        styles={styles}
        message={message}
      />
    </>
  );
};

export default MessageContext;
