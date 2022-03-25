import React, { Component } from "react";
import { Block } from "common/BlocklyLesson/components/Blockly";
import {
  fetchServer,
  ifIncludeText,
  assignReceivedText,
} from "components/lesson3/common/blocks/ReceiveMessages";
import {
  onSubmit,
  sendSuccess,
  assignChatInput,
} from "components/lesson3/common/blocks/SendMessages";
import {
  display,
  varText,
  textHello,
} from "components/lesson3/common/blocks/CommonToReceiveAndSend";
import BlocklyComponent from "components/sensei/workspaces/BlocklyLesson/components/BlocklyComponent";

const tools = [
  fetchServer,
  ifIncludeText,
  assignReceivedText,
  onSubmit,
  sendSuccess,
  assignChatInput,
  display,
  varText,
  textHello,
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
