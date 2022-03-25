import React from "react";
import { ReceiveText } from "common/BlocklyLesson/components/Message";
import { MessageType } from "common/BlocklyLesson/components/message_board/messages/MessageType";
import BaseStyles from "common/BlocklyLesson/styles/MessageBoard.scss";

interface ReceivedTextMessageProps {
  isShow: boolean;
  hasStudentsDesign: boolean;
  message: MessageType;
  styles: any;
}

const ReceivedTextMessage: React.FC<ReceivedTextMessageProps> = ({
  isShow,
  hasStudentsDesign,
  styles,
  message,
}) => {
  if (!isShow) return null;

  return (
    <div key={message.messageId} className={BaseStyles.receiveMessage}>
      <ReceiveText
        {...message}
        balloon={hasStudentsDesign ? styles.ReceiveSpeechBalloon : null}
        profileIcon={hasStudentsDesign ? styles.ReceiveProfileIcon : null}
      />
    </div>
  );
};

export default ReceivedTextMessage;
