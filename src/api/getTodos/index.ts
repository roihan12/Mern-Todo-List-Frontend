import { Todos } from "./../../types/todos.type";
import axios from "axios";

export const getTodos = async (): Promise<Todos> => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/todos`);
    return res.data;
    console.log("data get todos", res.data);
  } catch (error) {
    throw new Error("error get todos");
  }
};
