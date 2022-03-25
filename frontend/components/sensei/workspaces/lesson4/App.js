import React, { Component } from "react";
import { Block } from "common/BlocklyLesson/components/Blockly";
import {
  fetchServer,
  ifIncludeImage,
  assignReceivedImage,
} from "components/lesson4/common/blocks/ReceiveImages";
import {
  onClickSelectImage,
  showFileDialog,
  sendSuccess,
  assignSelectedImage,
} from "components/lesson4/common/blocks/SendImages";
import {
  varImage,
  display,
  compression,
  resizeImage,
  imageSizeConditions,
  onExecute,
  sampleImage,
  fixedAspectResize,
} from "components/lesson4/common/blocks/CommonToReceiveAndSend";
import BlocklyComponent from "components/sensei/workspaces/BlocklyLesson/components/BlocklyComponent";

const tools = [
  fetchServer,
  ifIncludeImage,
  assignReceivedImage,
  onClickSelectImage,
  showFileDialog,
  sendSuccess,
  assignSelectedImage,
  varImage,
  display,
  compression,
  resizeImage,
  imageSizeConditions,
  onExecute,
  sampleImage,
  fixedAspectResize,
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
