import React, { useState } from "react";
import ProfileUser from "./ProfileUser";

interface tooltipI {
  content: any;
  children: any;
}
const Tooltip: React.FC<tooltipI> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div className="relative h-full w-fit">
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      {visible && (
        <div className="absolute  bottom-10 z-10 p-2 w-[500px] text-white bg-cyan-500/10 border border-cyan-500 backdrop-blur-md rounded-md shadow-lg">
          {/* {content} */}
          <button className="absolute top-4 right-4 px-2" onClick={handleClick}>
            x
          </button>
          <ProfileUser user={content}></ProfileUser>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
