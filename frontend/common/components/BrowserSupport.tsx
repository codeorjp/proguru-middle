import React from "react";
import isSupportBrowser from "common/utils/isSupportBrowser";
import isSupportStorage from "common/utils/isSupportStorage";

const style = {
  color: "#FFF",
  width: "100%",
  backgroundColor: "#5CACEB",
  padding: "10px",
  fontSize: "12px",
};

const BrowserSupport: React.FC = () => {
  let text: string;
  if (isSupportBrowser && isSupportStorage) return null;

  if (!isSupportStorage) {
    text =
      "ブラウザのストレージ機能に制限がかかっているため、一部機能が利用できません。管理者に確認していただき設定を見直すか、最新版のChromeやMicrosoft Edgeの利用を推奨しています。";
  }
  if (!isSupportBrowser) {
    text =
      "当サービスは現在ご利用のブラウザには対応しておりません。プログル技術では最新版のChromeやMicrosoft Edge・Internet Explorer 11・Safariにてご利用ください。";
  }

  return <div style={style}>{text}</div>;
};

export default BrowserSupport;
