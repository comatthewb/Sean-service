import React from "react";

const Modal = props => {
  // console.log(props.close);
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" id="modal">
      <div className="modal-main">
        <div className="close">X</div>
        <img src={props.image} />
      </div>
    </div>
  );
};

export default Modal;
