import React, { Component } from "react";
import Store from "components/lesson1/common/Store";
import Stage from "components/lesson1/common/components/Stage";
import StageSettings from "components/lesson1/StageSettings";

export default class App extends Component {
  render() {
    const { children, ...stageOptions } = StageSettings[this.props.stageId];
    const childrenBody = children.props.children; // React.Fragmentで囲ってあるkeyの入ったdiv要素を取り出すため
    return (
      <Stage {...this.props} {...stageOptions} Store={Store}>
        {childrenBody}
      </Stage>
    );
  }
}
