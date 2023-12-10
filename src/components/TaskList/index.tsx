import React from "react";
import TaskCard from "../TaskCard";

const TaskList: React.FC = () => {
  return (
    <section className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded">
     <TaskCard title="ini todo pertama"/>
     <TaskCard title="ini todo pertama"/>
     <TaskCard title="ini todo pertama"/>
     <TaskCard title="ini todo pertama"/>
     <TaskCard title="ini todo pertama"/>
     <TaskCard title="ini todo pertama"/>
     <TaskCard title="ini todo pertama"/>
     <TaskCard title="ini todo pertama"/>
    </section>
  );
};

export default TaskList;
