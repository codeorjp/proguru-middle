import React from "react";
import * as Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import { Provider } from "mobx-react";
import WebFont from "webfontloader";
import * as babel from "@babel/standalone";
import isMsBrowser from "common/BlocklyLesson/utils/isMsBrowser";
import IframeEval from "common/BlocklyLesson/utils/IframeEval";
import WindowEval from "common/BlocklyLesson/utils/WindowEval";
import Sandbox from "common/BlocklyLesson/utils/Sandbox";
import LessonCard from "common/components/LessonCard";
import MessageBoardWrap from "common/components/MessageBoardWrap";
import commonStyle from "common/styles/common.scss";
import {
  ifIncludeText,
  assignReceivedText,
  fetchServer,
  ifIncludeImage,
  assignReceivedImage,
} from "components/lesson5/stage2/blocks/ReceiveMessages";
import {
  onSubmit,
  assignChatInput,
  onClickSelectImage,
  showFileDialog,
  sendSuccess,
  assignSelectedImage,
} from "components/lesson5/stage2/blocks/SendMessages";
import {
  varImage,
  display,
  compression,
  resizeImage,
  imageSizeConditions,
  fixedAspectResize,
  ifIncludeAddress,
  ifIncludePhoneNumber,
  ifMatchKeyword,
  displayConfirmDialog,
  alert,
  textHello,
} from "components/lesson5/stage2/blocks/CommonToReceiveAndSend";
import MessageBoard from "common/BlocklyLesson/components/MessageBoard";
import * as BlockFunctions from "components/lesson5/stage2/block-functions";
import Store from "components/lesson5/stage2/Store";
import styles from "../styles/Stage.scss";

const initTools = (tools) => {
  tools.forEach(({ name, block, generator }) => {
    Blockly.Blocks[name] = block;
    Blockly.JavaScript[name] = generator;
  });
};

export default class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.tools = [
      showFileDialog,
      ifIncludeText,
      ifIncludeImage,
      imageSizeConditions,
      sendSuccess,
      display,
      compression,
      resizeImage,
      assignReceivedText,
      assignReceivedImage,
      assignChatInput,
      assignSelectedImage,
      varImage,
      onSubmit,
      fetchServer,
      onClickSelectImage,
      fixedAspectResize,
      ifIncludeAddress,
      ifIncludePhoneNumber,
      ifMatchKeyword,
      displayConfirmDialog,
      alert,
      textHello,
    ];
    const {
      userId,
      nickName,
      studentNumber,
      userIcon,
      design,
      block,
      lesson,
      stage,
    } = props;
    this.store = new Store(
      userId,
      nickName,
      studentNumber,
      userIcon,
      lesson,
      stage,
      block ? block.body : null,
      "performance"
    );
    this.store.messageBoardStyle = design ? JSON.parse(design.body) : null;
    const interpreter = isMsBrowser() ? new WindowEval() : new IframeEval();
    this.sandbox = new Sandbox(interpreter);
  }

  componentDidMount() {
    const workspace = new Blockly.Workspace();
    initTools(this.tools);

    if (this.store.submittedWorkspace) {
      const xml = Blockly.Xml.textToDom(this.store.submittedWorkspace);
      Blockly.Xml.domToWorkspace(xml, workspace);
    }

    const code = BlocklyJS.workspaceToCode(workspace);
    const babelOptions = {
      presets: ["es2015", "es2016", "es2017"],
    };
    const compiled = babel.transform(code, babelOptions);

    this.sandbox.init(this.store, BlockFunctions, compiled.code);
    this.sandbox.eval();

    this.store.setIsExecute(true);

    const messageBoardStyle = this.store.messageBoardStyle;
    const submittedFontFamily = messageBoardStyle?.ChatBody.style.fontFamily;
    if (submittedFontFamily) {
      // fontFamilyが設定されているときだけ読み込むように
      WebFont.load({
        google: {
          families: [submittedFontFamily],
        },
      });
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className={commonStyle.lessonCommon}>
          <div className={styles.Stage}>
            <LessonCard noPadding>
              <MessageBoardWrap>
                <MessageBoard types={["Text", "Image"]} />
              </MessageBoardWrap>
            </LessonCard>
          </div>
        </div>
      </Provider>
    );
  }
}
