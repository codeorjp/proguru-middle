import { DesignSchemaType } from "common/types/DesignSchemaType";

const Schema: DesignSchemaType = {
  ReceiveSpeechBalloon: {
    style: {
      font: {
        fontSize: "12px",
        textAlign: "left",
      },
      color: "#f01369",
      border: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#bec537",
      },
      borderRadius: "10px 10px 10px 10px",
      background: "#a9e4c6",
      padding: "10px 10px 10px 10px",
    },
  },
  ReceiveProfileIcon: {
    style: {
      imgSize: {
        width: "100px",
        height: "100px",
      },
      border: {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#57c229",
      },
      borderRadius: "10px 10px 10px 10px",
      background: "#d3145d",
    },
  },
  SendProfileIcon: {
    style: {
      imgSize: {
        width: "100px",
        height: "100px",
      },
      border: {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#837bad",
      },
      borderRadius: "10px 10px 10px 10px",
      background: "#77ccf8",
    },
  },
  SendSpeechBalloon: {
    style: {
      font: {
        fontSize: "12px",
        textAlign: "center",
      },
      color: "#20b2ff",
      border: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#4b2edf",
      },
      background: "#d0c8e7",
      borderRadius: "10px 10px 10px 10px",
      padding: "10px 10px 10px 10px",
    },
  },
  ChatInput: {
    style: {
      font: {
        fontSize: "10px",
        textAlign: "center",
      },
      color: "#b4d1e7",
      border: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#b626b6",
      },
      borderRadius: "10px 10px 10px 10px",
      background: "#2eee8d",
      padding: "10px 10px 10px 10px",
    },
  },
  SubmitButton: {
    style: {
      font: {
        fontSize: "10px",
        textAlign: "right",
      },
      color: "#89c2e9",
      border: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#19056d",
      },
      borderRadius: "10px 10px 10px 10px",
      background: "#1d7046",
      padding: "10px 10px 10px 10px",
    },
  },
  ChatBody: {
    style: {
      background: "#e6cbcb",
      fontFamily: "Noto Serif JP",
    },
  },
};

// lesson1/common/Storeのコンストラクタにあるschema
export const DefaultSchema: DesignSchemaType = {
  SendSpeechBalloon: {
    style: {
      font: { fontSize: "16px", textAlign: "right" },
      color: "#000",
      border: {},
      background: "",
      borderRadius: "",
    },
  },
  SendProfileIcon: {
    style: {
      imgSize: {
        width: "200px",
        height: "200px",
      },
      border: {
        borderWidth: "1px",
      },
      borderRadius: "",
      background: "#fff",
    },
  },
  ReceiveSpeechBalloon: {
    style: {
      font: { fontSize: "16px", textAlign: "right" },
      color: "#000",
      border: {},
      borderRadius: "",
      background: "",
    },
  },
  ReceiveProfileIcon: {
    style: {
      imgSize: {
        width: "200px",
        height: "200px",
      },
      border: {
        borderWidth: "1px",
      },
      borderRadius: "",
      background: "#fff",
    },
  },
  ChatInput: {
    style: {
      font: { fontSize: "14px" },
      color: "#000",
      border: {},
      borderRadius: "",
      background: "#fff",
      padding: "",
    },
  },
  SubmitButton: {
    style: {
      font: { fontSize: "14px" },
      color: "#000",
      border: {},
      borderRadius: "",
      background: "#fff",
      padding: "",
    },
  },
  ChatBody: {
    style: {
      background: "#fff",
    },
  },
};

export default Schema;
