import BlocklyJS from "blockly/javascript";
import _ from "lodash";
import { BlockInterface } from "common/BlocklyLesson/BlockInterface";

export const onSubmit: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#B99226",
        message0: "送信するボタンを押したとき",
        message1: "やること %1",
        args1: [
          {
            type: "input_statement",
            name: "DO",
            check: "send",
          },
        ],
      });
      this.setNextStatement(false);
      this.setDeletable(false);
    },
  },
  category: "button",
  generator: (block) => {
    const branch = BlocklyJS.statementToCode(block, "DO");
    const code = `onSubmit(async function() {
      const isReceive = false;
      ${branch}
      return (callback) => {
        callback();
      };
    });`;
    return code;
  },
  name: "onSubmit",
};

export const sendSuccess: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2C7FCC",
        message0: "%1 をサーバに送る",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: ["variable", "text"],
          },
        ],
        message1: "送信成功したらやること %1",
        args1: [
          {
            type: "input_statement",
            name: "DO",
            check: "send",
          },
        ],
      });
      this.setPreviousStatement(true, "send");
      this.setNextStatement(true, "send");
    },
  },
  category: "sendSuccess",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const branch = BlocklyJS.statementToCode(block, "DO");
    const code = `if (!isReceive) {
      send(${varName ? _.trim(varName) : null}, async function(){
        ${branch}
      });
    }`;
    return code;
  },
  name: "sendSuccess",
};

export const assignChatInput: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2BA554",
        message0: "入力エリアの内容を %1 に保存する",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: "variable",
          },
        ],
      });
      this.setPreviousStatement(true, "send");
      this.setNextStatement(true, "send");
    },
  },
  category: "variables",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const code = `if (!isReceive) { assignChatInput(${_.trim(varName)}); }`;
    return code;
  },
  name: "assignChatInput",
};
