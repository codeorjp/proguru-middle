import React from "react";
import * as Blockly from "blockly/core";
import styles from "../styles/BlocklyComponent.scss";

class BlocklyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
  }

  initTools(tools) {
    tools.forEach(({ name, block, generator }) => {
      Blockly.Blocks[name] = block;
      Blockly.JavaScript[name] = generator;
    });
  }

  onResize() {
    this.blocklyDiv.style.width = `${this.wrapper.offsetWidth}px`;
    this.blocklyDiv.style.height = `${this.wrapper.offsetHeight}px`;
  }

  componentDidMount() {
    const { workspaceXML, tools, ...rest } = this.props;
    window.addEventListener("resize", this.onResize, false);
    this.onResize();

    this.initTools(tools);

    this.workspace = Blockly.inject(this.blocklyDiv, {
      renderer: "zelos",
      ...rest,
    });
    this.workspace.addChangeListener(Blockly.Events.disableOrphans);

    try {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(workspaceXML),
        this.workspace
      );
    } catch (e) {}
    Blockly.svgResize(this.workspace);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    const { children } = this.props;

    return (
      <div
        id="workSpace"
        ref={(e) => {
          this.wrapper = e;
        }}
        className={styles.blocklyWrapper}
      >
        <div
          ref={(e) => {
            this.blocklyDiv = e;
          }}
          id="blocklyDiv"
          className={styles.blocklyDiv}
        />
        <xml
          xmlns="https://developers.google.com/blockly/xml"
          is="blockly"
          style={{ display: "none" }}
        >
          {children}
        </xml>
      </div>
    );
  }
}

export default BlocklyComponent;
