import React, { Component } from "react";
import { Block } from "common/BlocklyLesson/components/Blockly";
import {
  display,
  onExecute,
  receiveResponse,
  connectSuccess,
  send,
  serverDropdown,
  responseText,
  ifMorningOrAfternoon,
  textHelloJa,
  textGoodMorning,
  textHelloWorld,
  textHello,
  textWorld,
  textExclamation,
  loop,
  connect,
  textMyName,
} from "components/lesson2/common/blocks/Block";
import BlocklyComponent from "components/sensei/workspaces/BlocklyLesson/components/BlocklyComponent";

const tools = [
  display,
  onExecute,
  receiveResponse,
  connectSuccess,
  send,
  serverDropdown,
  responseText,
  ifMorningOrAfternoon,
  textHelloJa,
  textGoodMorning,
  textHelloWorld,
  textHello,
  textWorld,
  textExclamation,
  loop,
  connect,
  textMyName,
];

export default class App extends Component {
  render() {
    const { workspace } = this.props;
    return (
      <BlocklyComponent
        tools={tools}
        workspaceXML={workspace ? workspace.body : null}
        zoom={{
          startScale: 0.7,
          minScale: 0.5,
          maxScale: 1.5,
          controls: true,
        }}
      >
        {tools.map((tool) => (
          <Block type={tool.name} key={tool.name} />
        ))}
      </BlocklyComponent>
    );
  }
}
