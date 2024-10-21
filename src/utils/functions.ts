import axios from "axios";
import { API_PATH } from "./config";

export const handleData = async (
  setEstado: any,
  path: string,
  setLoad?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if (setLoad) setLoad(true);
    const response = await axios.get(`${API_PATH}/${path}`);
    setEstado(response.data);
    if (setLoad) setLoad(false);
  } catch (error) {
    if (setLoad) setLoad(false);
    console.error("Error fetching the profile:", error);
  }
};
