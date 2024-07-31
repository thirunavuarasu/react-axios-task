// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../api/userService';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleAdd = () => {
    setCurrentUser(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchUsers();
  };

  return (
    <div>
      <button onClick={handleAdd}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showForm && (
        <UserForm user={currentUser} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default UserList;
