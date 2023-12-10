import axios from "axios";

import { getTodo } from "../getTodo/index";

import { TodoBody } from "../../types/todos.type";

import { TodoStatus } from "../../enums/todos.enum";

export const updatedTodo = async (id: string): Promise<void> => {
  console.log("dari api update todo", id);
  try {
    const getTodores = await getTodo(id);

    console.log(getTodores.data.result);

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
        url: `http://localhost:3000/api/update-todo/${id}`,
        data: body,
      });
    }
  } catch (error) {
    console.log("error updating todo");
  }
};
