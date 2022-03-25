import React from "react";
import SendSpeechBalloon from "components/lesson1/common/components/playground/SendSpeechBalloon";
import SendProfileIcon from "components/lesson1/common/components/playground/SendProfileIcon";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import styles from "common/styles/StageIntroductionModal.scss";
import iconImage from "components/lesson1/statics/iconImage.png";

const defaultStyle = {
  imgSize: {
    width: "200px",
    height: "200px",
  },
  border: {},
  background: "#fff",
};
const sampleStyle = {
  fontSize: "16px",
  textAlign: "right",
  padding: "10px",
  borderRadius: "30px 0 30px 30px",
  color: "#fff",
  background: "#007FEB",
};
const sampleStyle2 = {
  width: "70px",
  height: "70px",
  background: "#fff",
  borderRadius: "100px",
  border: "1px solid #A5A5A5",
};

const StageSettings = {
  stageTask:
    "デザイン見本に合わせて，吹き出しの横の画像の大きさを縦横70px，枠線の太さを1pxにしよう。また，枠線の色を決めて，全ての角を35pxにして丸くしよう。",
  stageConfig: [
    {
      className: "SendProfileIcon",
      editDesignComponent: ["imgSize", "border", "borderRadius"],
    },
  ],
  presetColors: ["#A5A5A5"],
  children: (
    <>
      <div key={playGroundKey.userStyleArea} className="sendMessageArea">
        <SendSpeechBalloon isSample style={sampleStyle} />
        <SendProfileIcon defaultStyle={defaultStyle} />
      </div>
      <div key={playGroundKey.sampleStyleArea} className="sendMessageArea">
        <SendSpeechBalloon isSample style={sampleStyle} />
        <SendProfileIcon isSample style={sampleStyle2} />
      </div>
    </>
  ),
  checkPoint: [
    "画像の大きさは縦横70pxにできた？",
    "画像の全ての角を丸くできた？",
  ],
  description: (
    <>
      このステージではチャット画面のアイコン画像のデザインを編集するよ！
      <br />
      アイコン画像をクリックしてデザインを編集しよう！
      <div className={styles.imageWrapper}>
        <img src={iconImage} width="100%" alt="" />
      </div>
    </>
  ),
};

export default StageSettings;
