import React, { Component } from "react";
import styles from "components/lesson1/common/styles/designTool.scss";
import { inject, observer } from "mobx-react";
import { fontFamily } from "components/lesson1/common/constants/fontFamily";
import WebFont from "webfontloader";
import DesignWindow from "./DesignWindow";

class FontFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const self = this;
    WebFont.load({
      loading: () => {
        self.setState({
          loading: false,
        });
      },
    });
  }

  getFontSelect() {
    const { name, value, store } = this.props;
    const { className } = store.clickElm;
    const input = {};
    const options = [];

    fontFamily.forEach((elm) => {
      options.push(
        <option key={elm.fontName} value={elm.fontName}>
          {elm.displayName}
        </option>
      );
    });

    return (
      <div className={`${styles.formField} ${styles.select}`}>
        <select
          name="fontfamily"
          value={value}
          onChange={(e) => {
            input[name] = e.target.value !== "default" ? e.target.value : "";
            store.setStyle(className, input);
          }}
        >
          {options}
        </select>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <DesignWindow title={title}>
        {this.state.loading ? "ローディング中" : this.getFontSelect()}
      </DesignWindow>
    );
  }
}

export default inject("store")(observer(FontFamily));
