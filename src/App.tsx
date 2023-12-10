import Form from "./components/Form";
import  { useState } from "react";
import Header from "./components/Header";
import PlusButton from "./components/PlusButton";
import TaskList from "./components/TaskList";
function App() {

  const [showForm, setShowForm] = useState(false)

  return (
      <main className="container relative bg-darkPurple mx-auto max-w-lg p-4 box-border min-h-screen">
        <Header />
        <TaskList />
        <Form inProp= {showForm} onClose={() => setShowForm(false)}/>
        <PlusButton onClick={() => setShowForm(!showForm)}/>
      </main>
  );
}

export default App;
