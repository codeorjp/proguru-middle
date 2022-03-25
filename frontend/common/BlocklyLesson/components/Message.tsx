/* eslint-disable max-classes-per-file */
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import moment from "moment";
import styles from "../styles/Message.scss";

interface Itext {
  content: string;
  icon: any;
  userName: string;
  userNumber: number;
  createdAt: moment.Moment;
  balloon: object;
  profileIcon: object;
}

export const SendText = ({
  content,
  icon,
  userName,
  userNumber,
  createdAt,
  balloon,
  profileIcon,
}: Itext) => (
  <div className="sendMessageArea">
    <div className={styles.balloon}>
      <p className={styles.sendCreatedAtSenderWrap}>
        <span className={styles.createdAt}>{createdAt.format("h:mm A")}</span>
        <span className={styles.userNumber}>{`出席番号：${userNumber}`}</span>
        <span>{userName}</span>
      </p>
      <div style={balloon}>
        <p className={styles.message}>{content}</p>
      </div>
    </div>
    <div style={profileIcon} className={styles.profileIcon}>
      <img className={styles.iconImage} src={icon} alt="" />
    </div>
  </div>
);

export const ReceiveText = ({
  content,
  icon,
  userName,
  userNumber,
  createdAt,
  balloon,
  profileIcon,
}: Itext) => (
  <div className="sendMessageArea">
    <div style={profileIcon} className={styles.profileIcon}>
      <img className={styles.iconImage} src={icon} alt="" />
    </div>
    <div className={styles.balloon}>
      <p className={styles.receiveCreatedAtSenderWrap}>
        <span className={styles.userNumber}>{`出席番号：${userNumber}`}</span>
        <span>{userName}</span>
        <span className={styles.createdAt}>{createdAt.format("h:mm A")}</span>
      </p>
      <div style={balloon}>
        <p className={styles.message}>{content}</p>
      </div>
    </div>
  </div>
);

interface Iprops {
  content: any;
  icon: any;
  userName: string;
  userNumber: number;
  createdAt: moment.Moment;
  profileIcon: object;
}

export const SendImage = ({
  content,
  icon,
  userName,
  userNumber,
  createdAt,
  profileIcon,
}: Iprops) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const image = new Image();
    image.src = content;
    image.onload = () => {
      setImageWidth(image.width);
      setImageHeight(image.height);
    };
  }, []);

  return (
    <div className="sendMessageArea">
      <div className={styles.balloon}>
        <p className={styles.sendCreatedAtSenderWrap}>
          <span className={styles.createdAt}>{createdAt.format("h:mm A")}</span>
          <span className={styles.userNumber}>{`出席番号：${userNumber}`}</span>
          <span>{userName}</span>
        </p>
        <Popup
          trigger={
            <div
              className={styles.sendImageWrap}
              style={{ height: `${imageHeight}px` }}
            >
              <img src={content} className={styles.sendImage} alt="" />
            </div>
          }
          position="center center"
          on="hover"
          contentStyle={{ width: "150px" }}
        >
          <div
            style={{ textAlign: "center" }}
          >{`${imageWidth}px × ${imageHeight}px`}</div>
        </Popup>
      </div>
      <div style={profileIcon} className={styles.profileIcon}>
        <img className={styles.iconImage} src={icon} alt="" />
      </div>
    </div>
  );
};

export const ReceiveImage = ({
  content,
  icon,
  userName,
  userNumber,
  createdAt,
  profileIcon,
}: Iprops) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const image = new Image();
    image.src = content;
    image.onload = () => {
      setImageWidth(image.width);
      setImageHeight(image.height);
    };
  }, []);

  return (
    <div className="sendMessageArea">
      <div style={profileIcon} className={styles.profileIcon}>
        <img className={styles.iconImage} src={icon} alt="" />
      </div>
      <div className={styles.balloon}>
        <p className={styles.receiveCreatedAtSenderWrap}>
          <span className={styles.userNumber}>{`出席番号：${userNumber}`}</span>
          <span>{userName}</span>
          <span className={styles.createdAt}>{createdAt.format("h:mm A")}</span>
        </p>
        <Popup
          trigger={
            <div
              className={styles.receiveImageWrap}
              style={{ height: `${imageHeight}px` }}
            >
              <img src={content} className={styles.receiveImage} alt="" />
            </div>
          }
          position="center center"
          on="hover"
          contentStyle={{ width: "150px" }}
        >
          <div
            style={{ textAlign: "center" }}
          >{`${imageWidth}px × ${imageHeight}px`}</div>
        </Popup>
      </div>
    </div>
  );
};
