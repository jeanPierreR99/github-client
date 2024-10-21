import React from "react";
import ProfileUser from "./ProfileUser";
import ProfileFollowers from "./ProfileFollowers";

const Profile: React.FC = () => {
  return (
    <div className="w-full md:w-2/5 space-y-4">
      <ProfileUser user={"jeanPierreR99"}></ProfileUser>
      <ProfileFollowers></ProfileFollowers>
      <details className="">
        <summary className="font-bold font-mono text-sm text-gray-300">
          Seguidos
        </summary>
      </details>
    </div>
  );
};

export default Profile;
