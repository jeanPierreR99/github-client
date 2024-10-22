import React from "react";
import { API } from "../utils/config";
import useApiFetch from "../hooks/useApiFetch";

interface profileI {
  user: string;
}

const ProfileUser: React.FC<profileI> = ({ user }) => {
  const userQuery = useApiFetch(["user", user], () =>
    API.getFollowerUser(user)
  );

  const achievementsQuery = useApiFetch(["achievements", user], () =>
    API.getAchievements(user)
  );

  const userData = userQuery.data;
  const achievementData = achievementsQuery.data;

  if (userQuery.isLoading || achievementsQuery.isLoading)
    return <div className="text-white">Loading...</div>;
  if (userQuery.error || achievementsQuery.error)
    return (
      <div>
        An error occurred:{" "}
        {userQuery.error?.message || achievementsQuery.error?.message}
      </div>
    );

  return (
    <div className="font-mono space-y-2 rounded-md">
      <div className="space-y-2">
        <div className="flex items-center">
          <img
            src={userData.avatar_url}
            alt={`${userData.name}'s avatar`}
            className="md:w-36 w-24 md:h-36 h-24 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">
              {userData.name || userData.login}
            </h2>
            <p className="text-gray-300">{userData.bio}</p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1677ff] hover:underline"
            >
              @{userData.login}
            </a>
          </div>
        </div>
        <div className="mt-2 text-gray-300 text-xs">
          <span>{userData.public_repos} Repositorios</span> |{" "}
          <span>{userData.followers} Seguidores</span> |{" "}
          <span>{userData.following} Siguiendo</span>
        </div>
        <div className="flex flex-col gap-1 text-xs text-gray-300 font-bold">
          {userData.location && <a>{"📍 " + userData.location}</a>}
          {userData.blog && (
            <a
              href={"http://" + userData.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer w-fit"
            >
              {"💻 " + userData.blog}
            </a>
          )}
          {userData.company && <a>{"🏢 " + userData.company}</a>}
          {userData.email && <a>{"📧 " + userData.email}</a>}
          {userData.twitter_username && (
            <a>{"🐦 " + userData.twitter_username}</a>
          )}
        </div>
      </div>
      {achievementData.length > 0 && (
        <div className="flex flex-col">
          <span className="text-gray-300 text-xs font-bold">🏆 Logros</span>
          <div className="flex gap-1 mt-2">
            {achievementData.length > 0 &&
              achievementData.map((data: any, index: any) => (
                <img key={index} className="md:h-20 h-14 md:w-20 w-14" src={data.path} alt="" />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUser;
