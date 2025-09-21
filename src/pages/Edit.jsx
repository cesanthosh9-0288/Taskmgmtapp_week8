import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskInput from '../hooks/useTaskInput'; // Custom hook

const Edit = ({ tasks, onEditTask }) => {
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const updatedTitle = useTaskInput(''); 
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!selectedTaskId || updatedTitle.value.trim() === '') return;

    const updatedTasks = tasks.map(task =>
      task.id === selectedTaskId ? { ...task, title: updatedTitle.value.trim() } : task
    );

    onEditTask(updatedTasks);
    updatedTitle.setValue(''); 
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h1>Edit Task</h1>

      {/* Select Task */}
      <div style={{ marginBottom: '10px' }}>
        <label>Select a task to edit:</label><br />
        <select
          value={selectedTaskId}
          onChange={(e) => {
            const taskId = Number(e.target.value);
            setSelectedTaskId(taskId);
            const taskToEdit = tasks.find(task => task.id === taskId);
            updatedTitle.setValue(taskToEdit ? taskToEdit.title : '');
          }}
        >
          <option value="">-- Select Task --</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      {/* Input New Title */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Enter new title"
          {...updatedTitle} // 
          disabled={!selectedTaskId}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleEdit}
        disabled={!selectedTaskId || updatedTitle.value.trim() === ''}
      >
        Update Task
      </button>
    </div>
  );
};

export default Edit;