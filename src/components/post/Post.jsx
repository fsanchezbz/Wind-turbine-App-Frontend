import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import './post.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import ChatFront from '../../pages/profile/Chat/ChatFront';


const Post = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(null);
  const [isOpenAddInfo, setIsOpenAddInfo] = useState(false);
 
  const [addInfo, setAddInfo] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, { withCredentials: true });
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
        const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/work/all`, { withCredentials: true });
        setWorkOrders(response.data);
      } catch (error) {
        console.error("Error fetching work orders:", error);
      }
    };

    fetchWorkOrders();
  }, []);

  const openAddInfoModal = async (workOrderId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/work/${workOrderId}`);
      const { addInfo } = response.data;
      setSelectedWorkOrderId(workOrderId);
      setAddInfo(addInfo);
      setIsOpenAddInfo(true);
      //setStatus(true)
       } catch (error) {
      console.error('Failed to fetch work order comments:', error);
    }
  };

 

  const closeAddInfoModal = () => {
    setSelectedWorkOrderId(null);
    setIsOpenAddInfo(false);
    setAddInfo('');
  };

 

  const handleAddInfoFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_PRODUCTION_API}/work/update/${selectedWorkOrderId}`, {
        addInfo: addInfo,
        status: true, // Set the status to true when the "Done" button is clicked
      });
      console.log("Work order updated:", response.data);
      closeAddInfoModal();
      setWorkOrders((prevWorkOrders) =>
        prevWorkOrders.map((workOrder) => {
          if (workOrder._id === selectedWorkOrderId) {
            return { ...workOrder, status: true };
          } else {
            return workOrder;
          }
        })
      );
    } catch (error) {
      console.error("Failed to update work order:", error);
    }
  };
  

  const deleteWorkOrder = async (workOrderId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_PRODUCTION_API}/work/delete/${workOrderId}`, { withCredentials: true });
      setWorkOrders((prevWorkOrders) => prevWorkOrders.filter((workOrder) => workOrder._id !== workOrderId));
    } catch (error) {
      console.error("Failed to delete work order:", error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="card-deck row row-cols-1 row-cols-md-3">
          {workOrders.length > 0 ? (
            workOrders.map((workOrder) => (
              <div key={workOrder._id} className={`card ${workOrder.status ? 'card-done' : ''}`} style={{ width: "18rem", backgroundColor: workOrder.status ? 'green' : '' }}>
                <div className="card-body">
                 <div className="card-title">Order Status: {!workOrder.status? 'OPEN' :'CLOSE'}</div>
                  <h5 className="card-title">Model: {workOrder.turbineModel}</h5>
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

                  {!workOrder.status && (
                    <>
                      <Button colorScheme="blue" onClick={() => openAddInfoModal(workOrder._id)}>
                        Done
                      </Button>
                      
                    </>
                  )}

                  
                </div>
              </div>
            ))
          ) : (
            <p>No work orders found.</p>
          )}
        </div>
      </div>
      {selectedWorkOrderId && (
        <Modal isOpen={isOpenAddInfo} onClose={closeAddInfoModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Info</ModalHeader>
            <ModalBody>
              <form onSubmit={handleAddInfoFormSubmit}>
                <FormControl>
                  <FormLabel>Information:</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter information"
                    value={addInfo}
                    onChange={(e) => setAddInfo(e.target.value)}
                  />
                </FormControl>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3}  onClick={() => setStatus(true)}>
                    Done
                  </Button>
                  <Button colorScheme="blue" mr={3} onClick={closeAddInfoModal}>
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
      
    </div>
  );
};

export default Post;
