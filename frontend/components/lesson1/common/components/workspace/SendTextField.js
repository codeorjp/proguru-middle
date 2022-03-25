import React, { Component } from "react";
import BaseTextField from "components/lesson1/common/components/workspace/baseComponent/BaseTextField";
import { inject, observer } from "mobx-react";

class SendTextField extends Component {
  render() {
    const { title, store } = this.props;
    return (
      <BaseTextField
        title={title}
        value={store.sendSpeechText}
        onChange={(e) => {
          store.setSendSpeechText(e.target.value);
        }}
      />
    );
  }
}

export default inject("store")(observer(SendTextField));
