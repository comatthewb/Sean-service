import React from "react";

const Modal = props => {
  // console.log(props.close);
  if (!props.show) {
    return null;
  }
  return (
    <div onClick={() => props.close()} className="sean-modal" id="modal">
      <div className="sean-modal-main">
        <span className="sean-close-span">
          <svg
            className="sean-close"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="3 3 20 20"
            aria-hidden="true"
            focusable="false"
          >
            <path
              transform="translate(0, 0)"
              d="M13.414,12l6.293-6.293a1,1,0,0,0-1.414-1.414L12,10.586,5.707,4.293A1,1,0,0,0,4.293,5.707L10.586,12,4.293,18.293a1,1,0,1,0,1.414,1.414L12,13.414l6.293,6.293a1,1,0,0,0,1.414-1.414Z"
            ></path>
          </svg>{" "}
        </span>
        <img className="sean-modal-image" src={props.image} />
      </div>
    </div>
  );
};

export default Modal;
