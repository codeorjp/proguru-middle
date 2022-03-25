import React from "react";
import ReactModal from "react-modal";

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "block",
    width: "30em",
    height: "20em",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "10px",
    outline: "none",
    padding: "20px",
    textAlign: "center",
  },
};

ReactModal.setAppElement("#root");

interface Iprops {
  children: JSX.Element;
  style: object;
}

export default class Modal extends React.Component<Iprops> {
  render() {
    const { children, style } = this.props;
    const mergeStyle = Object.assign(modalStyle, style);
    return (
      <ReactModal {...this.props} style={mergeStyle}>
        {children}
      </ReactModal>
    );
  }
}
