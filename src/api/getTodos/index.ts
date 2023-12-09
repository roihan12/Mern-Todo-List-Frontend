import { Todos } from "./../../types/todos.type";
import axios from "axios";

export const getTodos = async (): Promise<Todos> => {
  try {
    const res = await axios.get("http://localhost:3000/api/todos");
    return res.data;
  } catch (error) {
    throw new Error("error get todos");
  }
};
