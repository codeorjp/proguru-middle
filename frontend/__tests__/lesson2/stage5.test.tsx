/* eslint-disable no-undef */
import _ from "lodash";
import axios from "axios";
import Blockly from "blockly";
import * as B from "blockly/core";
import BlocklyJS from "blockly/javascript";
import Store from "components/lesson2/common/Store";
import Sandbox from "common/BlocklyLesson/utils/Sandbox";
import * as BlockFunctions from "components/lesson2/common/block-functions";
import StageSettings from "components/lesson2/StageSettings";
import { NodeEval, assignBlocks } from "./utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let cBlockly: any;
let store: any;
let interpreter: any;
let sandbox: any;
let workspace: Blockly.Workspace;

beforeEach(() => {
  // axios
  mockedAxios.post.mockResolvedValue({ data: { reply: "応答の内容" } });

  // Storeのインスタンスを生成
  // constructorのaxios.get()でError検出する
  store = new Store(
    0, // userId
    "生徒1", // nickName
    null, // userIcon
    { number: 2 }, // lesson
    { number: 5 }, // stage
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

const correctOutput = [
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
  {
    type: "request",
    args: {
      before: "メッセージを送信中...",
      after: "送信に成功しました！",
    },
    blockId: "",
  },
];

describe("Lesson2 Stage5", () => {
  test("build blocks -> eval code", async () => {
    const onExecute = workspace.newBlock("onExecute");
    const connectSuccess = workspace.newBlock("connectSuccess");
    const server = workspace.newBlock("serverDropdown");
    const send = workspace.newBlock("send");
    const textHelloJa = workspace.newBlock("textHelloJa");

    onExecute
      .getInput("DO")
      .connection.connect(connectSuccess.previousConnection);
    connectSuccess
      .getInput("VARNAME")
      .connection.connect(server.outputConnection);
    connectSuccess.getInput("DO").connection.connect(send.previousConnection);
    send.getInput("VARNAME").connection.connect(textHelloJa.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    await sandbox.eval();

    const { commands } = store.AnimationStore;
    commands.forEach((_command, index) => {
      commands[index].blockId = "";
    });

    expect(commands).toStrictEqual(correctOutput);
  });
});
