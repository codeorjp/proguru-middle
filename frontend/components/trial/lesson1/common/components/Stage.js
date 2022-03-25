import React, { Component } from "react";
import commonStyle from "common/styles/common.scss";
import Store from "components/trial/lesson1/common/Store";
import ToastStore from "common/ToastStore";
import { Provider } from "mobx-react";
import BrowserSupport from "common/components/BrowserSupport";
import LessonTour from "components/trial/common/components/LessonTour";
import LessonToast from "common/components/LessonToast";
import AdjustBarStore from "common/AdjustBarStore";
import StageInner from "components/lesson1/common/components/StageInner";
import { tourConfig } from "components/trial/lesson1/common/tourConfig";

export default class Stage extends Component {
  constructor(props) {
    super(props);
    const { stageConfig, lessonId } = props;
    this.store = new Store(lessonId);
    this.store.setStageConfig(stageConfig);
  }

  componentDidMount() {
    const { submittedWorkspace } = this.props;
    if (submittedWorkspace) {
      this.store.restoreSubmittedWorkspace(JSON.parse(submittedWorkspace.body));
    }
  }

  render() {
    return (
      <Provider
        store={this.store}
        toastStore={ToastStore}
        adjustBarStore={AdjustBarStore}
      >
        <BrowserSupport />
        <div className={commonStyle.lessonCommon}>
          <StageInner {...this.props} />
          <LessonTour tourConfig={tourConfig} />
        </div>
        <LessonToast />
      </Provider>
    );
  }
}
