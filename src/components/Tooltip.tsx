import React, { useState } from "react";
import ProfileUser from "./ProfileUser";

interface tooltipI {
  content: any;
  children: any;
}
const Tooltip: React.FC<tooltipI> = ({ content, children }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="relative h-full w-fit">
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      {open && (
        <div className="absolute -left-16 md:left-0 md:bottom-10 z-10 p-2 md:w-[500px] w-[350px] text-white bg-cyan-500/10 border border-cyan-500 backdrop-blur-md rounded-md shadow-lg">
          {/* {content} */}
          <button className="absolute top-2 right-2 px-2" onClick={handleClick}>
            x
          </button>
          <ProfileUser user={content}></ProfileUser>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
