import React, { createContext, useContext, useState, ReactNode } from "react";

interface userGitContextType {
  userGit: string;
  setUserGit: (userGit: string) => void;
}

const GitHubContext = createContext<userGitContextType | undefined>(undefined);

export const GitHubProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userGit, setUserGit] = useState("");

  const userGitContextValue: userGitContextType = {
    userGit,
    setUserGit,
  };

  return (
    <GitHubContext.Provider value={userGitContextValue}>
      {children}
    </GitHubContext.Provider>
  );
};

export const useGitHub = (): userGitContextType => {
  const context = useContext(GitHubContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
