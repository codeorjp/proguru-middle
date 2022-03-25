import React, { Component } from "react";
import StageSettings from "components/lesson1/StageSettings";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import DesignComponent from "../DesignLesson/components/DesignComponent";

export default class App extends Component {
  render() {
    const { stage } = this.props;
    const { children, noPadding } = StageSettings[stage.number];
    const childrenBody = children.props.children; // React.Fragmentで囲ってあるkeyの入ったdiv要素を取り出すため

    let userElm;
    React.Children.map(childrenBody, (child) => {
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
}
