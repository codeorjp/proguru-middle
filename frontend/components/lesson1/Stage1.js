import React from "react";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import stageStyle from "components/lesson1/common/styles/Stage.scss";

const sampleStyle = {
  font: { fontSize: "16px", textAlign: "right" },
  color: "#fff",
  background: "#007FEB",
};

const StageSettings = {
  stageTask:
    "デザイン見本に合わせて，吹き出しの文字色を白色，背景色を青色に変えよう。",
  stageConfig: [
    {
      className: "SendSpeechBalloon",
      editDesignComponent: ["color", "background", "sendText"],
    },
  ],
  presetColors: ["#007aff", "#FFF"],
  children: (
    <>
      <div key={playGroundKey.userStyleArea}>
        <SendSpeechBalloon isDebug />
      </div>
      <div key={playGroundKey.sampleStyleArea}>
        <SendSpeechBalloon isSample style={sampleStyle} />
        <div className={stageStyle.sampleDetail}>
          <p className={stageStyle.sampleDetailTextTitle}>デザイン情報</p>
          <div className={stageStyle.sampleDetailText}>
            <p>背景色: #007aff</p>
            <p>文字色: #ffffff</p>
          </div>
        </div>
      </div>
    </>
  ),
  checkPoint: [
    "デザイン見本に合わせて吹き出しの文字色は白色にできた？",
    "デザイン見本に合わせて吹き出しの背景色は青色にできた？",
  ],
};

export default StageSettings;
