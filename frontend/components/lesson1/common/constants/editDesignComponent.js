import ReceiveTextField from "components/lesson1/common/components/workspace/ReceiveTextField";
import SendTextField from "components/lesson1/common/components/workspace/SendTextField";
import Font from "components/lesson1/common/components/workspace/Font";
import Color from "components/lesson1/common/components/workspace/Color";
import Padding from "components/lesson1/common/components/workspace/Padding";
import Border from "components/lesson1/common/components/workspace/Border";
import BorderRadius from "components/lesson1/common/components/workspace/BorderRadius";
import Size from "components/lesson1/common/components/workspace/Size";
import FontFamily from "components/lesson1/common/components/workspace/FontFamily";

export const editDesignComponent = {
  sendText: {
    title: "送信側テキスト",
    component: SendTextField,
    iconName: "bi-chat-dots-fill",
  },
  receiveText: {
    title: "受信側テキスト",
    component: ReceiveTextField,
    iconName: "bi-chat-dots-fill",
  },
  font: { title: "文字", component: Font, iconName: "bi-fonts" },
  color: { title: "文字色", component: Color, iconName: "bi-palette-fill" },
  padding: {
    title: "余白",
    component: Padding,
    iconName: "bi-aspect-ratio-fill",
  },
  border: { title: "枠線", component: Border, iconName: "bi-border-width" },
  background: {
    title: "背景色",
    component: Color,
    iconName: "bi-palette-fill",
  },
  imgSize: { title: "画像サイズ", component: Size, iconName: "bi-image" },
  borderRadius: {
    title: "角丸",
    component: BorderRadius,
    iconName: "bi-fullscreen",
  },
  fontFamily: {
    title: "フォント",
    component: FontFamily,
    iconName: "bi-fonts",
  },
};

export default editDesignComponent;
