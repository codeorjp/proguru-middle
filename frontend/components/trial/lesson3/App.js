import React, { Component } from "react";
import Stage from "components/trial/lesson3/common/components/Stage";
import StageSettings from "components/lesson3/StageSettings";

export default class App extends Component {
  render() {
    return (
      <Stage
        {...this.props}
        {...StageSettings[Object.keys(StageSettings).length]}
        stageTask="テキストの送受信ができるようにしよう！"
        types={["Text"]}
      />
    );
  }
}
