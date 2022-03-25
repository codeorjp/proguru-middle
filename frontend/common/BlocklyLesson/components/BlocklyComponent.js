import React from "react";
import { inject, observer } from "mobx-react";
import WebFont from "webfontloader";
import { fontFamily } from "components/lesson1/common/constants/fontFamily";
import * as Blockly from "blockly/core";
import * as JA from "blockly/msg/ja";
import ResizeObserver from "resize-observer-polyfill";
import patchSVGElementBlur from "common/BlocklyLesson/utils/patchSVGElementBlur";
import styles from "../styles/BlocklyComponent.scss";

Blockly.setLocale(JA);

const initTools = (tools) => {
  tools.forEach(({ name, block, generator }) => {
    Blockly.Blocks[name] = block;
    Blockly.JavaScript[name] = generator;
  });
};

class BlocklyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
  }

  onResize() {
    this.blocklyDiv.style.width = `${this.wrapper.offsetWidth}px`;
    this.blocklyDiv.style.height = `${this.wrapper.offsetHeight}px`;
  }

  componentDidMount() {
    const {
      store,
      workspaceXML,
      tools,
      unDeletableBlocks,
      ...rest
    } = this.props;
    window.onresize = this.onResize;
    this.onResize();

    initTools(tools);
    initTools(unDeletableBlocks);

    this.workspace = Blockly.inject(this.blocklyDiv, {
      toolbox: this.toolbox,
      renderer: "zelos",
      ...rest,
    });
    this.workspace.addChangeListener(Blockly.Events.disableOrphans);
    store.restoreWorkspace(this.workspace, workspaceXML);
    Blockly.svgResize(this.workspace);

    window.onload = () => {
      this.onResize();
      Blockly.svgResize(this.workspace);
      patchSVGElementBlur();
    };

    const toolboxObserver = new ResizeObserver(() => {
      document.getElementById(
        "toolbox"
      ).style.width = `${this.workspace.flyout_.width_}px`;
    });
    toolboxObserver.observe(document.querySelectorAll(".blocklyFlyout")[1]);

    const flyoutScrollbar = document.getElementsByClassName(
      "blocklyFlyoutScrollbar"
    )?.[0];
    if (flyoutScrollbar) {
      flyoutScrollbar.parentNode.removeChild(flyoutScrollbar);
    }

    const playGroundWrapObserver = new ResizeObserver(() => {
      this.onResize();
      Blockly.svgResize(this.workspace);
    });
    playGroundWrapObserver.observe(document.getElementById("playGroundWrap"));

    WebFont.load({
      google: {
        families: fontFamily.map((elm) => elm.fontName),
      },
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <div className={styles.navigator}>
          <div id="toolbox" className={styles.toolbox}>
            <span>使えるブロック</span>
          </div>
          <div className={styles.workspace}>
            <span>ワークスペース</span>
          </div>
        </div>
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
            ref={(toolbox) => {
              this.toolbox = toolbox;
            }}
          >
            {children}
          </xml>
        </div>
      </>
    );
  }
}

export default inject("store")(observer(BlocklyComponent));
