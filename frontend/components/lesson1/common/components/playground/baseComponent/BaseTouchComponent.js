import { Component } from "react";
import flattenObject from "common/utils/flattenObject";

export default class BaseTouchComponent extends Component {
  constructor(props) {
    super(props);
    this.componentTitle = "";
    this.componentName = "";
    this.editStyle = {};
  }

  componentDidMount() {
    const { defaultStyle, store } = this.props;
    // セッションストレージにデータがなければデフォルトスタイルを適応する
    if (defaultStyle && !store.storage.isExistsSavedWorkspace()) {
      store.setStyle(this.componentName, defaultStyle);
    }
  }

  onClick() {
    const { store, isSample } = this.props;

    // サンプルはクリックしてもstoreを叩かないように
    if (isSample) return;

    // App.jsのstageConfigで定義した編集用コンポーネントを探す
    const stageEditDesignComponent = store.stageConfig.find(
      (config) => this.componentName === config.className
    );

    // クリック時にstoreに渡すデータ
    store.setClickElm({
      title: this.componentTitle,
      className: this.componentName,
      style: this.editStyle,
      editDesignComponent: stageEditDesignComponent.editDesignComponent,
    });
  }

  getEditStyle() {
    const { isSample, store, style } = this.props;
    const componentStyle = isSample
      ? style
      : store.schemas[this.componentName].style;
    // onClick時に渡すstyleデータ
    this.editStyle = componentStyle;
    // コンポーネントに渡すflat化したstyleデータ
    return flattenObject(componentStyle);
  }
}
