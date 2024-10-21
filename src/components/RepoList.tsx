import React, { useEffect, useState } from "react";
import ContentFiles from "./ContentFiles";
import { handleData } from "../utils/functions";

const LanguageIndicator = ({ data }: any) => {
  const languageColors: any = {
    javascript: "#F7DF1E",
    python: "#3776AB",
    java: "#007396",
    ruby: "#CC342D",
    go: "#00ADD8",
    php: "#4F5B93",
    csharp: "#68217A",
    typescript: "#007ACC",
  };

  const language = data || "Sin lenguaje";
  const color = languageColors[language.toLowerCase()] || "#808080";

  return (
    <span className="flex items-center justify-center text-xs">
      <svg width="16" height="16" style={{ fill: color }}>
        <circle cx="8" cy="8" r="8" />
      </svg>
      <span style={{ marginLeft: "5px" }} className="text-xs">
        {language}
      </span>
    </span>
  );
};

const RepoList: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(7);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para la búsqueda
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState<string>("");

  const openModal = (u: string) => {
    setUrl(u);
    setIsModalOpen(true);
  };

  const closeModal = (content: any) => {
    content("");
    setIsModalOpen(false);
  };

  const handleRepo = async () => {
    await handleData(setRepos, "/repo");
    setRepos((prevRepos) => {
      return prevRepos.sort(
        (a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });
  };

  useEffect(() => {
    handleRepo();
  }, []);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000); // Años
    if (interval >= 1) return `${interval} año${interval > 1 ? "s" : ""} atrás`;

    interval = Math.floor(seconds / 2592000); // Meses
    if (interval >= 1)
      return `${interval} mes${interval > 1 ? "es" : ""} atrás`;

    interval = Math.floor(seconds / 86400); // Días
    if (interval >= 1) return `${interval} día${interval > 1 ? "s" : ""} atrás`;

    interval = Math.floor(seconds / 3600); // Horas
    if (interval >= 1)
      return `${interval} hora${interval > 1 ? "s" : ""} atrás`;

    interval = Math.floor(seconds / 60); // Minutos
    if (interval >= 1)
      return `${interval} minuto${interval > 1 ? "s" : ""} atrás`;

    return "justo ahora";
  };

  // Filtrar repositorios por lenguaje seleccionado y término de búsqueda
  const filteredRepos = repos.filter((repo) => {
    const matchesLanguage =
      !selectedLanguage ||
      repo.language?.toLowerCase() === selectedLanguage.toLowerCase();

    const matchesSearchTerm = repo.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesLanguage && matchesSearchTerm;
  });

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;

  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

  return (
    <div className="w-full md:w-3/5 font-mono">
      <div className="flex gap-4 items-center mb-4">
        <input
          type="search"
          className="w-2/3 bg-[var(--background-second)] border-b text-gray-300 border-gray-600 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado al cambiar
        />

        <div className="relative w-1/3">
          <select
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="block appearance-none w-full bg-[var(--background-second)] text-sm border-b border-gray-600 text-gray-300 px-2 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="php">PHP</option>
            <option value="csharp">C#</option>
            <option value="typescript">TypeScript</option>
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-300 pointer-events-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 10l5 5l5-5H7z"
              />
            </svg>
          </div>
        </div>
      </div>

      <ul className="">
        {currentRepos.map((repo) => (
          <li
            key={repo.id}
            className="border-t  border-gray-600 justify-between items-center flex gap-2 p-2 py-6"
          >
            <div className="flex justify-between flex-col gap-4">
              <a
                onClick={() => openModal(repo.name)}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                {repo.name}
              </a>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 text-xs font-mono hover:underline"
              >
                {repo.html_url}
              </a>
            </div>
            <div className="text-gray-300 text-xs flex flex-col gap-4 items-center">
              <LanguageIndicator data={repo.language} />
              <span>{getTimeAgo(new Date(repo.updated_at))}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-xs text-gray-300">
          Total Repo {filteredRepos.length}
        </span>
        <div className="flex justify-end gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2  hover:border-b ${
                currentPage === index + 1
                  ? "border-b text-white"
                  : "text-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal para mostrar contenido */}
      <ContentFiles isOpen={isModalOpen} onClose={closeModal} urlRepo={url} />
    </div>
  );
};

export default RepoList;
