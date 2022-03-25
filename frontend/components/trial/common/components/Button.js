import React from "react";
import { inject, observer } from "mobx-react";
import * as Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import * as babel from "@babel/standalone";
import isMsBrowser from "common/BlocklyLesson/utils/isMsBrowser";
import IframeEval from "common/BlocklyLesson/utils/IframeEval";
import WindowEval from "common/BlocklyLesson/utils/WindowEval";
import Sandbox from "common/BlocklyLesson/utils/Sandbox";
import styles from "common/BlocklyLesson/styles/WorkspaceBottomButton.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnExecute = this.handleOnExecute.bind(this);
    this.handleOnReset = this.handleOnReset.bind(this);
    this.props.store.setIsShowExecuteOverlay(true);
    const interpreter = isMsBrowser() ? new WindowEval() : new IframeEval();
    this.sandbox = new Sandbox(interpreter);
  }

  handleOnExecute() {
    const { store, blockFunctions, beforeExecute, afterExecute } = this.props;

    store.setIsExecute(true);
    this.overlayTimerId = setTimeout(() => {
      store.setIsShowExecuteOverlay(false);

      if (beforeExecute) {
        beforeExecute();
      }

      const workspace = Blockly.getMainWorkspace();
      store.saveWorkspace(workspace);

      const code = BlocklyJS.workspaceToCode(workspace);
      const babelOptions = {
        presets: ["es2015", "es2016", "es2017"],
      };
      const compiled = babel.transform(code, babelOptions);

      this.sandbox.init(store, blockFunctions, compiled.code);
      this.sandbox.eval();

      if (afterExecute) {
        afterExecute();
      }
    }, 800);
  }

  handleOnReset() {
    const { store } = this.props;
    this.sandbox.reset();
    store.reset();
    store.setIsShowExecuteOverlay(true);
  }

  render() {
    const { store, lessonId } = this.props;
    const LessonExecuteClass = styles[`lesson${lessonId}Execute`];
    const LessonResetClass = styles[`lesson${lessonId}Reset`];
    return (
      <div className={styles.buttonArea}>
        <button
          id="executeButton"
          className={`${styles.executionButton} ${styles.button} ${LessonExecuteClass}`}
          type="button"
          disabled={store.isExecute}
          onClick={this.handleOnExecute}
        >
          <span className={`bi bi-play-fill ${styles.icon}`} />
          <span>実行する</span>
        </button>
        <button
          className={`${styles.resetButton} ${styles.button} ${LessonResetClass}`}
          type="button"
          disabled={!store.isExecute}
          onClick={this.handleOnReset}
        >
          <span className={`bi bi-skip-start-fill ${styles.icon}`} />
          <span>リセット</span>
        </button>
      </div>
    );
  }
}

export default inject("store")(observer(Button));
