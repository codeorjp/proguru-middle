import React from "react";
import { Provider } from "mobx-react";
import BrowserSupport from "common/components/BrowserSupport";
import LessonCard from "common/components/LessonCard";
import LessonTour from "components/trial/common/components/LessonTour";
import AdjustBar from "common/components/AdjustBar";
import PlayGroundWrap from "common/components/PlayGroundWrap";
import WorkSpaceTitle from "common/components/WorkSpaceTitle";
import commonStyle from "common/styles/common.scss";
import styles from "common/styles/layout.scss";
import AdjustBarStore from "common/AdjustBarStore";
import { Block } from "common/BlocklyLesson/components/Blockly";
import BlocklyComponent from "common/BlocklyLesson/components/BlocklyComponent";
import MessageBoardWrap from "components/trial/common/components/MessageBoardWrap";
import Button from "components/trial/common/components/Button";
import MessageDB from "components/trial/common/components/MessageDB";
import MessageBoard from "common/BlocklyLesson/components/MessageBoard";
import * as BlockFunctions from "components/lesson4/common/block-functions";
import {
  tourConfig,
  tourSelecters,
} from "components/trial/lesson4/common/tourConfig";
import Store from "../Store";

const { mainContent, playGround, workSpace, innerPadding } = styles;

const Stage = ({ stageTask, workspace, checkPoint, lessonId, types }) => {
  const store = new Store(lessonId);
  return (
    <Provider store={store} adjustBarStore={AdjustBarStore}>
      <BrowserSupport />
      <div className={commonStyle.lessonCommon}>
        <div className={mainContent}>
          <PlayGroundWrap>
            <div className={playGround}>
              <LessonCard id={tourSelecters.messageBoard} noPadding fullHeight>
                <MessageBoardWrap
                  messageBoard={<MessageBoard types={types} />}
                  messageDB={<MessageDB types={types} />}
                />
              </LessonCard>
            </div>
          </PlayGroundWrap>
          <AdjustBar />
          <div className={workSpace}>
            <LessonCard noPadding fullHeight>
              <div className={innerPadding}>
                <WorkSpaceTitle lessonId={lessonId} stageId={0}>
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
                {workspace.tools.map((tool) => (
                  <Block type={tool.name} key={tool.name} />
                ))}
              </BlocklyComponent>
              <Button
                blockFunctions={BlockFunctions}
                beforeExecute={store.setSampleImage}
                lessonId={lessonId}
                checkPoint={checkPoint}
              />
            </LessonCard>
          </div>
        </div>
        <LessonTour tourConfig={tourConfig} />
      </div>
    </Provider>
  );
};

export default Stage;
