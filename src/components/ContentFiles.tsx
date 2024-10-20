import React, { useState } from "react";
import Content from "./Content";
import Files from "./Files";

const ContentFiles: React.FC<any> = ({ isOpen, onClose, urlRepo }: any) => {
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");

  if (!isOpen) return null; // Si el modal no está abierto, no renderizar nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 m-auto px-2">
        <div className=" flex p-4 justify-between">
          <h2 className="text-xl font-bold">{urlRepo}</h2>
          <button
            onClick={onClose}
            className=" top-2 text-2xl right-2 text-gray-600 hover:text-gray-900"
          >
            &times;{/* Icono de cerrar */}
          </button>
        </div>
        <div className="h-[80vh] overflow-y-auto pb-4">
          <div className="md:flex-row flex flex-col gap-2">
            <Files setContent={setContent} setName={setName} urlRepo={urlRepo}/>
            <Content content={content} name={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentFiles;
