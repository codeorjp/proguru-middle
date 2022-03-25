type Font = {
  fontSize: string;
  textAlign?: string;
};
type Border = {
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
};
type ImgSize = {
  width: string;
  height: string;
};

export type DesignSchemaType = {
  SendSpeechBalloon: {
    style: {
      font: Font;
      border: Border;
      color: string;
      background: string;
      borderRadius: string;
      padding?: string;
    };
  };
  SendProfileIcon: {
    style: {
      imgSize: ImgSize;
      border: Border;
      borderRadius: string;
      background: string;
    };
  };
  ReceiveSpeechBalloon: {
    style: {
      font: Font;
      border: Border;
      color: string;
      borderRadius: string;
      background?: string;
      padding?: string;
    };
  };
  ReceiveProfileIcon: {
    style: {
      imgSize: ImgSize;
      border: Border;
      borderRadius: string;
      background: string;
    };
  };
  ChatInput: {
    style: {
      font: Font;
      border: Border;
      color: string;
      borderRadius: string;
      background: string;
      padding: string;
    };
  };
  ChatBody: {
    style: {
      background: string;
      fontFamily?: string;
    };
  };
  SubmitButton: {
    style: {
      font: Font;
      border: Border;
      color: string;
      borderRadius: string;
      background: string;
      padding: string;
    };
  };
};
