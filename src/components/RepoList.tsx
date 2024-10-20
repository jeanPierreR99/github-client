import React, { useEffect, useState } from "react";
import ContentFiles from "./ContentFiles";
import { API_PATH } from "../utils/config";

const LanguageIndicator = ({ data }: any) => {
  // Mapa de lenguajes a colores
  const languageColors: any = {
    javascript: "#F7DF1E", // Amarillo
    python: "#3776AB", // Azul
    java: "#007396", // Azul oscuro
    ruby: "#CC342D", // Rojo
    go: "#00ADD8", // Cyan
    php: "#4F5B93", // Morado
    csharp: "#68217A", // Morado oscuro
    typescript: "#007ACC", // Azul claro
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState<string>("");

  const openModal = (u: string) => {
    setUrl(u);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleRepo = async () => {
      try {
        const response = await fetch(`${API_PATH}/repo`);

        if (!response.ok) {
          throw new Error("Error al obtener repositorios");
        }

        const data = await response.json();
        console.log(data);
        data.sort(
          (a: any, b: any) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setRepos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

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

  // Filtrar repositorios por lenguaje seleccionado
  const filteredRepos = selectedLanguage
    ? repos.filter(
        (repo) =>
          repo.language?.toLowerCase() === selectedLanguage.toLowerCase()
      )
    : repos;

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;

  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

  return (
    <div className="w-full font-mono">
      <div className="flex gap-2 items-center mb-4">
        <input
          type="search"
          className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          placeholder="Buscar"
        />

        <div className="relative w-1/3">
          <select
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
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
                d="M7 10l5 5 5-5H7z"
              />
            </svg>
          </div>
        </div>
      </div>

      <ul className="">
        {currentRepos.map((repo) => (
          <li
            key={repo.id}
            className="bg-white w-fit border-b flex flex-col gap-2 p-4 py-6"
          >
            <a
              onClick={() => {
                openModal(repo.name);
              }}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              {repo.name}
            </a>
            <div className="text-gray-500 text-xs flex gap-6 items-center">
              <LanguageIndicator data={repo.language} />
              <span>{getTimeAgo(new Date(repo.updated_at))}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-xs text-gray-500">
          Total Repo {filteredRepos.length}
        </span>
        <div className="flex justify-end gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-500"
              } hover:bg-blue-600 hover:text-white transition duration-200`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <ContentFiles isOpen={isModalOpen} onClose={closeModal} urlRepo={url} />
    </div>
  );
};

export default RepoList;