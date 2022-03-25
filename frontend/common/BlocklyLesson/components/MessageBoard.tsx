import _ from "lodash";
import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import flattenObject from "common/utils/flattenObject";
import SubmitArea from "common/BlocklyLesson/components/SubmitArea";
import styles from "common/BlocklyLesson/styles/MessageBoard.scss";
import ReadmoreButton from "common/BlocklyLesson/components/message_board/ReadmoreButton";
import Timeline from "common/BlocklyLesson/components/message_board/Timeline";
import ExecuteOverlay from "common/BlocklyLesson/components/message_board/ExecuteOverlay";

interface MessageBoardProps {
  store?: any;
  types: string[];
}

class MessageBoard extends React.Component<MessageBoardProps> {
  styleNames = [
    "SendSpeechBalloon",
    "SendProfileIcon",
    "ReceiveSpeechBalloon",
    "ReceiveProfileIcon",
    "ChatInput",
    "SubmitButton",
    "ChatBody",
  ];
  styles: {
    [key: string]: object;
  };

  constructor(props) {
    super(props);
    this.styles = {};
    this.getPastMessages = this.getPastMessages.bind(this);
  }

  getPastMessages() {
    this.props.store.getPastMessages();
  }

  render() {
    const { types } = this.props;
    const {
      messages,
      messageBoardStyle,
      isExecute,
      getPastMessages,
      existPastMessage,
      isShowExecuteOverlay,
    } = this.props.store;

    if (messageBoardStyle) {
      // レッスンで提出済みのスタイルにここで上書きされる
      this.styleNames.forEach((styleName) => {
        this.styles[styleName] = flattenObject(
          toJS(messageBoardStyle)[styleName].style
        );
      });
    }

    const sortedUniqueMessages = _.sortBy(_.uniqBy(messages, "messageId"), [
      "createdAt",
    ]);
    const {
      messageboard,
      messageboardWindow,
      messageboardBody,
      messageboardBodyHeader,
      messageboardName,
      messageboardContents,
      messageboardBodyFooter,
      messageboardMoreButton,
    } = styles;

    return (
      <div>
        <div className={messageboard}>
          <div className={messageboardWindow}>
            <div
              className={messageboardBody}
              style={messageBoardStyle ? this.styles.ChatBody : null}
            >
              <div className={messageboardBodyHeader}>
                <div className={messageboardName}>
                  <p>クラスのチャット</p>
                </div>
              </div>
              <div className={`${messageboardContents} messageBoardContents`}>
                <ReadmoreButton
                  isShow={!!getPastMessages}
                  handleClick={this.getPastMessages}
                  className={messageboardMoreButton}
                  isExecute={isExecute}
                  hasPastMessage={existPastMessage}
                />
                <Timeline
                  messages={sortedUniqueMessages}
                  userId={this.props.store.userId}
                  hasStudentsDesign={!!messageBoardStyle}
                  styles={this.styles}
                />
              </div>
              <div className={messageboardBodyFooter}>
                <SubmitArea types={types} />
              </div>
            </div>
          </div>
          <ExecuteOverlay
            isShow={isShowExecuteOverlay}
            isExecute={isExecute}
            styles={styles}
          />
        </div>
      </div>
    );
  }
}

export default inject("store")(observer(MessageBoard));
