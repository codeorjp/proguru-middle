import React, { Component } from "react";
import Stage from "./components/Stage";

export default class App extends Component {
  render() {
    return <Stage {...this.props} />;
  }
}
