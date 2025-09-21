import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ tasks }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const tasksPerPage = 5;

  // Sort tasks
  const sortedTasks = [...tasks].sort((a, b) => {
    const fieldA = a[sortField].toString().toLowerCase();
    const fieldB = b[sortField].toString().toLowerCase();

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Filtered tasks based on search
  const filteredTasks = sortedTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // Handle sort toggle
  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Task Management App</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          marginBottom: '10px',
          padding: '8px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />

      {/* Table */}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
              ID {sortField === 'id' ? (sortOrder === 'asc' ? '🔼' : '🔽') : '↕️'}
            </th>
            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
              Task Title {sortField === 'title' ? (sortOrder === 'asc' ? '🔼' : '🔽') : '↕️'}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                No matching tasks
              </td>
            </tr>
          ) : (
            currentTasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => navigate('/create')} style={{ marginRight: '10px' }}>Create TASK</button>
        <button onClick={() => navigate('/edit')} style={{ marginRight: '10px' }}>Edit TASK</button>
        <button onClick={() => navigate('/delete')}>Delete TASK</button>
      </div>
    </div>
  );
};

export default Home;
