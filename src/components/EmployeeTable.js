import React, { useState, useEffect } from 'react';
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        alert('Failed to fetch data'); // Display an alert message on failed data fetch
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
      console.log(`Next Page: ${currentPage + 1}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(`Previous Page: ${currentPage - 1}`);
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!error && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeTable;
