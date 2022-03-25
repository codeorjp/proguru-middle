import moment from "moment";

export type MessageType = {
  messageId: number | string;
  senderId: number;
  senderType: "Student" | "Teacher";
  userName: string;
  userNumber: number;
  content: string;
  type: "Text" | "Image";
  icon: string;
  createdAt: moment.Moment;
  children?: any;
};
