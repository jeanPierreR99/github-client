import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_PATH } from "../utils/config";
import { Sping } from "./Files";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [followers, setFollowers] = useState<any[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_PATH}/user`);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching the profile:", error);
    }
  };

  const fetchFollowers = async () => {
    try {
      setLoad(true);
      const response = await axios.get(`${API_PATH}/followers`);
      setFollowers(response.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error("Error fetching followers:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <div>Cargando perfil...</div>;

  return (
    <div className="w-full md:w-2/5 space-y-4">
      {/* Sección del Perfil */}
      <div className="font-mono space-y-2 p-2 rounded-md">
        <div className="flex items-center">
          <img
            src={profile.avatar_url}
            alt={`${profile.name}'s avatar`}
            className="w-24 h-24 rounded-full mr-4"
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
            <div className="mt-2 text-gray-300 text-xs">
              <span>{profile.public_repos} Repositorios</span> |{" "}
              <span>{profile.followers} Seguidores</span> |{" "}
              <span>{profile.following} Siguiendo</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-xs text-gray-300 font-bold">
          <a>📍 {profile.location}</a>
          <a className="hover:underline cursor-pointer">💻 {profile.blog}</a>
        </div>
      </div>
      {/* Sección de Seguidores */}
      <details
        className=""
        onClick={() => {
          fetchFollowers();
        }}
      >
        <summary className="font-bold font-mono text-sm text-gray-300">
          Seguidores
        </summary>
        {load && <Sping></Sping>}
        <ul className="space-y-4">
          {followers.map((follower) => (
            <li
              key={follower.id}
              className="p-2 bg-[var(--background-second)] flex items-center py-6 rounded-md"
            >
              <img
                src={follower.avatar_url}
                alt={`${follower.login}'s avatar`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="flex flex-col">
                  <a
                    href={follower.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1677ff] font-bold font-mono hover:underline"
                  >
                    {follower.login}
                  </a>
                  <a
                    href={follower.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 text-xs font-mono hover:underline"
                  >
                    {follower.url}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </details>

      <details className="">
        <summary className="font-bold font-mono text-sm text-gray-300">
          Seguidos
        </summary>
      </details>
    </div>
  );
};

export default Profile;
