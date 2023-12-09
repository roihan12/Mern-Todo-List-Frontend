import axios from "axios";

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios({
      method: "DELETE",
      url: `http://localhost:3000/api/remove-todo/${id}`,
    });
  } catch (error) {
    throw new Error("Error Deleting Todo");
  }
};
