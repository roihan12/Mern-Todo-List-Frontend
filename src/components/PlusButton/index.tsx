import React from "react";

import PlusSvgComponent from "../../assets/svg/plus";

const PlusButton: React.FC = () => {
  return (
    <div
      className=" absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: "50%",
        bottom: "4%",
      }}
    >
      <PlusSvgComponent className="w-10 text-white" />
    </div>
  );
};

export default PlusButton;
