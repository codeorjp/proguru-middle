import React from "react";
import { inject, observer } from "mobx-react";
import WebFont from "webfontloader";
import { fontFamily } from "components/lesson1/common/constants/fontFamily";
import styles from "components/lesson1/common/styles/playground/chatBody.scss";
import BaseTouchComponent from "components/lesson1/common/components/playground/baseComponent/BaseTouchComponent";

class ChatBody extends BaseTouchComponent {
  constructor(props) {
    super(props);
    this.componentName = "ChatBody";
    this.componentTitle = "チャット画面全体";
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: fontFamily.map((elm) => elm.fontName),
      },
    });
  }

  render() {
    // ストアからスタイルを取得
    const editStyle = this.getEditStyle();

    return (
      <div className={styles.chatBody} style={editStyle}>
        {this.props.children}
      </div>
    );
  }
}

ChatBody.defaultProps = {
  onClick: () => {},
};

export default inject("store")(observer(ChatBody));
