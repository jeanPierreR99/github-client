import React from "react";
import ContentFiles from "../components/ContentFiles";

const repository: React.FC = () => {
  return (
    <div className="py-10 px-2 md:px-10 bg-gray-50 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-light text-gray-800">Mi Repositorio</h1>
      </div>
      <ContentFiles />
    </div>
  );
};

export default repository;
