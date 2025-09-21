import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Delete = ({ tasks, onDeleteTasks }) => {
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);
  const navigate = useNavigate();

  const toggleTask = (taskId) => {
    if (selectedTasksIds.includes(taskId)) {
      setSelectedTasksIds(selectedTasksIds.filter(id => id !== taskId));
    } else {
      setSelectedTasksIds([...selectedTasksIds, taskId]);
    }
  };

  const handleDelete = () => {
    const updatedTasks = tasks.filter(task => !selectedTasksIds.includes(task.id));
    onDeleteTasks(updatedTasks);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Delete Tasks</h2>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={selectedTasksIds.includes(task.id)}
                onChange={() => toggleTask(task.id)}
                style={{ marginRight: '10px' }}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleDelete}
          disabled={selectedTasksIds.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedTasksIds.length ? '#dc3545' : '#aaa',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedTasksIds.length ? 'pointer' : 'not-allowed'
          }}
        >
          Delete Selected Tasks
        </button>
      </div>
    </div>
  );
};

export default Delete;
