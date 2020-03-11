import React from "react";

const ColumnPic = ({ image, index, hover }) => {
  return (
    <img
      className="image"
      src={image}
      alt="stuff"
      onMouseEnter={() => hover(index)}
    />
  );
};

export default ColumnPic;
