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
    { number: 1 }, // stage
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
    args: { text: "Hello World!" },
    blockId: "",
  },
];

describe("Lesson2 Stage1", () => {
  test("build blocks -> eval code", () => {
    const display = workspace.newBlock("display");
    const textHelloWorld = workspace.newBlock("textHelloWorld");

    display
      .getInput("VARNAME")
      .connection.connect(textHelloWorld.outputConnection);

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
