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

  // Storeのインスタンスを生成
  // constructorのaxios.get()でError検出する
  store = new Store(
    0, // userId
    "生徒1", // nickName
    0, // studnetNumber
    null, // userIcon
    { number: 3 }, // lesson
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

describe("Lesson3 Stage1", () => {
  test("build blocks -> eval code -> submit -> display content", () => {
    const onSubmit = workspace.newBlock("onSubmit");
    const display = workspace.newBlock("display");
    const textHello = workspace.newBlock("textHello");

    onSubmit.getInput("DO").connection.connect(display.previousConnection);
    display.getInput("VARNAME").connection.connect(textHello.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    store.submit();
    editCreatedAt();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("build blocks -> eval code -> submit two times -> display two contents", () => {
    const onSubmit = workspace.newBlock("onSubmit");
    const display = workspace.newBlock("display");
    const textHello = workspace.newBlock("textHello");

    onSubmit.getInput("DO").connection.connect(display.previousConnection);
    display.getInput("VARNAME").connection.connect(textHello.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    store.submit();
    store.submit();
    editCreatedAt();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("build blocks(double display block) -> eval code -> submit -> display two contents", () => {
    const onSubmit = workspace.newBlock("onSubmit");
    const display1 = workspace.newBlock("display");
    const display2 = workspace.newBlock("display");
    const textHello1 = workspace.newBlock("textHello");
    const textHello2 = workspace.newBlock("textHello");

    onSubmit.getInput("DO").connection.connect(display1.previousConnection);
    display1
      .getInput("VARNAME")
      .connection.connect(textHello1.outputConnection);
    display1.nextConnection.connect(display2.previousConnection);
    display2
      .getInput("VARNAME")
      .connection.connect(textHello2.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    store.submit();
    editCreatedAt();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
