import React, { useState } from "react";
import { handleData } from "../utils/functions";
import { Sping } from "./Files";
import Tooltip from "./Tooltip";

const ProfileFollowers: React.FC = () => {
  const [followers, setFollowers] = useState<any[]>([]);

  const [load, setLoad] = useState<boolean>(true);

  const handleFollowers = () => {
    if (followers.length > 0) return;
    handleData(setFollowers, "followers", setLoad);
  };
  return (
    <div>
      <details
        className=""
        onClick={() => {
          handleFollowers();
        }}
      >
        <summary className="font-bold font-mono text-sm text-gray-300">
          Seguidores
        </summary>
        {load && <Sping></Sping>}
        <ul className="">
          {followers.map((follower) => (
            <li
              key={follower.id}
              className="bg-[var(--background-second)] flex items-center py-3 rounded-md"
            >
              <img
                src={follower.avatar_url}
                alt={`${follower.login}'s avatar`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="flex flex-col">
                  <Tooltip content={follower.login}>
                    <a
                      // href={follower.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1677ff] w-fit font-bold font-mono hover:underline"
                    >
                      {follower.login}
                    </a>
                  </Tooltip>
                </div>
                <a
                  href={follower.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-xs font-mono hover:underline"
                >
                  {follower.html_url}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default ProfileFollowers;
