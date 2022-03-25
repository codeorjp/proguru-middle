import React, { Component } from "react";
import commonStyle from "common/styles/common.scss";
import ToastStore from "common/ToastStore";
import AdjustBarStore from "common/AdjustBarStore";
import { Provider } from "mobx-react";
import BrowserSupport from "common/components/BrowserSupport";
import LessonTour from "common/components/LessonTour";
import LessonToast from "common/components/LessonToast";
import StageIntroductionModal from "common/components/StageIntroductionModal";
import StageInner from "components/lesson1/common/components/StageInner";
import { tourConfig } from "components/lesson1/common/constants/tourConfig";

export default class Stage extends Component {
  constructor(props) {
    super(props);
    const {
      userId,
      lesson,
      stage,
      submittedWorkspace,
      stageConfig,
      Store,
    } = props;
    this.store = new Store(userId, lesson, stage, submittedWorkspace);
    this.store.setStageConfig(stageConfig);
  }

  componentDidMount() {
    const { submittedWorkspace } = this.props;
    if (submittedWorkspace) {
      this.store.restoreSubmittedWorkspace(JSON.parse(submittedWorkspace.body));
    }
  }

  render() {
    const { description, ...props } = this.props;
    return (
      <Provider
        store={this.store}
        toastStore={ToastStore}
        adjustBarStore={AdjustBarStore}
      >
        <BrowserSupport />
        <div className={commonStyle.lessonCommon}>
          <StageInner {...props} />
          <LessonTour tourConfig={tourConfig} />
          <StageIntroductionModal description={description} />
        </div>
        <LessonToast />
      </Provider>
    );
  }
}
