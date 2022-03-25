import React from "react";
import styles from "common/styles/layout.scss";
import AdjustBar from "common/components/AdjustBar";
import PlayGroundWrap from "common/components/PlayGroundWrap";
import playGroundKey from "components/lesson1/common/constants/playGroundKey";
import stageStyle from "components/lesson1/common/styles/Stage.scss";
import GenerateWorkSpace from "components/lesson1/common/components/workspace/GenerateWorkSpace";
import LessonCard from "common/components/LessonCard";
import WorkSpaceTitle from "common/components/WorkSpaceTitle";
import GlobalSettingButton from "components/lesson1/common/components/playground/GlobalSettingButton";
import { tourSelecters } from "components/lesson1/common/constants/tourConfig";

const StageInner = ({
  stageTask,
  stageId,
  lessonId,
  children,
  isGlobalSettings,
  noPadding,
  checkPoint,
  presetColors,
}) => {
  let sampleElm;
  let userElm;

  React.Children.map(children, (child) => {
    switch (child.key) {
      case playGroundKey.userStyleArea:
        userElm = child;
        break;
      case playGroundKey.sampleStyleArea:
        sampleElm = child;
        break;
      default:
        break;
    }
  });

  return (
    <div className={styles.mainContent}>
      <PlayGroundWrap>
        <div className={styles.playGround}>
          <LessonCard id={tourSelecters.userDesign} noPadding>
            <div className={stageStyle.messageBoard}>
              <div className={stageStyle.messageBoardTitle}>
                <p className={stageStyle.designAreaTitle}>あなたのデザイン</p>
                {isGlobalSettings ? <GlobalSettingButton /> : null}
                <p className={stageStyle.windowButton}>● ● ●</p>
              </div>
              <div className={noPadding ? "" : styles.innerPadding}>
                {userElm}
              </div>
            </div>
          </LessonCard>
          {sampleElm ? (
            <LessonCard id={tourSelecters.sampleDesign}>
              <div className={stageStyle.sampleArea}>
                <p className={stageStyle.sampleAreaTitle}>デザイン見本</p>
                {sampleElm}
              </div>
            </LessonCard>
          ) : null}
        </div>
      </PlayGroundWrap>
      <AdjustBar />
      <div className={styles.workSpace}>
        <LessonCard noPadding fullHeight id={tourSelecters.workSpace}>
          <div className={styles.innerPadding}>
            <WorkSpaceTitle
              lessonId={lessonId}
              stageId={stageId}
              checkPoint={checkPoint}
            >
              {stageTask}
            </WorkSpaceTitle>
          </div>
          <GenerateWorkSpace presetColors={presetColors} />
        </LessonCard>
      </div>
    </div>
  );
};

StageInner.defaultProps = {
  isGlobalSettings: false,
};

export default StageInner;
