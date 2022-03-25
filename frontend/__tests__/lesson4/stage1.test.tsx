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
import Store from "components/lesson4/common/Store";
import Sandbox from "common/BlocklyLesson/utils/Sandbox";
import MessageBoard from "common/BlocklyLesson/components/MessageBoard";
import * as BlockFunctions from "components/lesson4/common/block-functions";
import StageSettings from "components/lesson4/StageSettings";
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
    { number: 4 }, // lesson
    { number: 1 }, // stage
    null // submittedWorkspace
  );
  store.setSampleImage();

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
      <MessageBoard types={["Image"]} />
    </Provider>
  );
});

const editCreatedAt = () => {
  const { messages } = store;
  messages.forEach((_message: object, index: number) => {
    messages[index].createdAt = moment("20200202", "YYYYMMDD");
  });
};

describe("Lesson4 Stage1", () => {
  test("build blocks -> eval code -> display content(sampleImage 1)", () => {
    const onExecute = workspace.newBlock("onExecute");
    const display = workspace.newBlock("display");
    const sampleImage = workspace.newBlock("sampleImage");

    onExecute.getInput("DO").connection.connect(display.previousConnection);
    display
      .getInput("VARNAME")
      .connection.connect(sampleImage.outputConnection);

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    editCreatedAt();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("build blocks -> eval code -> display content(sampleImage 1, 2)", () => {
    const onExecute = workspace.newBlock("onExecute");
    const display1 = workspace.newBlock("display");
    const display2 = workspace.newBlock("display");
    const sampleImage1 = workspace.newBlock("sampleImage");
    const sampleImage2 = workspace.newBlock("sampleImage");

    onExecute.getInput("DO").connection.connect(display1.previousConnection);
    display1
      .getInput("VARNAME")
      .connection.connect(sampleImage1.outputConnection);
    display1.nextConnection.connect(display2.previousConnection);
    display2
      .getInput("VARNAME")
      .connection.connect(sampleImage2.outputConnection);
    sampleImage2.setFieldValue("2", "NUMBER");

    const code = BlocklyJS.workspaceToCode(workspace);
    sandbox.init(store, BlockFunctions, code);
    sandbox.eval();

    editCreatedAt();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
