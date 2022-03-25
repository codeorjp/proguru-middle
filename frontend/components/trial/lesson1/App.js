import React, { Component } from "react";
import Stage from "components/trial/lesson1/common/components/Stage";
import StageSettings from "components/lesson1/StageSettings";

export default class App extends Component {
  render() {
    const { children, ...stageOptions } = StageSettings[
      Object.keys(StageSettings).length
    ];
    const childrenBody = children.props.children; // React.Fragmentで囲ってあるkeyの入ったdiv要素を取り出すため
    return (
      <Stage {...this.props} {...stageOptions} stageId={0}>
        {childrenBody}
      </Stage>
    );
  }
}
