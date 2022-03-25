import _ from "lodash";
import React from "react";
import MessageContext from "common/BlocklyLesson/components/message_board/MessageContext";
import { MessageType } from "common/BlocklyLesson/components/message_board/messages/MessageType";

interface TimelineProps {
  userId: number;
  hasStudentsDesign: boolean;
  messages: MessageType[];
  styles: any;
}

const Timeline: React.FC<TimelineProps> = ({
  userId,
  messages,
  hasStudentsDesign,
  styles,
}) => {
  return _.map(messages, (message) => (
    <MessageContext
      key={message.messageId}
      isText={message.type === "Text"}
      isSent={message.senderId === userId && message.senderType === "Student"}
      message={message}
      hasStudentsDesign={hasStudentsDesign}
      styles={styles}
    />
  ));
};

export default Timeline;
