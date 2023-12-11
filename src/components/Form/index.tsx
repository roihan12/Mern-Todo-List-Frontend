import React from "react";
import { Transition } from "react-transition-group";
import CloseSvgComponent from "../../assets/svg/close";
import { postTodo } from "../../api/postTodo";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Props = {
  inProp: boolean;
  onClose: () => void;
};

type Inputs = {
  title: string;
  status: "completed" | "uncompleted";
};

const DURATION = 240;

const formDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${
    DURATION * 2
  }ms ease-in-out`,
  opacity: 0,
  bottom: "-180px",
};
const overlayDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${
    DURATION * 2
  }ms ease-in-out`,
  opacity: 0,
  display: "none",
};

const formTransitionStyles = {
  unmounted: { opacity: 0, bottom: "-180px" },
  entering: { opacity: 1, bottom: "0" },
  entered: { opacity: 1, bottom: "0" },
  exiting: { opacity: 0, bottom: "-180px" },
  exited: { opacity: 0, bottom: "-180px" },
};

const overlayTransitionStyles = {
  unmounted: { bottom: "-180px", opacity: 0 },
  entering: { display: "block", opacity: 0.85 },
  entered: { display: "block", opacity: 0.85 },
  exiting: { bottom: "-180px", opacity: 0 },
  exited: { bottom: "-180px", opacity: 0 },
};

const validationSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
    })
    .min(8, { message: "Minimum character is 8!" })
    .max(30, { message: "No more than 30 character" }),
  status: z.enum(["completed", "uncompleted"]),
});

const Form: React.FC<Props> = ({ inProp, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(validationSchema),
  });

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const onSubmit = (data: Inputs): void => {
    try {
      mutation.mutate(data);
    } catch (error) {
      new Error("Error when create todo");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const placeholderStyle = classNames(
    "text-darkPurple flex-1 bg-transparent outline-none",
    {
      "placeholder-red-400": errors.title,
    }
  );

  const inputStyle = classNames(
    "flex justify-center items-center bg-gray-200 px-4 py-2 rounded-lg box-border",
    {
      "bg-red-200": errors.title,
    }
  );

  return (
    <Transition in={inProp} timeout={DURATION}>
      {(state) => (
        <>
          <div
            onClick={onClose}
            style={{
              ...overlayDefaultStyle,
              ...overlayTransitionStyles[state],
            }}
            className="fixed z-10 left-0 top-0 bottom-0 right-0 bg-black"
          />

          <div
            style={{
              ...formDefaultStyle,
              ...formTransitionStyles[state],
            }}
            className="fixed flex flex-col z-10 inset-x-0 rounded-t-lg p-4 h-32 bg-white"
          >
            <form onSubmit={handleSubmit(onSubmit)} className={inputStyle}>
              <input
                {...register("title")}
                placeholder={
                  errors.title ? ".....Ooops!" : "Create a new todo..."
                }
                className={placeholderStyle}
              />
              <input
                {...register}
                name="status"
                defaultValue="uncompleted"
                className="hidden"
              />

              {errors.title ? (
                <button onClick={() => reset()}>Reset</button>
              ) : (
                <input
                  onClick={() => setValue("status", "uncompleted")}
                  type="submit"
                  value="Add"
                  className="bg-transparent text-md font-bold text-darkPurple outline-none ml-1"
                />
              )}
            </form>

            {errors.title && (
              <p className="text-xs text-red-500 mt-2 font-semibold tracking-wide pl-1">
                {errors.title?.message}
              </p>
            )}

            <span
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                bottom: "10px",
                left: "50%",
              }}
            >
              <CloseSvgComponent onClick={handleClose} />
            </span>
          </div>
        </>
      )}
    </Transition>
  );
};

export default Form;
