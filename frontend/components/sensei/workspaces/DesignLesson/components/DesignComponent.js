import React, { Component } from "react";
import { Provider } from "mobx-react";
import styles from "common/styles/layout.scss";
import LessonCard from "common/components/LessonCard";
import Store from "components/lesson1/common/Store";
import playGroundStyles from "../styles/DesignComponent.scss";
import "common/styles/messageBoard.scss";

class DesignComponent extends Component {
  constructor(props) {
    super(props);
    const { userId, lesson, stage, submittedWorkspace } = props;
    this.store = new Store(userId, lesson, stage, submittedWorkspace);
  }

  componentDidMount() {
    const { workspace } = this.props;
    if (workspace) {
      this.store.restoreSubmittedWorkspace(JSON.parse(workspace.body));
    }
  }

  render() {
    const { children, noPadding } = this.props;

    return (
      <Provider store={this.store}>
        <div className={styles.playGround}>
          <LessonCard noPadding>
            <div className={playGroundStyles.wrapper}>
              <div className={noPadding ? "" : styles.innerPadding}>
                {children}
              </div>
              <div className={playGroundStyles.overlay} />
            </div>
          </LessonCard>
        </div>
      </Provider>
    );
  }
}

export default DesignComponent;
