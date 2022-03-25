import React from "react";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";

const defaultStyle = {
  textAlign: "left",
  background: "#007FEB",
  padding: "20px",
  color: "#fff",
  font: { fontSize: "16px", textAlign: "right" },
  border: {},
  borderRadius: {},
};
const sampleStyle = {
  fontSize: "16px",
  textAlign: "left",
  color: "#fff",
  padding: "20px",
  background: "#007FEB",
  borderRadius: "100px 0px 100px 100px",
};

const StageSettings = {
  stageTask:
    "デザイン見本に合わせて，自分の発言ということが分かるように，右上以外の角を50pxにしよう。",
  stageConfig: [
    {
      className: "SendSpeechBalloon",
      editDesignComponent: ["borderRadius", "sendText"],
    },
  ],
  children: (
    <>
      <div key={playGroundKey.userStyleArea}>
        <SendSpeechBalloon defaultStyle={defaultStyle} isDebug />
      </div>
      <div key={playGroundKey.sampleStyleArea}>
        <SendSpeechBalloon isSample style={sampleStyle} />
      </div>
    </>
  ),
  checkPoint: ["吹き出しの右上以外の角を丸くできた？"],
};

export default StageSettings;
