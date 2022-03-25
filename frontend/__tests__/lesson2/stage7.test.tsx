/* eslint-disable no-undef */
import _ from "lodash";
import axios from "axios";
import moment from "moment";
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
  // Storeのインスタンスを生成
  // constructorのaxios.get()でError検出する
  store = new Store(
    0, // userId
    "生徒1", // nickName
    null, // userIcon
    { number: 2 }, // lesson
    { number: 7 }, // stage
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

interface IcorrectOutput {
  type: string;
  args: {
    before?: string;
    after?: string;
    text?: string;
  } | null;
  blockId: "";
}

const correctOutput: IcorrectOutput[] = [
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
    type: "skip",
    args: null,
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
  {
    type: "response",
    args: {
      before: "サーバからの応答を待ってます...",
      after: "応答を受け取りました！",
    },
    blockId: "",
  },
];

describe("Lesson2 Stage7", () => {
  test("Morning: build blocks -> eval code", async () => {
    // moment, axios
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 1, 2, 0)).valueOf());
    const reply = moment().format("a") === "am" ? "おはよう！" : "こんにちは！";
    mockedAxios.post.mockResolvedValue({ data: { reply } });

    const onExecute = workspace.newBlock("onExecute");
    const connectSuccess = workspace.newBlock("connectSuccess");
    const server = workspace.newBlock("serverDropdown");
    const ifMorningOrAfternoon = workspace.newBlock("ifMorningOrAfternoon");
    const send1 = workspace.newBlock("send");
    const send2 = workspace.newBlock("send");
    const textGoodMorning = workspace.newBlock("textGoodMorning");
    const textHelloJa = workspace.newBlock("textHelloJa");
    const receiveResponse = workspace.newBlock("receiveResponse");
    const display = workspace.newBlock("display");
    const responseText = workspace.newBlock("responseText");

    onExecute
      .getInput("DO")
      .connection.connect(connectSuccess.previousConnection);
    connectSuccess
      .getInput("VARNAME")
      .connection.connect(server.outputConnection);
    connectSuccess
      .getInput("DO")
      .connection.connect(ifMorningOrAfternoon.previousConnection);
    ifMorningOrAfternoon
      .getInput("DO_IF")
      .connection.connect(send1.previousConnection);
    ifMorningOrAfternoon
      .getInput("DO_ELSE")
      .connection.connect(send2.previousConnection);
    send1
      .getInput("VARNAME")
      .connection.connect(textGoodMorning.outputConnection);
    send2.getInput("VARNAME").connection.connect(textHelloJa.outputConnection);
    ifMorningOrAfternoon.nextConnection.connect(
      receiveResponse.previousConnection
    );
    receiveResponse
      .getInput("DO")
      .connection.connect(display.previousConnection);
    display
      .getInput("VARNAME")
      .connection.connect(responseText.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    await sandbox.eval();

    const { commands } = store.AnimationStore;
    commands.forEach((_command, index) => {
      commands[index].blockId = "";
    });

    const expectOutput = _.clone(correctOutput);
    expectOutput.push({
      type: "display",
      args: {
        text: "おはよう！",
      },
      blockId: "",
    });
    expect(commands).toStrictEqual(expectOutput);
  });

  test("Afternoon: build blocks -> eval code", async () => {
    // moment, axios
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 1, 2, 12)).valueOf());
    const reply = moment().format("a") === "am" ? "おはよう！" : "こんにちは！";
    mockedAxios.post.mockResolvedValue({ data: { reply } });

    const onExecute = workspace.newBlock("onExecute");
    const connectSuccess = workspace.newBlock("connectSuccess");
    const server = workspace.newBlock("serverDropdown");
    const ifMorningOrAfternoon = workspace.newBlock("ifMorningOrAfternoon");
    const send1 = workspace.newBlock("send");
    const send2 = workspace.newBlock("send");
    const textGoodMorning = workspace.newBlock("textGoodMorning");
    const textHelloJa = workspace.newBlock("textHelloJa");
    const receiveResponse = workspace.newBlock("receiveResponse");
    const display = workspace.newBlock("display");
    const responseText = workspace.newBlock("responseText");

    onExecute
      .getInput("DO")
      .connection.connect(connectSuccess.previousConnection);
    connectSuccess
      .getInput("VARNAME")
      .connection.connect(server.outputConnection);
    connectSuccess
      .getInput("DO")
      .connection.connect(ifMorningOrAfternoon.previousConnection);
    ifMorningOrAfternoon
      .getInput("DO_IF")
      .connection.connect(send1.previousConnection);
    ifMorningOrAfternoon
      .getInput("DO_ELSE")
      .connection.connect(send2.previousConnection);
    send1
      .getInput("VARNAME")
      .connection.connect(textGoodMorning.outputConnection);
    send2.getInput("VARNAME").connection.connect(textHelloJa.outputConnection);
    ifMorningOrAfternoon.nextConnection.connect(
      receiveResponse.previousConnection
    );
    receiveResponse
      .getInput("DO")
      .connection.connect(display.previousConnection);
    display
      .getInput("VARNAME")
      .connection.connect(responseText.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    await sandbox.eval();

    const { commands } = store.AnimationStore;
    commands.forEach((_command, index) => {
      commands[index].blockId = "";
    });

    const expectOutput = _.clone(correctOutput);
    expectOutput.push({
      type: "display",
      args: {
        text: "こんにちは！",
      },
      blockId: "",
    });
    expect(commands).toStrictEqual(expectOutput);
  });
});
