import classNames from "classnames";
import ChecklistSvgComponent from "../../assets/svg/checklist";
import TrashSvgComponent from "../../assets/svg/trash";
import { useMutation, useQueryClient } from "react-query";
import { updatedTodo } from "../../api/updateTodo";
import { deleteTodo } from "../../api/deleteTodo";
import ClockSvgComponent from "../../assets/svg/clock";
import { useState } from "react";

import DeleteModal from "../DeleteModel";

type Props = {
  taskId: string;
  title: string;
  status: "completed" | "uncompleted";
};

const TaskCard: React.FC<Props> = ({ title, taskId, status }) => {
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateTodo = useMutation({
    mutationFn: (id: string) => updatedTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const removeTodo = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleRemoveTodo = (type: "delete" | "cancel") => {
    if (type === "delete") {
      removeTodo.mutate(taskId);
      setShowDeleteModal(false);
    }

    if (type === "cancel") {
      setShowDeleteModal(false);
    }
  };

  const containerClass = classNames(
    "flex justify-center items-center relative rounded shadow-lg p-4 mb-2",
    {
      "bg-white text-darkPurple": status === "uncompleted",
      "bg-gray-300 bg-opacity-50": status === "completed",
    }
  );

  const titleClass = classNames(
    "flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate",
    {
      "line-through": status === "completed",
    }
  );

  const chenkListClass = classNames("w-5 h-5 ml-4", {
    "text-green-400": status === "completed",
    "text-green-600": status === "uncompleted",
  });

  return (
    <div className={containerClass}>
      {updateTodo.isError ? (
        <div>An error occurred: updete todo error</div>
      ) : null}
      <p className={titleClass}>{title}</p>

      <div className="flex text-darkPurple">
        <span>
          {updateTodo.isLoading ? (
            <ClockSvgComponent />
          ) : (
            <ChecklistSvgComponent
              className={chenkListClass}
              onClick={() => updateTodo.mutate(taskId)}
            />
          )}
        </span>
        <span className=" w-5 h-5 ml-4 text-red-600">
          <TrashSvgComponent onClick={() => setShowDeleteModal(true)} />
        </span>
      </div>
      <DeleteModal
        inProp={showDeleteModal}
        taskStatus={status}
        onDelete={() => handleRemoveTodo("delete")}
        onCancel={() => handleRemoveTodo("cancel")}
      />
    </div>
  );
};

export default TaskCard;
