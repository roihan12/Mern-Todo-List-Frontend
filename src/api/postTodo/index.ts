import axios from "axios";

import { TodoBody } from "../../types/todos.type";

export const postTodo = async (data: TodoBody): Promise<void> => {
  try {
    await axios({
      method: "POST",
      url: `http://localhost:3000/api/add-todo`,
      data: data,
    });
  } catch (error) {
    throw new Error("error post todo");
  }
};
