import React from "react";
import { ReceiveImage } from "common/BlocklyLesson/components/Message";
import { MessageType } from "common/BlocklyLesson/components/message_board/messages/MessageType";
import BaseStyles from "common/BlocklyLesson/styles/MessageBoard.scss";

interface ReceivedImageMessageProps {
  isShow: boolean;
  hasStudentsDesign: boolean;
  message: MessageType;
  styles: any;
}

const ReceivedImageMessage: React.FC<ReceivedImageMessageProps> = ({
  isShow,
  hasStudentsDesign,
  styles,
  message,
}) => {
  if (!isShow) return null;

  return (
    <div key={message.messageId} className={BaseStyles.receiveMessage}>
      <ReceiveImage
        {...message}
        profileIcon={hasStudentsDesign ? styles.ReceiveProfileIcon : null}
      />
    </div>
  );
};

export default ReceivedImageMessage;
