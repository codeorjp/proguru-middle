/* eslint-disable no-undef */
import _ from "lodash";
import Blockly from "blockly";
import * as B from "blockly/core";
import BlocklyJS from "blockly/javascript";
import Store from "components/lesson2/common/Store";
import Sandbox from "common/BlocklyLesson/utils/Sandbox";
import * as BlockFunctions from "components/lesson2/common/block-functions";
import StageSettings from "components/lesson2/StageSettings";
import { NodeEval, assignBlocks } from "./utils";

let cBlockly: any;
let store: any;
let interpreter: any;
let sandbox: any;
let workspace: Blockly.Workspace;

beforeEach(() => {
  // Storeのインスタンスを生成
  // constructorのaxios.get()でError検出する
  store = new Store(
    0, // userId
    "生徒1", // nickName
    null, // userIcon
    { number: 2 }, // lesson
    { number: 2 }, // stage
    null // submittedWorkspace
  );

  // Blockly
  cBlockly = _.clone(B);
  assignBlocks(
    cBlockly,
    BlocklyJS,
    StageSettings[store.stage.number].workspace.tools
  );
  assignBlocks(
    cBlockly,
    BlocklyJS,
    StageSettings[store.stage.number].workspace.unDeletableBlocks
  );
  workspace = new Blockly.Workspace();

  // Sandbox
  interpreter = new NodeEval();
  sandbox = new Sandbox(interpreter);
});

const correctOutput = [
  {
    type: "display",
    args: { text: "Hello" },
    blockId: "",
  },
  {
    type: "display",
    args: { text: "World" },
    blockId: "",
  },
  {
    type: "display",
    args: { text: "!" },
    blockId: "",
  },
];

describe("Lesson2 Stage2", () => {
  test("build blocks -> eval code", () => {
    const display1 = workspace.newBlock("display");
    const display2 = workspace.newBlock("display");
    const display3 = workspace.newBlock("display");
    const textHello = workspace.newBlock("textHello");
    const textWorld = workspace.newBlock("textWorld");
    const textExclamation = workspace.newBlock("textExclamation");

    display1.getInput("VARNAME").connection.connect(textHello.outputConnection);
    display1.nextConnection.connect(display2.previousConnection);
    display2.getInput("VARNAME").connection.connect(textWorld.outputConnection);
    display2.nextConnection.connect(display3.previousConnection);
    display3
      .getInput("VARNAME")
      .connection.connect(textExclamation.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    const { commands } = store.AnimationStore;
    commands.forEach((_command, index) => {
      commands[index].blockId = "";
    });

    expect(commands).toStrictEqual(correctOutput);
  });
});
