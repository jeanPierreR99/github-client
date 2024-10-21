import React, { useEffect, useState } from "react";
import { handleData } from "../utils/functions";

interface profileI {
  user: string;
}
const ProfileUser: React.FC<profileI> = ({ user }) => {
  const [profile, setProfile] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    handleData(setProfile, `/follower/${user}`);
    handleData(setAchievements, `/achievement/${user}`);
  }, []);

  return (
    <div className="font-mono space-y-2 rounded-md">
      {profile && (
        <div className="space-y-2">
          <div className="flex items-center">
            <img
              src={profile.avatar_url}
              alt={`${profile.name}'s avatar`}
              className="md:w-36 w-24 md:h-36 h-24 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">
                {profile.name || profile.login}
              </h2>
              <p className="text-gray-300">{profile.bio}</p>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1677ff] hover:underline"
              >
                @{profile.login}
              </a>
            </div>
          </div>
          <div className="mt-2 text-gray-300 text-xs">
            <span>{profile.public_repos} Repositorios</span> |{" "}
            <span>{profile.followers} Seguidores</span> |{" "}
            <span>{profile.following} Siguiendo</span>
          </div>
          <div className="flex flex-col gap-1 text-xs text-gray-300 font-bold">
            {profile.location && <a>{"📍 " + profile.location}</a>}
            {profile.blog && (
              <a
                href={"http://" + profile.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline cursor-pointer w-fit"
              >
                {"💻 " + profile.blog}
              </a>
            )}
            {profile.company && <a>{"🏢 " + profile.company}</a>}
            {profile.email && <a>{"📧 " + profile.email}</a>}
            {profile.twitter_username && (
              <a>{"🐦 " + profile.twitter_username}</a>
            )}
          </div>
        </div>
      )}
      {achievements.length > 0 && (
        <div className="flex flex-col">
          <span className="text-gray-300 text-xs font-bold">🏆 Logros</span>
          <div className="flex gap-1 mt-2">
            {achievements.length > 0 &&
              achievements.map((data, index) => (
                <img key={index} className="h-20 w-20" src={data.path} alt="" />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUser;
