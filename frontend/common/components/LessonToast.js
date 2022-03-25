import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "common/styles/LessonToast.scss";

export default () => <ToastContainer className={styles.lessonToast} />;
