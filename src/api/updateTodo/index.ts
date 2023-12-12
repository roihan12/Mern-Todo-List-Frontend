import axios from "axios";

import { getTodo } from "../getTodo/index";

import { TodoBody } from "../../types/todos.type";

import { TodoStatus } from "../../enums/todos.enum";

export const updatedTodo = async (id: string): Promise<void> => {
  try {
    const getTodores = await getTodo(id);

    if (getTodores.status === 200) {
      const todo = getTodores.data.result;
      const body: TodoBody = {
        title: todo.title,
      };

      todo.status === TodoStatus.completed
        ? (body.status = "uncompleted")
        : (body.status = "completed");

      await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_APP_API_BASE_URL}/api/update-todo/${id}`,
        data: body,
      });
    }
  } catch (error) {
    throw Error("error updating todo");
  }
};
