import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://wind-turbine-app-backend.onrender.com/users/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`https://wind-turbine-app-backend.onrender.com/users/${userId}`, { role: newRole });
      fetchUsers(); // Refresh the user list after the update
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  const handleAdminChange = async (userId, newIsAdmin) => {
    try {
      await axios.put(`https://wind-turbine-app-backend.onrender.com/users/${userId}`, { isAdmin: newIsAdmin });
      fetchUsers(); // Refresh the user list after the update
    } catch (error) {
      console.error('Failed to update user admin status', error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={(e) =>
                    handleAdminChange(user._id, e.target.checked)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add other admin panel functionality here */}
    </div>
  );
};

export default AdminPanel;
