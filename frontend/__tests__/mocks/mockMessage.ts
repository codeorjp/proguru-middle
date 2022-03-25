/* eslint-disable */
import moment from "moment";

const userId = 0;
const otherUserId = 100;

export default class BaseMessage {
  messageId = 1;
  senderId = 0;
  senderType: "Student" = "Student";
  userName = "hogehoge";
  userNumber = 1;
  icon = "iconurl";
  content = "test";
  createdAt = moment();
  type: "Text" = "Text";
  constructor(params) {
    this.messageId = params.messageId;
    this.senderId = params.senderId;
    this.type = params.type;
  }
}

// data sample
const SentTextMessage = {
  messageId: 1,
  senderId: userId,
  senderType: "Student",
  userName: "hogehoge",
  userNumber: 1,
  icon: "iconurl",
  content: "test",
  createdAt: moment(),
  type: "Text",
};

// data sample
const SentImageMessage = {
  messageId: 2,
  senderId: userId,
  senderType: "Student",
  userName: "hogehoge",
  userNumber: 1,
  icon: "iconurl",
  content: "test",
  createdAt: moment(),
  type: "Image",
};

// data sample
const ReceivedTextMessage = {
  messageId: 3,
  senderId: otherUserId,
  senderType: "Student",
  userName: "hogehoge",
  userNumber: 1,
  icon: "iconurl",
  content: "test",
  createdAt: moment(),
  type: "Text",
};

// data sample
const ReceivedImageMessage = {
  messageId: 4,
  senderId: otherUserId,
  senderType: "Student",
  userName: "hogehoge",
  userNumber: 1,
  icon: "iconurl",
  content: "test",
  createdAt: moment(),
  type: "Image",
};
