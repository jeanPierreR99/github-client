import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_PATH } from "../utils/config";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [followers, setFollowers] = useState<any[]>([]);
  const token = "tu_token_aqui"; // Asegúrate de usar tu token aquí

  useEffect(() => {
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
        const response = await axios.get(`${API_PATH}/followers`);
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchProfile();
    fetchFollowers();
  }, [token]);

  if (!profile) return <div>Cargando perfil...</div>;
  if (followers.length === 0) return <div>Cargando seguidores...</div>;

  return (
    <div className="w-full">
      {/* Sección del Perfil */}
      <div className="flex items-center p-6 bg-white mb-6 font-mono">
        <img
          src={profile.avatar_url}
          alt={`${profile.name}'s avatar`}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {profile.name || profile.login}
          </h2>
          <p className="text-gray-600">{profile.bio}</p>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            @{profile.login}
          </a>
          <div className="mt-2 text-gray-500 text-xs">
            <span>{profile.public_repos} Repositorios</span> |{" "}
            <span>{profile.followers} Seguidores</span> |{" "}
            <span>{profile.following} Siguiendo</span>
          </div>
        </div>
      </div>

      {/* Sección de Seguidores */}
      {/* Sección de Seguidores */}
      <fieldset className="border p-4 rounded-lg">
        <legend className="font-mono text-md text-black">Seguidores</legend>
        <ul className="">
          {followers.map((follower) => (
            <li
              key={follower.id}
              className="flex items-center bg-white p-4 py-6 border-b"
            >
              <img
                src={follower.avatar_url}
                alt={`${follower.login}'s avatar`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <a
                  href={follower.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold font-mono hover:underline"
                >
                  {follower.login}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
};

export default Profile;
