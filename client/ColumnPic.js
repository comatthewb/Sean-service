import React from "react";

const ColumnPic = ({ image, index, hover }) => {
  return (
    <img
      id={`image${index}`}
      className="sean-image"
      src={image}
      alt="stuff"
      onMouseEnter={() => hover(index)}
    />
  );
};

export default ColumnPic;
