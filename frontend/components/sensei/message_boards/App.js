import React, { Component } from "react";
import MessageBoard from "./components/MessageBoard";

export default class App extends Component {
  render() {
    const { classRoomId, kind } = this.props;
    return (
      <div>
        <MessageBoard classRoomId={classRoomId} kind={kind} />
      </div>
    );
  }
}
