import axios from "axios";

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/api/remove-todo/${id}`,
    });
  } catch (error) {
    throw new Error("Error Deleting Todo");
  }
};
