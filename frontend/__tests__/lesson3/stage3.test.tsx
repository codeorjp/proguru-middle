/* eslint-disable no-undef */
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import React from "react";
import Blockly from "blockly";
import * as B from "blockly/core";
import BlocklyJS from "blockly/javascript";
import { Provider } from "mobx-react";
import renderer from "react-test-renderer";
import Store from "components/lesson3/common/Store";
import Sandbox from "common/BlocklyLesson/utils/Sandbox";
import MessageBoard from "common/BlocklyLesson/components/MessageBoard";
import * as BlockFunctions from "components/lesson3/common/block-functions";
import StageSettings from "components/lesson3/StageSettings";
import { NodeEval, assignBlocks } from "./utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let cBlockly: any;
let store: any;
let interpreter: any;
let sandbox: any;
let workspace: Blockly.Workspace;
let component: any;

beforeEach(() => {
  // axios
  mockedAxios.get.mockResolvedValue({ data: {} });
  mockedAxios.post.mockResolvedValue({
    data: { id: _.uniqueId(), created_at: null },
  });

  // Storeのインスタンスを生成
  // constructorのaxios.get()でError検出する
  store = new Store(
    0, // userId
    "生徒1", // nickName
    0, // studnetNumber
    null, // userIcon
    { number: 3 }, // lesson
    { number: 3 }, // stage
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

  // Component
  component = renderer.create(
    <Provider store={store}>
      <MessageBoard types={["Text"]} />
    </Provider>
  );
});

const editCreatedAt = () => {
  const { messages } = store;
  messages.forEach((_message: object, index: number) => {
    messages[index].createdAt = moment("20200202", "YYYYMMDD");
  });
};

describe("Lesson3 Stage3", () => {
  test("build blocks -> eval code -> input text -> submit -> display content", async () => {
    const onSubmit = workspace.newBlock("onSubmit");
    const sendSuccess = workspace.newBlock("sendSuccess");
    const display = workspace.newBlock("display");
    const assignChatInput = workspace.newBlock("assignChatInput");
    const varText1 = workspace.newBlock("varText");
    const varText2 = workspace.newBlock("varText");
    const varText3 = workspace.newBlock("varText");

    onSubmit
      .getInput("DO")
      .connection.connect(assignChatInput.previousConnection);
    assignChatInput.nextConnection.connect(sendSuccess.previousConnection);
    sendSuccess.getInput("DO").connection.connect(display.previousConnection);
    assignChatInput
      .getInput("VARNAME")
      .connection.connect(varText1.outputConnection);
    sendSuccess
      .getInput("VARNAME")
      .connection.connect(varText2.outputConnection);
    display.getInput("VARNAME").connection.connect(varText3.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    store.setChatInput("こんにちは");
    await store.submit();
    editCreatedAt();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
