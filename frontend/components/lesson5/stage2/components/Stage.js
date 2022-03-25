import React from "react";
import { Provider } from "mobx-react";

import BrowserSupport from "common/components/BrowserSupport";
import LessonCard from "common/components/LessonCard";
import LessonToast from "common/components/LessonToast";
import WorkSpaceTitle from "common/components/WorkSpaceTitle";
import MessageBoardWrap from "common/components/MessageBoardWrap";
import AdjustBar from "common/components/AdjustBar";
import PlayGroundWrap from "common/components/PlayGroundWrap";
import commonStyle from "common/styles/common.scss";
import styles from "common/styles/layout.scss";
import AdjustBarStore from "common/AdjustBarStore";
import { Block } from "common/BlocklyLesson/components/Blockly";
import BlocklyComponent from "common/BlocklyLesson/components/BlocklyComponent";
import Button from "common/BlocklyLesson/components/Button";
import MessageBoard from "common/BlocklyLesson/components/MessageBoard";
import ToastStore from "common/ToastStore";
import Store from "../Store";
import * as BlockFunctions from "../block-functions";

const { mainContent, playGround, workSpace, innerPadding } = styles;

const Stage = ({
  stageTask,
  workspace,
  checkPoint,
  lessonId,
  stageId,
  userId,
  nickName,
  studentNumber,
  userIcon,
  lesson,
  stage,
  submittedWorkspace,
}) => {
  const store = new Store(
    userId,
    nickName,
    studentNumber,
    userIcon,
    lesson,
    stage,
    submittedWorkspace,
    "lesson"
  );

  return (
    <Provider
      store={store}
      toastStore={ToastStore}
      adjustBarStore={AdjustBarStore}
    >
      <BrowserSupport />
      <div className={commonStyle.lessonCommon}>
        <div className={mainContent}>
          <PlayGroundWrap>
            <div className={playGround}>
              <LessonCard noPadding>
                <MessageBoardWrap>
                  <MessageBoard types={["Text", "Image"]} />
                </MessageBoardWrap>
              </LessonCard>
            </div>
          </PlayGroundWrap>
          <AdjustBar />
          <div className={workSpace}>
            <LessonCard noPadding fullHeight>
              <div className={innerPadding}>
                <WorkSpaceTitle lessonId={lessonId} stageId={stageId}>
                  {stageTask}
                </WorkSpaceTitle>
              </div>
              <BlocklyComponent
                {...workspace}
                trashcan
                scrollbars
                zoom={{
                  startScale: 0.5,
                  minScale: 0.5,
                  maxScale: 1.0,
                  controls: true,
                }}
              >
                {workspace.tools.map((tool) => (
                  <Block type={tool.name} key={tool.name} />
                ))}
              </BlocklyComponent>
              <Button
                blockFunctions={BlockFunctions}
                lessonId={lessonId}
                checkPoint={checkPoint}
              />
            </LessonCard>
          </div>
        </div>
      </div>
      <LessonToast />
    </Provider>
  );
};

export default Stage;
