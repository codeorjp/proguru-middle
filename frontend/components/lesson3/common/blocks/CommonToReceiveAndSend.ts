import BlocklyJS from "blockly/javascript";
import _ from "lodash";
import { BlockInterface } from "common/BlocklyLesson/BlockInterface";

export const varText: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        message0: "変数 %1",
        args0: [
          {
            type: "field_dropdown",
            name: "VAR",
            options: [
              ["送信テキスト", "'sendText'"],
              ["受信テキスト", "'receivedText'"],
            ],
          },
        ],
        colour: "#984883",
      });
      this.setOutput(true, "variable");
    },
  },
  category: "variables",
  generator: (block) => {
    const varName = block.getFieldValue("VAR");
    return `${varName}`;
  },
  name: "varText",
};

export const display: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2BA554",
        message0: "%1 を画面に表示する",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: ["variable", "text"],
          },
        ],
      });
      this.setPreviousStatement(true, ["send", "receive"]);
      this.setNextStatement(true, ["send", "receive"]);
    },
  },
  category: "display",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const code = `display(${_.trim(varName)});`;
    return code;
  },
  name: "display",
};

const textBlock = ({ defaultText, name }): BlockInterface => ({
  block: {
    init() {
      this.jsonInit({
        colour: "#984883",
        message0: "文字 %1",
        args0: [
          {
            type: "field_input",
            name: "TEXT",
            text: defaultText,
          },
        ],
      });
      this.setOutput(true, "text");
    },
  },
  category: "text",
  generator: (block) => {
    const text = block.getFieldValue("TEXT");
    return `assignText('${escape(text)}')`;
  },
  name,
});

export const textHello = textBlock({
  defaultText: "こんにちは",
  name: "textHello",
});
