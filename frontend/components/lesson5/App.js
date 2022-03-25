import React, { Component } from "react";
import Store from "components/lesson5/stage1/Store";
import Lesson1Stage from "components/lesson1/common/components/Stage";
import Lesson5Stage from "./stage2/components/Stage";
import StageSettings from "./StageSettings";

export default class App extends Component {
  render() {
    switch (this.props.stageId) {
      case 1: {
        const { children, ...stageOptions } = StageSettings[this.props.stageId];
        return (
          <Lesson1Stage {...this.props} {...stageOptions} Store={Store}>
            {children}
          </Lesson1Stage>
        );
      }
      case 2:
        return (
          <Lesson5Stage
            {...this.props}
            {...StageSettings[this.props.stageId]}
          />
        );
      default:
        break;
    }
  }
}
