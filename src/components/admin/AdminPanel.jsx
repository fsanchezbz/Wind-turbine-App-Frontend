import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const tableSize = useBreakpointValue({ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://wind-turbine-app-backend.onrender.com/users/all', {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleFieldChange = async (userId, field, value) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to update the ${field} field?`);
      if (confirmed) {
        console.log(`Updating user ${userId} field ${field} to ${value}`);
        const response = await axios.put(`${import.meta.env.VITE_PRODUCTION_API}/users/update/${userId}`, {
          [field]: value,
        });
        console.log(`Updated user ${userId}:`, response.data);
        fetchUsers(); // Refresh the user list after the update
        toast({
          title: 'User Updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(`Failed to update user ${field}`, error);
      toast({
        title: 'Error Updating User',
        description: 'An error occurred while updating the user. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteField = async (userId, userName) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to DELETE the user:${userName} with ID:${userId} `);
      if (confirmed) {
        console.log(`Deleting user ${userName} ID: ${userId}`);
        const response = await axios.delete(`${import.meta.env.VITE_PRODUCTION_API}/users/delete/${userId}`);
        console.log(`Deleted user ${userName} ID: ${userId}`);
        fetchUsers(); // Refresh the user list after the update
        toast({
          title: 'User Deleted',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(`Failed to delete user ${userName} ID: ${userId}`, error);
      toast({
        title: 'Error Deleting User',
        description: 'An error occurred while Deleting the user. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };



  const toggleAdminStatus = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle the value
      console.log(`Toggling admin status for user ${userId}. New status: ${newStatus}`);
      const response = await axios.put(`${import.meta.env.VITE_PRODUCTION_API}/users/update/${userId}`, {
        isAdmin: newStatus,
      });
      console.log(`Updated user ${userId}:`, response.data);
      fetchUsers(); // Refresh the user list after the update
      toast({
        title: 'Admin Status Updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to update user admin status', error);
      toast({
        title: 'Error Updating Admin Status',
        description: 'An error occurred while updating the admin status. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditField = (userId, userName, userEmail) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setSelectedUserEmail(userEmail);
  };

  const handleEditSubmit = () => {
    if (selectedUserId && selectedUserName && selectedUserEmail) {
      handleFieldChange(selectedUserId, 'userName', selectedUserName);
      handleFieldChange(selectedUserId, 'email', selectedUserEmail);
      setSelectedUserId(null);
      setSelectedUserName('');
      setSelectedUserEmail('');
    }
  };

  return (
    <Box>
      <h2>Admin Panel</h2>
      <Table variant="striped" colorScheme="gray" size={tableSize}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Admin</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user._id}</Td>
              <Td>{user.userName}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Button
                  colorScheme={user.isAdmin ? 'red' : 'green'}
                  onClick={() => toggleAdminStatus(user._id, user.isAdmin)}
                >
                  {user.isAdmin ? 'Make User' : 'Make Admin'}
                </Button>
              </Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleEditField(user._id, user.userName, user.email)}>
                  Edit
                </Button>
              </Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleDeleteField(user._id, user.userName)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={selectedUserId !== null} onClose={() => setSelectedUserId(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                value={selectedUserName}
                onChange={(e) => setSelectedUserName(e.target.value)}
                placeholder="Enter username"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={selectedUserEmail}
                onChange={(e) => setSelectedUserEmail(e.target.value)}
                placeholder="Enter email"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
              Submit
            </Button>
            <Button onClick={() => setSelectedUserId(null)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminPanel;
