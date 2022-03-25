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
    { number: 4 }, // stage
    null // submittedWorkspace
  );
  store.AnimationStore.commands = [];

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

const connectSuccess = [
  {
    type: "connect",
    args: { before: "サーバと接続中..." },
    blockId: "",
  },
  {
    type: "connectSuccess",
    args: { before: "接続成功しました！" },
    blockId: "",
  },
];

const connectFailed = [
  {
    type: "connect",
    args: { before: "サーバと接続中..." },
    blockId: "",
  },
  {
    type: "connectError",
    args: { before: "接続が失敗しました..." },
    blockId: "",
  },
];

describe("Lesson2 Stage4", () => {
  test("Success: build blocks -> eval code", () => {
    const onExecute = workspace.newBlock("onExecute");
    const connect = workspace.newBlock("connect");
    const server = workspace.newBlock("serverDropdown");

    onExecute.getInput("DO").connection.connect(connect.previousConnection);
    connect.getInput("VARNAME").connection.connect(server.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    const { commands } = store.AnimationStore;
    commands.forEach((_command, index) => {
      commands[index].blockId = "";
    });

    expect(commands).toStrictEqual(connectSuccess);
  });

  test("Failed: build blocks -> eval code", () => {
    const onExecute = workspace.newBlock("onExecute");
    const connect = workspace.newBlock("connect");
    const server = workspace.newBlock("serverDropdown");

    onExecute.getInput("DO").connection.connect(connect.previousConnection);
    connect.getInput("VARNAME").connection.connect(server.outputConnection);
    server.setFieldValue("'serverB'", "VAR");

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    const { commands } = store.AnimationStore;
    commands.forEach((_command, index) => {
      commands[index].blockId = "";
    });

    expect(commands).toStrictEqual(connectFailed);
  });
});
