import React from "react";
import { SendText } from "common/BlocklyLesson/components/Message";
import { MessageType } from "common/BlocklyLesson/components/message_board/messages/MessageType";
import BaseStyles from "common/BlocklyLesson/styles/MessageBoard.scss";

interface SentTextMessageProps {
  isShow: boolean;
  hasStudentsDesign: boolean;
  message: MessageType;
  styles: any;
}

const SentTextMessage: React.FC<SentTextMessageProps> = ({
  isShow,
  hasStudentsDesign,
  styles,
  message,
}) => {
  if (!isShow) return null;

  return (
    <div key={message.messageId} className={BaseStyles.sendMessage}>
      <SendText
        {...message}
        balloon={hasStudentsDesign ? styles.SendSpeechBalloon : null}
        profileIcon={hasStudentsDesign ? styles.SendProfileIcon : null}
      />
    </div>
  );
};

export default SentTextMessage;
