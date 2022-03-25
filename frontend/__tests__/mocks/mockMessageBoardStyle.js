const MessageBoardStyle = {
  ChatBody: {
    style: {
      background: "#fff",
      fontFamily: "Kosugi Maru",
    },
  },
  ChatInput: {
    style: {
      background: "#fff",
      color: "#000",
      padding: "10px 10px 10px 10px",
      font: {
        fontSize: "14px",
        textAlign: "center",
      },
      border: {
        borderColor: "#c0b6fa",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      borderRadius: "10px 10px 10px 10px",
    },
  },
  ReceiveProfileIcon: {
    style: {
      background: "#fff",
      border: {
        borderColor: "#c0b6fa",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      borderRadius: "10px 10px 10px 10px",
      imgSize: {
        width: "200px",
        height: "200px",
      },
    },
  },
  ReceiveSpeechBalloon: {
    style: {
      background: "#fff",
      border: {
        borderColor: "#c0b6fa",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      borderRadius: "10px 10px 10px 10px",
      color: "#000",
      font: {
        fontSize: "14px",
        textAlign: "center",
      },
      padding: "10px 10px 10px 10px",
    },
  },
  SendProfileIcon: {
    style: {
      background: "#fff",
      border: {
        borderColor: "#c0b6fa",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      imgSize: {
        width: "200px",
        height: "200px",
      },
    },
  },
  SendSpeechBalloon: {
    style: {
      background: "#007FEB",
      border: {
        borderColor: "#c0b6fa",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      borderRadius: "10px 10px 10px 10px",
      color: "#000",
      font: {
        fontSize: "14px",
        textAlign: "center",
      },
      padding: "10px 10px 10px 10px",
    },
  },
  SubmitButton: {
    style: {
      background: "#007FEB",
      border: {
        borderColor: "#c0b6fa",
        borderStyle: "solid",
        borderWidth: "2px",
      },
      borderRadius: "10px 10px 10px 10px",
      color: "#000",
      font: {
        fontSize: "14px",
        textAlign: "center",
      },
      padding: "10px 10px 10px 10px",
    },
  },
};

const SendSpeechBalloonStyle = {
  background: MessageBoardStyle.SendSpeechBalloon.style.background,
  borderRadius: MessageBoardStyle.SendSpeechBalloon.style.borderRadius,
  color: MessageBoardStyle.SendSpeechBalloon.style.color,
  padding: MessageBoardStyle.SendSpeechBalloon.style.padding,
  borderColor: MessageBoardStyle.SendSpeechBalloon.style.border.borderColor,
  borderStyle: MessageBoardStyle.SendSpeechBalloon.style.border.borderStyle,
  borderWidth: MessageBoardStyle.SendSpeechBalloon.style.border.borderWidth,
  fontSize: MessageBoardStyle.SendSpeechBalloon.style.font.fontSize,
  textAlign: MessageBoardStyle.SendSpeechBalloon.style.font.textAlign,
};

const SendProfileIconStyle = {
  background: MessageBoardStyle.SendProfileIcon.style.background,
  borderColor: MessageBoardStyle.SendProfileIcon.style.border.borderColor,
  borderStyle: MessageBoardStyle.SendProfileIcon.style.border.borderStyle,
  borderWidth: MessageBoardStyle.SendProfileIcon.style.border.borderWidth,
  width: MessageBoardStyle.SendProfileIcon.style.imgSize.width,
  height: MessageBoardStyle.SendProfileIcon.style.imgSize.height,
};

const ReceiveSpeechBalloonStyle = {
  background: MessageBoardStyle.ReceiveSpeechBalloon.style.background,
  borderRadius: MessageBoardStyle.ReceiveSpeechBalloon.style.borderRadius,
  color: MessageBoardStyle.ReceiveSpeechBalloon.style.color,
  padding: MessageBoardStyle.ReceiveSpeechBalloon.style.padding,
  borderColor: MessageBoardStyle.ReceiveSpeechBalloon.style.border.borderColor,
  borderStyle: MessageBoardStyle.ReceiveSpeechBalloon.style.border.borderStyle,
  borderWidth: MessageBoardStyle.ReceiveSpeechBalloon.style.border.borderWidth,
  fontSize: MessageBoardStyle.ReceiveSpeechBalloon.style.font.fontSize,
  textAlign: MessageBoardStyle.ReceiveSpeechBalloon.style.font.textAlign,
};

const ReceiveProfileIconStyle = {
  background: MessageBoardStyle.ReceiveProfileIcon.style.background,
  borderColor: MessageBoardStyle.ReceiveProfileIcon.style.border.borderColor,
  borderStyle: MessageBoardStyle.ReceiveProfileIcon.style.border.borderStyle,
  borderWidth: MessageBoardStyle.ReceiveProfileIcon.style.border.borderWidth,
  width: MessageBoardStyle.ReceiveProfileIcon.style.imgSize.width,
  height: MessageBoardStyle.ReceiveProfileIcon.style.imgSize.height,
};

export default MessageBoardStyle;
export {
  SendSpeechBalloonStyle,
  SendProfileIconStyle,
  ReceiveSpeechBalloonStyle,
  ReceiveProfileIconStyle,
};
