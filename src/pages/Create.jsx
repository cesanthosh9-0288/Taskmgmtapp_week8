import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskInput from '../hooks/useTaskInput';  // custom hook

const Create = ({ onAddTask }) => {
  const newTask = useTaskInput('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (newTask.value.trim() === '') return;
    onAddTask(newTask.value.trim());
    newTask.setValue(''); 
    navigate('/');
  };

  return (
    <div>
      <h1>Create a TASK</h1>
      <input
        placeholder="Enter the New Task"
        type="text"
        {...newTask} // spreads value and onChange props from custom hook
      />
      <button onClick={handleCreate}>Create TASK</button>
    </div>
  );
};

export default Create;
