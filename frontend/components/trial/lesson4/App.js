import React, { Component } from "react";
import Stage from "components/trial/lesson4/common/components/Stage";
import StageSettings from "components/lesson4/StageSettings";

export default class App extends Component {
  render() {
    return (
      <Stage
        {...this.props}
        {...StageSettings[Object.keys(StageSettings).length]}
        stageTask="画像の送受信ができるようにしよう！"
        types={["Image"]}
      />
    );
  }
}
