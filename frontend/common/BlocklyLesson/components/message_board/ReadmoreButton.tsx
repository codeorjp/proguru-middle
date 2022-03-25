import React from "react";

interface ReadmoreButtonProps {
  handleClick?: (event: React.MouseEvent) => void;
  className: string;
  isShow: boolean;
  isExecute: boolean;
  hasPastMessage?: boolean;
}

const ReadmoreButton: React.FC<ReadmoreButtonProps> = ({
  handleClick,
  className,
  isShow,
  isExecute,
  hasPastMessage,
}) => {
  if (!isShow) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        style={isExecute && hasPastMessage ? {} : { display: "none" }}
      >
        もっと見る
      </button>
    </div>
  );
};

export default ReadmoreButton;
