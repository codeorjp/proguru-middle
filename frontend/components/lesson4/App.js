import React, { Component } from "react";
import Stage from "./common/components/Stage";
import StageSettings from "./StageSettings";

export default class App extends Component {
  render() {
    return <Stage {...this.props} {...StageSettings[this.props.stageId]} />;
  }
}
