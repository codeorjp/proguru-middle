import React, { Component } from "react";
import Stage from "components/lesson3/common/components/Stage";
import StageSettings from "./StageSettings";

interface Iprops {
  lessonId: number;
  stageId: number;
  userId: number;
  nickName: string;
  studentNumber: number;
  userIcon: any; // blob
  lesson: object;
  stage: object;
  submittedWorkspace: string;
}

export default class App extends Component<Iprops> {
  render() {
    return <Stage {...this.props} {...StageSettings[this.props.stageId]} />;
  }
}
