import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import './post.css';

export default function Post({ post }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(null); // State for tracking the selected work order
  const [isOpen, setIsOpen] = useState(false); // State for controlling the modal window
  const [addInfo, setAddInfo] = useState(''); // State for tracking the entered information

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

  const openModal = (workOrderId) => {
    setSelectedWorkOrderId(workOrderId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedWorkOrderId(null);
    setIsOpen(false);
    setAddInfo('');
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // const info = event.target.value 
    // setInformation(info)
    
    try {
      const response = await axios.put(`https://wind-turbine-app-backend.onrender.com/work/update/${selectedWorkOrderId}`, {
        addInfo: addInfo, 
      });
      console.log('Work order updated:', response.data);
      // You can add additional logic here if needed
      closeModal();
    } catch (error) {
      console.error('Failed to update work order:', error);
    }
  };

  return (
    
    <div className='post'>
      <div className="postWrapper">
        <div>
          {workOrders.length > 0 ? (
            workOrders.map((workOrder) => (
              <div key={workOrder._id} className="workOrderCard">
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
                  <Text className='data'>
                    {/* Date: {workOrder.date}   */}
                    Date: {workOrder.date.substring(0, 10)} 
                  </Text>
                  <Button onClick={() => openModal(workOrder._id)}>Add Info</Button>
                  <Text className='tech' marginBottom="0.5rem">
                    Comments: {workOrder.addInfo}
                  </Text>
                

                </Box>
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
                  <Input type="text" placeholder="Enter information" value={addInfo}  onChange={(e) => setAddInfo(e.target.value)} />
                </FormControl>
                {/* Add more form fields as needed */}
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={closeModal}>
                    Close
                  </Button>
                  <Button type="submit" variant="ghost">Save</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
