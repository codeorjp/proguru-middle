import React from "react";
import { Provider } from "mobx-react";

import BrowserSupport from "common/components/BrowserSupport";
import LessonCard from "common/components/LessonCard";
import LessonTour from "common/components/LessonTour";
import LessonToast from "common/components/LessonToast";
import AdjustBar from "common/components/AdjustBar";
import PlayGroundWrap from "common/components/PlayGroundWrap";
import StageIntroductionModal from "common/components/StageIntroductionModal";
import WorkSpaceTitle from "common/components/WorkSpaceTitle";
import MessageBoardWrap from "common/components/MessageBoardWrap";
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
import { tourConfig, tourSelecters } from "../tourConfig";

const { mainContent, playGround, workSpace, innerPadding } = styles;

interface Stage {
  stageTask: string;
  workspace: {
    workspaceXML: string;
    tools: Array<object>;
    unDeletableBlocks: Array<object>;
  };
  checkPoint: string[];
  description?: JSX.Element;
  validationList?: object[];
  lessonId: number;
  stageId: number;
  userId: number;
  nickName: string;
  studentNumber: number;
  userIcon: string;
  lesson: object;
  stage: object;
  submittedWorkspace: string;
}

const Stage = ({
  stageTask,
  workspace,
  checkPoint,
  description,
  validationList,
  lessonId,
  stageId,
  userId,
  nickName,
  studentNumber,
  userIcon,
  lesson,
  stage,
  submittedWorkspace,
}: Stage) => {
  const store = new Store(
    userId,
    nickName,
    studentNumber,
    userIcon,
    lesson,
    stage,
    submittedWorkspace
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
              <LessonCard id={tourSelecters.messageBoard} noPadding>
                <MessageBoardWrap>
                  <MessageBoard types={["Text"]} />
                </MessageBoardWrap>
              </LessonCard>
            </div>
          </PlayGroundWrap>
          <AdjustBar />
          <div className={workSpace}>
            <LessonCard noPadding fullHeight>
              <div className={innerPadding}>
                <WorkSpaceTitle
                  lessonId={lessonId}
                  stageId={stageId}
                  checkPoint={null}
                >
                  {stageTask}
                </WorkSpaceTitle>
              </div>
              <BlocklyComponent
                id={tourSelecters.workSpace}
                {...workspace}
                trashcan
                scrollbars
                zoom={{
                  startScale: 0.6,
                  minScale: 0.5,
                  maxScale: 1.2,
                  controls: true,
                }}
              >
                {workspace.tools.map((tool: { name: string }) => (
                  <Block type={tool.name} key={tool.name} />
                ))}
              </BlocklyComponent>
              <Button
                blockFunctions={BlockFunctions}
                lessonId={lessonId}
                checkPoint={checkPoint}
                validationList={validationList}
              />
            </LessonCard>
          </div>
        </div>
        <LessonTour tourConfig={tourConfig} store={store} />
        <StageIntroductionModal description={description} store={store} />
      </div>
      <LessonToast />
    </Provider>
  );
};

export default Stage;
