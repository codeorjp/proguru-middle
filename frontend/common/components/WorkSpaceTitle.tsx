import React from "react";
import styles from "common/styles/WorkSpaceTitle.scss";
import lesson1 from "common/statics/lesson_icon/1.png";
import lesson2 from "common/statics/lesson_icon/2.png";
import lesson3 from "common/statics/lesson_icon/3.png";
import lesson4 from "common/statics/lesson_icon/4.png";
import lesson5 from "common/statics/lesson_icon/5.png";
import StageFinishModal from "./StageFinishModal";

const lessonIcon = {
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
};

const isDesingLesson = (lessonId: number, stageId: number): boolean =>
  lessonId === 1 || (lessonId === 5 && stageId === 1);

interface IworkspaceTitle {
  stageId: number;
  lessonId: number;
  children: JSX.Element;
  checkPoint: string[] | null;
}

const WorkSpaceTitle = ({ stageId, lessonId, children, checkPoint }) => (
  <div id="workspaceTitle">
    <div className={styles.titleWrap}>
      <div className={styles.titleThumb}>
        <img
          src={lessonIcon[`lesson${lessonId}`]}
          width="100"
          height="70"
          alt=""
        />
      </div>
      <div className={styles.title}>
        <p className={styles.stageNumber}>
          ステージ
          {stageId}
        </p>
        <div className={styles.stageTask}>{children}</div>
      </div>
      {isDesingLesson(lessonId, stageId) ? (
        <StageFinishModal
          stageId={stageId}
          lessonId={lessonId}
          checkPoint={checkPoint}
        />
      ) : null}
    </div>
  </div>
);

export default WorkSpaceTitle;
