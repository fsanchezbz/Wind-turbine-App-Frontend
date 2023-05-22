import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import './post.css';

const Post = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addInfo, setAddInfo] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedComments, setSelectedComments] = useState(''); // State for tracking the selected work order comments

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://wind-turbine-app-backend.onrender.com/users/me", { withCredentials: true });
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.log(error);
        setIsAdmin(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get("https://wind-turbine-app-backend.onrender.com/work/all", { withCredentials: true });
        setWorkOrders(response.data);
      } catch (error) {
        console.error("Error fetching work orders:", error);
      }
    };

    fetchWorkOrders();
  }, []);

  const openModal = async (workOrderId) => {
    try {
      const response = await axios.get(`https://wind-turbine-app-backend.onrender.com/work/${workOrderId}`);
      const { addInfo } = response.data;
      setSelectedWorkOrderId(workOrderId);
      setSelectedComments(addInfo);
      setIsOpen(true);
    } catch (error) {
      console.error('Failed to fetch work order comments:', error);
    }
  };

  const closeModal = () => {
    setSelectedWorkOrderId(null);
    setIsOpen(false);
    setAddInfo('');
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`https://wind-turbine-app-backend.onrender.com/work/update/${selectedWorkOrderId}`, {
        addInfo: addInfo,
        status: status
      });
      console.log("Work order updated:", response.data);
      closeModal();
    } catch (error) {
      console.error("Failed to update work order:", error);
    }
  };

  const deleteWorkOrder = async (workOrderId) => {
    try {
      await axios.delete(`https://wind-turbine-app-backend.onrender.com/work/delete/${workOrderId}`,
        { withCredentials: true });
      setWorkOrders((prevWorkOrders) => prevWorkOrders.filter((workOrder) => workOrder._id !== workOrderId));
    } catch (error) {
      console.error("Failed to delete work order:", error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="card-deck">
          {workOrders.length > 0 ? (
            workOrders.map((workOrder) => (
              <div key={workOrder._id} className="card" style={{width: "18rem"}}>
                <div className="card-body">
                  <h5 className="card-title">Turbine Model: {workOrder.turbineModel}</h5>
                  <div className="card-text">Description: {workOrder.description}</div>
                  <div className="card-text">Coordinates: {workOrder.location}</div>
                  <div className="card-text">Technician: {workOrder.technician}</div>
                  <div className="card-text">Date: {workOrder.date.substring(0, 10)}</div>
                  <div className="card-text">Comments: {workOrder.addInfo}</div>
                  {isAdmin && (
                    <Button colorScheme="red" onClick={() => deleteWorkOrder(workOrder._id)}>
                      Delete
                    </Button>
                  )}
                  <div className="card-footer">
                  <Button onClick={() => openModal(workOrder._id)}>Add Info</Button>
                  <Button onClick={() => openModal(workOrder._id)}>View Comments</Button>
                </div>
                </div>
               
              </div>
            ))
          ) : (
            <p>No work orders found.</p>
          )}
        </div>
      </div>
      {selectedWorkOrderId && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Info</ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <FormControl>
                  <FormLabel>Information:</FormLabel>
                  <Input type="text" placeholder="Enter information" value={addInfo} onChange={(e) => setAddInfo(e.target.value)} />
                </FormControl>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} value={status} onClick={() => setStatus(true)}>
                    Done
                  </Button>
                  <Button colorScheme="blue" mr={3} onClick={closeModal}>
                    Close
                  </Button>
                  <Button type="submit" variant="ghost">
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {selectedWorkOrderId && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Comments</ModalHeader>
            <ModalBody>
              <Button colorScheme="blue" mr={3} onClick={closeModal}>
                Close
              </Button>
              <ModalBody>
                <Text className="tech" marginBottom="0.5rem">
                  Comments: {selectedComments}
                </Text>
              </ModalBody>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Post;
