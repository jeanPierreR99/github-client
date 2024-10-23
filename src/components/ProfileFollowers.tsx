import React, { useState } from "react";
import { Sping } from "./Files";
import Tooltip from "./Tooltip";
import useApiFetch from "../hooks/useApiFetch";
import { API } from "../utils/config";

const Followers = () => {
  const {
    data: followers,
    error,
    isLoading,
  } = useApiFetch(["followers"], API.getFollowers);

  if (isLoading) return <Sping></Sping>;
  if (error) return <div>An error occurred: {error?.message}</div>;

  return (
    <ul className="">
      {followers?.map((follower: any) => (
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-500 w-fit font-bold font-mono hover:underline"
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
              🌐 {follower.html_url}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};
const ProfileFollowers: React.FC = () => {
  const [isVisible, setIsvisible] = useState<boolean>(false);

  const handleFollowers = () => {
    setIsvisible(true);
  };

  return (
    <div>
      <details className="" onClick={handleFollowers}>
        <summary className="font-bold font-mono text-sm text-gray-300">
          Seguidores
        </summary>
        {isVisible && <Followers></Followers>}
      </details>
    </div>
  );
};

export default ProfileFollowers;
