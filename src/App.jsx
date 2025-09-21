import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from "./pages/Home"
import Create from "./pages/Create"
import Edit from "./pages/Edit"
import Delete from "./pages/Delete"

function App() {
  const [tasks, setTasks] = useState( [ 
          {id: 1, title: "Calculate the budgets"}, 
          { id: 2, title: "Track your Workouts" },
          { id: 3, title: "House Cleaning" },
          { id: 4, title: "Buy the Groceries" }])

  const addTask = (taskTitle) => {
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id +1 : 1;
    const newTask = {id: newId, title: taskTitle};
    setTasks([...tasks, newTask]);

  };
  return (
    <BrowserRouter>
      <div>
        

        {/* Routes*/}

        <Routes>
          {/* Home Page*/}
          <Route path="/" element={<Home tasks = {tasks} />} />
          {/* Create Page*/}
          <Route path="/create" element={<Create onAddTask = {addTask} />} />
          {/* Edit Page*/}
            <Route path="/edit" element={<Edit tasks={tasks} onEditTask={setTasks} />} /> 
          {/* Delete Page*/}
            <Route path="/delete" element={<Delete tasks = {tasks} onDeleteTasks = {setTasks} />} /> 
          {/* Rest of all pages*/}
            < Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;
