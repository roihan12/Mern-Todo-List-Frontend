import axios from "axios";

import { TodoBody } from "../../types/todos.type";

export const postTodo = async (data: TodoBody): Promise<void> => {

  try {
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/api/add-todo`,
      data: data,
    });
  } catch (error) {
    throw new Error("error post todo");
  }
};
