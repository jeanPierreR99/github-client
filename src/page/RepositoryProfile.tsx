import React from "react";
import Profile from "../components/Profile";
import RepoList from "../components/RepoList";

const RepositoryProfile: React.FC = () => {
  return (
    <div className="flex md:flex-row flex-col gap-6 p-4 md:p-10">
      <Profile></Profile>
      <RepoList></RepoList>
    </div>
  );
};

export default RepositoryProfile;
