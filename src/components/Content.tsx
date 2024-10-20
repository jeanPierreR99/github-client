import React, { useState, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";

const Content: React.FC<any> = ({ name, content }: any) => {
  const [copyStatus, setCopyStatus] = useState("Copiar código");
  const [editorInstance, setEditorInstance] = useState<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monaco.editor.setTheme("vs-dark");
    setEditorInstance(editor);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopyStatus("¡Copiado!");
        setTimeout(() => setCopyStatus("Copiar código"), 2000);
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles: ", err);
        setCopyStatus("Error");
      });
  };

  useEffect(() => {
    if (editorInstance) {
      editorInstance.setScrollTop(0);
    }
  }, [content, editorInstance]);

  return (
    <div
      style={{ position: "sticky", top: "0px" }} // Posición sticky
      className="md:w-2/3 w-full h-full p-4 rounded-lg bg-[#1b1b1b]"
    >
      <div className="flex items-center justify-start gap-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-green-400 font-mono text-sm">{name}</h2>
        <button
          onClick={copyToClipboard}
          className={`flex items-center justify-center gap-2 text-xs py-1 px-3 rounded-lg transition-all duration-200 ${
            copyStatus === "¡Copiado!"
              ? "bg-gray-600 text-gray-300"
              : "bg-gray-800 hover:bg-gray-700 text-green-400"
          }`}
          disabled={copyStatus === "¡Copiado!"}
        >
          {copyStatus !== "¡Copiado!" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
          )}
          {copyStatus}
        </button>
      </div>

      {name === "README.md" ? (
        <div
          style={{ position: "sticky", top: "10px" }} // Posición sticky
          className="markdown-container h-[400px] overflow-y-auto p-4 text-white bg-[#1e1e1e] rounded-lg"
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <Editor
          height="400px"
          language="typescript"
          value={content}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
            readOnly: true,
            fontSize: 14,
            fontFamily: "monospace",
            minimap: { enabled: false },
          }}
          onMount={handleEditorDidMount}
        />
      )}
    </div>
  );
};

export default Content;
