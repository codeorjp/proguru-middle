import _ from "lodash";
import BlocklyJS from "blockly/javascript";
import { BlockInterface } from "common/BlocklyLesson/BlockInterface";

export const fetchServer: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#119396",
        message0: "サーバから",
        message1: "新着メッセージを受信する",
        message2: "受信に成功したら",
        message3: "やること %1",
        args3: [
          {
            type: "input_statement",
            name: "DO",
            check: "receive",
          },
        ],
      });
      this.setNextStatement(false, "receive");
      this.setDeletable(false, "receive");
    },
  },
  category: "connect",
  generator: (block) => {
    const branch = BlocklyJS.statementToCode(block, "DO");
    const code = `fetchServer(function() {
      const isReceive = true;
      ${branch}
    });`;
    return code;
  },
  name: "fetchServer",
};

export const ifIncludeText: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#3C6785",
        message0: "もし新着メッセージに",
        message1: "テキストが含まれていたら",
        message2: "やること %1",
        args2: [
          {
            type: "input_statement",
            name: "DO",
            check: "receive",
          },
        ],
      });
      this.setPreviousStatement(true, "receive");
      this.setNextStatement(true, "receive");
    },
  },
  category: "statement",
  generator: (block) => {
    const branch = BlocklyJS.statementToCode(block, "DO");
    const code = `if (isReceive) {
      if (isIncludeText()) {
        ${branch}
      }
    }`;
    return code;
  },
  name: "ifIncludeText",
};

export const assignReceivedText: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2BA554",
        message0: "新着メッセージのテキストを %1 に保存する",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: "variable",
          },
        ],
      });
      this.setPreviousStatement(true, "receive");
      this.setNextStatement(true, "receive");
    },
  },
  category: "assign",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const code = `if (isReceive) { assignReceivedText(${_.trim(varName)}); }`;
    return code;
  },
  name: "assignReceivedText",
};
