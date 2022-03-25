import React from "react";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";

const defaultStyle = {
  background: "#007FEB",
  color: "#fff",
  padding: "10px",
  font: { fontSize: "12px", textAlign: "right" },
};
const sampleStyle = {
  fontSize: "16px",
  textAlign: "left",
  color: "#fff",
  padding: "20px",
  background: "#007FEB",
};

const StageSettings = {
  stageTask:
    "デザイン見本に合わせて，吹き出しの文字の大きさを16px，配置を左揃えにしよう。また，吹き出しの中の余白の上下左右を20pxにしよう。",
  stageConfig: [
    {
      className: "SendSpeechBalloon",
      editDesignComponent: ["font", "padding", "sendText"],
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
  checkPoint: [
    "文字の大きさを16px，文字の配置を左揃えにできた？",
    "吹き出しの中の余白を全て20pxにできた？",
    "「送信側テキスト」にテキストを入力して文字数が多いと改行されるか確認しよう",
  ],
};

export default StageSettings;
