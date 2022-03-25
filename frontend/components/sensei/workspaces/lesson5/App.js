import React, { Component } from "react";
import StageSettings from "components/lesson5/StageSettings";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import DesignComponent from "components/sensei/workspaces/DesignLesson/components/DesignComponent";
import { Block } from "common/BlocklyLesson/components/Blockly";
import {
  ifIncludeText,
  assignReceivedText,
  fetchServer,
  ifIncludeImage,
  assignReceivedImage,
} from "components/lesson5/stage2/blocks/ReceiveMessages";
import {
  onSubmit,
  assignChatInput,
  onClickSelectImage,
  showFileDialog,
  sendSuccess,
  assignSelectedImage,
} from "components/lesson5/stage2/blocks/SendMessages";
import {
  varImage,
  display,
  compression,
  resizeImage,
  imageSizeConditions,
  fixedAspectResize,
  ifIncludeAddress,
  ifIncludePhoneNumber,
  ifMatchKeyword,
  displayConfirmDialog,
  alert,
  textHello,
} from "components/lesson5/stage2/blocks/CommonToReceiveAndSend";
import BlocklyComponent from "components/sensei/workspaces/BlocklyLesson/components/BlocklyComponent";

const tools = [
  ifIncludeText,
  assignReceivedText,
  fetchServer,
  ifIncludeImage,
  assignReceivedImage,
  onSubmit,
  assignChatInput,
  onClickSelectImage,
  showFileDialog,
  sendSuccess,
  assignSelectedImage,
  varImage,
  display,
  compression,
  resizeImage,
  imageSizeConditions,
  fixedAspectResize,
  ifIncludeAddress,
  ifIncludePhoneNumber,
  ifMatchKeyword,
  displayConfirmDialog,
  alert,
  textHello,
];

export default class App extends Component {
  render() {
    const { stage, workspace } = this.props;
    switch (stage.number) {
      case 1: {
        const { children, noPadding } = StageSettings[stage.number];

        let userElm;
        React.Children.map(children, (child) => {
          switch (child.key) {
            case playGroundKey.userStyleArea:
              userElm = child;
              break;
            default:
              break;
          }
        });

        return (
          <DesignComponent {...this.props} noPadding={noPadding}>
            {userElm}
          </DesignComponent>
        );
      }
      case 2:
        return (
          <BlocklyComponent
            tools={tools}
            workspaceXML={workspace ? workspace.body : null}
            scrollbars
            readOnly
            zoom={{
              startScale: 0.6,
              minScale: 0.5,
              maxScale: 1.5,
              controls: true,
              wheel: true,
              pinch: true,
            }}
          >
            {tools.map((tool) => (
              <Block type={tool.name} key={tool.name} />
            ))}
          </BlocklyComponent>
        );
      default:
        break;
    }
  }
}
