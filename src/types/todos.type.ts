export interface Todos {
  todos: Todo[];
}

interface Todo {
  _id: string;
  title: string;
  status: "completed" | "uncompleted";
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface GetTodoResult  {
    result : Todo;
}

export interface TodoBody {
    title: string;
    status?: "completed" | "uncompleted"
}