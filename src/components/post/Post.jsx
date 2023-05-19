import React, { useState, useEffect } from 'react';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import axios from 'axios';
import './post.css';

export default function Post({ post }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State for controlling the modal window
  const separatedWorkOrderId = "6464c202a5b48338cd94f1a8"; // ID of the work order to separate

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get('https://wind-turbine-app-backend.onrender.com/work/all');
        setWorkOrders(response.data);
      } catch (error) {
        console.error('Error fetching work orders:', error);
      }
    };

    fetchWorkOrders();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='post'>
      <div className="postWrapper">
       
          <div>
            {workOrders.length > 0 ? (
              workOrders.map((workOrder) => (
                <div key={workOrder._id} className={workOrder._id === separatedWorkOrderId ? "separatedWorkOrderCard" : "workOrderCard"}>
                  <Box>
                    <Text className='model' marginBottom="0.5rem">
                      Turbine Model: {workOrder.turbineModel}
                    </Text>
                    <Text className='des' marginBottom="0.5rem">
                      Description: {workOrder.description}
                    </Text>
                    <Text className='des' marginBottom="0.5rem">
                      Location: {workOrder.location}
                    </Text>
                    <Text className='tech' marginBottom="0.5rem">
                      Technician: {workOrder.technician}
                    </Text>
                    <Text className='data'>Date: {workOrder.date}</Text>
                  </Box>
                </div>
              ))
            ) : (
              <p>No work orders found.</p>
            )}
          </div>
        </div>
        <div className="postBottom">
          <Button onClick={openModal}>Add Work Order</Button>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Work Order</ModalHeader>
              <ModalBody>
                {/* Add your form fields for adding work order information */}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={closeModal}>
                  Close
                </Button>
                <Button variant="ghost">Save</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
    </div>
  );
}
