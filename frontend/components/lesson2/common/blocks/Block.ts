import BlocklyJS from "blockly/javascript";
import _ from "lodash";
import { BlockInterface } from "common/BlocklyLesson/BlockInterface";

export const loop: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#119396",
        message0: "%1 回繰り返す",
        args0: [
          {
            type: "field_dropdown",
            name: "TIMES",
            options: [
              ["10", "10"],
              ["30", "30"],
              ["100", "100"],
            ],
          },
        ],
        message1: "やること %1",
        args1: [
          {
            type: "input_statement",
            name: "DO",
          },
        ],
      });
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
  },
  category: "loop",
  generator: (block) => {
    const branch = BlocklyJS.statementToCode(block, "DO");
    const times = block.getFieldValue("TIMES");
    const counter = _.uniqueId("counter_");
    const code = `
      for (var ${counter} = 1; ${counter} <= ${times}; ${counter}++) {
        highlightBlock("${block.id}");
        ${branch}
      }
    `;
    return code;
  },
  name: "loop",
};

export const display: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2BA554",
        message0: "%1 をコンピュータに表示する",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: ["text", "response"],
          },
        ],
      });
      this.setPreviousStatement(true, "display");
      this.setNextStatement(true, "display");
    },
  },
  category: "display",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const code = `display(${varName ? _.trim(varName) : null}, "${block.id}");`;
    return code;
  },
  name: "display",
};

export const onExecute: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#B99226",
        message0: "実行したとき",
        message1: "やること %1",
        args1: [
          {
            type: "input_statement",
            name: "DO",
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
    const code = `(async function() {
      ${branch}
    }());`;
    return code;
  },
  name: "onExecute",
};

export const connectSuccess: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#29B2C1",
        message0: "%1 に接続する",
        args0: [{ type: "input_value", name: "VARNAME", check: "server" }],
        message1: "接続できたらやること %1",
        args1: [
          {
            type: "input_statement",
            name: "DO",
          },
        ],
        message2: "接続を解除する",
      });
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
  },
  category: "connect",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const branch = BlocklyJS.statementToCode(block, "DO");
    const code = `await connect(${
      varName ? _.trim(varName) : null
    }, async function(){
      ${branch}
    }, "${block.id}");`;
    return code;
  },
  name: "connectSuccess",
};

export const connect: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#29B2C1",
        message0: "%1 に接続する",
        args0: [{ type: "input_value", name: "VARNAME", check: "server" }],
      });
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
  },
  category: "connect",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const code = `await connect(${
      varName ? _.trim(varName) : null
    }, function(){}, "${block.id}");`;
    return code;
  },
  name: "connect",
};

export const send: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2C7FCC",
        message0: "%1 をサーバに送る",
        args0: [{ type: "input_value", name: "VARNAME", check: "text" }],
      });
      this.setPreviousStatement(true, "send");
      this.setNextStatement(true, "send");
    },
  },
  category: "send",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const code = `await send(${varName ? _.trim(varName) : null}, "${
      block.id
    }");`;
    return code;
  },
  name: "send",
};

export const ifMorningOrAfternoon: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#3C6785",
        message0: "もし現在時刻が %1 なら",
        args0: [
          {
            type: "field_dropdown",
            name: "TEXT",
            options: [
              ["午前", "'am'"],
              ["午後", "'pm'"],
            ],
          },
        ],
        message1: "やること %1",
        args1: [
          {
            type: "input_statement",
            name: "DO_IF",
          },
        ],
        message2: "そうでなければ %1",
        args2: [
          {
            type: "input_statement",
            name: "DO_ELSE",
          },
        ],
      });
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
  },
  category: "statement",
  generator: (block) => {
    const text = block.getFieldValue("TEXT");
    const branchIf = BlocklyJS.statementToCode(block, "DO_IF");
    const branchElse = BlocklyJS.statementToCode(block, "DO_ELSE");
    const code = `highlightBlock("${block.id}");
    if (${text} === getMeridiem()) {
      ${branchIf}
    } else {
      ${branchElse}
    }`;
    return code;
  },
  name: "ifMorningOrAfternoon",
};

export const receiveResponse: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#119396",
        message0: "サーバから応答を受け取る",
        message1: "受け取りに成功したら",
        message2: "やること %1",
        args2: [
          {
            type: "input_statement",
            name: "DO",
            check: "display",
          },
        ],
      });
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
  },
  category: "connect",
  generator: (block) => {
    const branch = BlocklyJS.statementToCode(block, "DO");
    const code = `receiveResponse(async function() {
      ${branch}
    }, "${block.id}");`;
    return code;
  },
  name: "receiveResponse",
};

export const serverDropdown: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#984883",
        message0: "サーバ %1",
        args0: [
          {
            type: "field_dropdown",
            name: "VAR",
            options: [
              ["192.168.0.1", "'serverA'"],
              ["192.168.0.2", "'serverB'"],
            ],
          },
        ],
      });
      this.setOutput(true, "server");
    },
  },
  category: "server",
  generator: (block) => {
    const varName = block.getFieldValue("VAR");
    return `${varName}`;
  },
  name: "serverDropdown",
};

export const responseText: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#984883",
        message0: "応答の内容",
      });
      this.setOutput(true, "response");
    },
  },
  category: "text",
  generator: () => `'responseText'`,
  name: "responseText",
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

export const textHelloWorld = textBlock({
  defaultText: "Hello World!",
  name: "textHelloWorld",
});
export const textHello = textBlock({ defaultText: "Hello", name: "textHello" });
export const textWorld = textBlock({ defaultText: "World", name: "textWorld" });
export const textExclamation = textBlock({
  defaultText: "!",
  name: "textExclamation",
});
export const textHelloJa = textBlock({
  defaultText: "こんにちは",
  name: "textHelloJa",
});
export const textMyName = textBlock({
  defaultText: "日本太郎",
  name: "textMyName",
});
export const textGoodMorning = textBlock({
  defaultText: "おはよう",
  name: "textGoodMorning",
});
