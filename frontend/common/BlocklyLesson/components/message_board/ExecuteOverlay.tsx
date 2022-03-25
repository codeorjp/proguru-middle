import React from "react";

interface ExecuteOverlayProps {
  isShow: boolean;
  isExecute: boolean;
  styles: any;
}

const ExecuteOverlay: React.FC<ExecuteOverlayProps> = ({
  isShow,
  isExecute,
  styles,
}) => {
  const className = isShow ? styles.overlay : styles.displayNone;
  const body = isExecute ? (
    <p>プログラムを実行中...</p>
  ) : (
    <p>
      プログラムを組んだら
      <br />
      「実行する」ボタンを押してね
    </p>
  );
  return <div className={className}>{body}</div>;
};

export default ExecuteOverlay;
