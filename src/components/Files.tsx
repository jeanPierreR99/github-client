import React, { useEffect, useState } from "react";
import { API_PATH } from "../utils/config";

interface FileItem {
  sha: string;
  path: string;
  type: string;
  url: string;
}

export const Sping = () => (
  <div className="flex items-center justify-center">
    <svg
      className="w-8 h-8 text-gray-600 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
);
const Files: React.FC<any> = ({ setContent, setName, urlRepo }: any) => {
  if (!urlRepo) {
    return;
  }
  const [filesData, setFilesData] = useState<FileItem[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [folderContents, setFolderContents] = useState<
    Record<string, FileItem[]>
  >({});

  const fetchFiles = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    setLoad(false);
    return response.json();
  };

  const handleFiles = async () => {
    const files = await fetchFiles(`${API_PATH}/contents/${urlRepo}`);
    setFilesData(files.tree || []);
  };

  const handleContent = async (name: string, url: string) => {
    const fileContent = await fetchFiles(url);
    const aux = atob(fileContent.content);
    setName(name);
    setContent(aux);
  };

  useEffect(() => {
    handleFiles();
  }, []);

  const renderFiles = (items: FileItem[]) => {
    return items.map((item) => {
      if (item.type === "blob") {
        return (
          <li
            onClick={() => {
              handleContent(item.path, item.url);
            }}
            key={item.sha}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 p-1 rounded transition-colors"
          >
            <span className="text-green-500">📄</span>
            <span className="text-gray-300">{item.path}</span>
          </li>
        );
      } else if (item.type === "tree") {
        return (
          <details
            key={item.sha}
            className="group"
            onToggle={() => handleToggleFolder(item.url)}
          >
            <summary className="cursor-pointer hover:bg-gray-800 rounded transition flex ml-1 items-center p-1">
              <span className="text-yellow-500">📁</span>
              <span className="text-gray-300">{item.path}</span>
            </summary>
            <ul className="pl-4 mt-2 space-y-1">
              {folderContents[item.url]
                ? renderFiles(folderContents[item.url])
                : null}
            </ul>
          </details>
        );
      }
      return null;
    });
  };

  const handleToggleFolder = async (url: string) => {
    if (!folderContents[url]) {
      try {
        const folderData = await fetchFiles(url);
        setFolderContents((prev) => ({
          ...prev,
          [url]: folderData.tree || [],
        }));
      } catch (error) {
        console.error("Error al obtener contenidos:", error);
      }
    }
  };

  return (
    <div className="w-full scroll-style md:w-1/3 h-auto md:overflow-y-auto content-ul     p-4 rounded-lg">
      <ul className="flex flex-col text-sm font-mono text-gray-400 gap-2">
        {renderFiles(filesData)}
      </ul>
      {load && <Sping></Sping>}
    </div>
  );
};

export default Files;
