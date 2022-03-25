import BlocklyJS from "blockly/javascript";
import _ from "lodash";
import { BlockInterface } from "common/BlocklyLesson/BlockInterface";

export const varImage: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        message0: "変数 %1",
        args0: [
          {
            type: "field_dropdown",
            name: "VAR",
            options: [
              ["送信画像", "'sendImage'"],
              ["受信画像", "'receivedImage'"],
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
  name: "varImage",
};

export const imageSizeConditions: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#3C6785",
        message0: "もし %1",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: ["variable", "image"],
          },
        ],
        message1: "の 幅が %1 px %2 %3",
        args1: [
          {
            type: "field_number",
            name: "WIDTH",
            value: 500,
            min: 1,
            precision: 1,
          },
          {
            type: "field_dropdown",
            name: "WIDTH_COND",
            options: [
              ["以上", ">="],
              ["以下", "<="],
            ],
          },
          {
            type: "field_dropdown",
            name: "COND",
            options: [
              ["かつ", "&&"],
              ["または", "||"],
            ],
          },
        ],
        message2: "高さが %1 px %2 なら",
        args2: [
          {
            type: "field_number",
            name: "HEIGHT",
            value: 500,
            min: 1,
            precision: 1,
          },
          {
            type: "field_dropdown",
            name: "HEIGHT_COND",
            options: [
              ["以上", ">="],
              ["以下", "<="],
            ],
          },
        ],
        message3: "やること %1",
        args3: [
          {
            type: "input_statement",
            name: "DO",
            check: ["send", "receive"],
          },
        ],
      });
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
  },
  category: "transform",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const width = block.getFieldValue("WIDTH");
    const widthCond = block.getFieldValue("WIDTH_COND");
    const cond = block.getFieldValue("COND");
    const height = block.getFieldValue("HEIGHT");
    const heightCond = block.getFieldValue("HEIGHT_COND");
    const branch = BlocklyJS.statementToCode(block, "DO");
    const code = `
    var width = await getImageWidth(${varName ? _.trim(varName) : null});
    var height = await getImageHeight(${varName ? _.trim(varName) : null});
    if (width ${widthCond} ${width} ${cond} height ${heightCond} ${height}) {
      ${branch}
    }`;
    return code;
  },
  name: "imageSizeConditions",
};

export const compression: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2BA554",
        message0: "%1 を画質 %2 ％に圧縮する",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: ["variable", "image"],
          },
          {
            type: "field_number",
            name: "RATE",
            value: 10,
            min: 1,
            max: 99,
            precision: 1,
          },
        ],
      });
      this.setPreviousStatement(true, ["send", "receive"]);
      this.setNextStatement(true, ["send", "receive"]);
    },
  },
  category: "transform",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const compressionRate = block.getFieldValue("RATE");
    return `await compression({ varName: ${
      varName ? _.trim(varName) : null
    }, compressionRate: ${compressionRate} });`;
  },
  name: "compression",
};

export const resizeImage: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2BA554",
        message0: "%1 を幅 %2 px, 高さ %3 pxにリサイズする",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: ["variable", "image"],
          },
          {
            type: "field_number",
            name: "WIDTH",
            value: 300,
            min: 1,
            precision: 1,
          },
          {
            type: "field_number",
            name: "HEIGHT",
            value: 300,
            min: 1,
            precision: 1,
          },
        ],
      });
      this.setPreviousStatement(true, ["send", "receive"]);
      this.setNextStatement(true, ["send", "receive"]);
    },
  },
  category: "transform",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const width = block.getFieldValue("WIDTH");
    const height = block.getFieldValue("HEIGHT");
    return `await resizeImage({ varName: ${
      varName ? _.trim(varName) : null
    }, width: ${width}, height: ${height} });`;
  },
  name: "resizeImage",
};

export const fixedAspectResize: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#2BA554",
        message0: "%1 の縦横比を固定したまま %2 を",
        args0: [
          {
            type: "input_value",
            name: "VARNAME",
            check: "variable",
          },
          {
            type: "field_dropdown",
            name: "HEIGHT_OR_WIDTH",
            options: [
              ["高さ", "1"],
              ["幅", "0"],
            ],
          },
        ],
        message1: "%1 pxにリサイズする",
        args1: [
          {
            type: "field_number",
            name: "SIZE",
            value: 300,
            min: 1,
            max: 1000,
            precision: 1,
          },
        ],
      });
      this.setPreviousStatement(true, ["send", "receive"]);
      this.setNextStatement(true, ["send", "receive"]);
    },
  },
  category: "transform",
  generator: (block) => {
    const varName = BlocklyJS.statementToCode(block, "VARNAME");
    const isHeight = block.getFieldValue("HEIGHT_OR_WIDTH");
    const size = block.getFieldValue("SIZE");
    return `await fixedAspectResize({
      varName: ${varName ? _.trim(varName) : null},
      isHeight: ${isHeight},
      size: ${size},
    });`;
  },
  name: "fixedAspectResize",
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
            check: ["variable", "image"],
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
            check: ["send", "receive"],
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
      const isReceive = false;
      ${branch}
    }());`;
    return code;
  },
  name: "onExecute",
};

export const sampleImage: BlockInterface = {
  block: {
    init() {
      this.jsonInit({
        colour: "#984883",
        message0: "サンプル画像 %1",
        args0: [
          {
            type: "field_dropdown",
            name: "NUMBER",
            options: [
              ["1 (600px x 600px)", "1"],
              ["2 (400px x 436px)", "2"],
              ["3 (600px x 800px)", "3"],
              ["4 (600px x 450px)", "4"],
              ["5 (500px x 667px)", "5"],
              ["6 (600px x 400px)", "6"],
              ["7 (500px x 375px)", "7"],
              ["8 (200px x 300px)", "8"],
              ["9 (300px x 200px)", "9"],
              ["10 (400px x 300px)", "10"],
            ],
          },
        ],
      });
      this.setOutput(true, "variable");
    },
  },
  category: "image",
  generator: (block) => {
    const imageNumber = block.getFieldValue("NUMBER");
    return `'sampleImage${imageNumber}'`;
  },
  name: "sampleImage",
};
