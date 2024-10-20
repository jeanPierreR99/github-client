import React, { useEffect, useState } from "react";
import { API_PATH } from "../utils/config";

interface FileItem {
  sha: string;
  path: string;
  type: string;
  url: string;
}

const Files: React.FC<any> = ({ setContent, setName, urlRepo }: any) => {
  if (!urlRepo) {
    return;
  }
  const [filesData, setFilesData] = useState<FileItem[]>([]);
  const [folderContents, setFolderContents] = useState<
    Record<string, FileItem[]>
  >({});

  const fetchFiles = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return response.json();
  };

  const handleFiles = async () => {
    const files = await fetchFiles(`${API_PATH}/contents/${urlRepo}`);
    setFilesData(files.tree || []);
  };

  const handleContent = async (name: string, url: string) => {
    const fileContent = await fetchFiles(url);
    setName(name);
    setContent(atob(fileContent.content));
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
    <div className="w-full md:w-1/3 h-full content-ul bg-[#1b1b1b] border border-gray-700 p-4 rounded-lg shadow-lg">
      <ul className="flex flex-col text-sm font-mono text-gray-400 gap-2">
        {renderFiles(filesData)}
      </ul>
    </div>
  );
};

export default Files;
