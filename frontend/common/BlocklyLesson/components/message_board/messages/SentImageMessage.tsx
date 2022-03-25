import React from "react";
import { SendImage } from "common/BlocklyLesson/components/Message";
import { MessageType } from "common/BlocklyLesson/components/message_board/messages/MessageType";
import BaseStyles from "common/BlocklyLesson/styles/MessageBoard.scss";

interface SentImageMessageProps {
  isShow: boolean;
  hasStudentsDesign: boolean;
  message: MessageType;
  styles: any;
}

const SentImageMessage: React.FC<SentImageMessageProps> = ({
  isShow,
  hasStudentsDesign,
  styles,
  message,
}) => {
  if (!isShow) return null;

  return (
    <div key={message.messageId} className={BaseStyles.sendMessage}>
      <SendImage
        {...message}
        profileIcon={hasStudentsDesign ? styles.SendProfileIcon : null}
      />
    </div>
  );
};

export default SentImageMessage;
