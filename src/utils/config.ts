import axios from "axios";

// export const API_PATH = "http://localhost:3000/api/github";
export const API_PATH = "https://github-server-ten.vercel.app/api/github";

export const API = {
  getUser: async () => {
    const response = await axios.get(`${API_PATH}/user`);
    return response.data;
  },
  getFollowers: async () => {
    const response = await axios.get(`${API_PATH}/followers`);
    return response.data;
  },
  getRepo: async () => {
    const response = await axios.get(`${API_PATH}/repo`);
    return response.data;
  },
  getContents: async (name: string) => {
    const response = await axios.get(`${API_PATH}/contents/${name}`);
    return response.data;
  },
  getReadme: async (name: string) => {
    const response = await axios.get(`${API_PATH}/readme/${name}`);
    return response.data;
  },
  getContentsFile: async (name: string, path: string) => {
    const response = await axios.get(
      `${API_PATH}/contents/file/${name}/${path}`
    );
    return response.data;
  },
  getAchievements: async (name: string) => {
    const response = await axios.get(`${API_PATH}/achievement/${name}`);
    return response.data;
  },
  getFollowerUser: async (name: string) => {
    const response = await axios.get(`${API_PATH}/follower/${name}`);
    return response.data;
  },
};
