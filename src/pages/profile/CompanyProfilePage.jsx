import React, {useState, useEffect } from "react";
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import "./profile.css";
import Map from '../../components/map/Map';
import '../../index.css';
import axios from 'axios';
import ChatFront from "./Chat/ChatFront";



const CompanyProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedComments, setSelectedComments] = useState(''); // State for tracking the selected work order comments
  const [isOpenComments, setIsOpenComments] = useState(false);

  

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, { withCredentials: true });
        setUsers(response.data); // Store the entire user object
       
      } catch (error) {
        console.log(error);
        setUsers(null);
      }
    };

    fetchLoggedInUser();
  }, []);

  const closeCommentsModal = () => {
    setIsOpenComments(false);
  };

  const openCommentsModal = async () => {
    try {
      
      setIsOpenComments(true);
    } catch (error) {
      console.error( error);
    }
  };

  return (
    <>
    <div className="card-footer">
      <Button onClick={() => openCommentsModal()}>Live Chat</Button>
    </div>
      <div className="profile">
        <div className="profileInfo">
          <h4 className='profileInfoName'>Company Profile Page</h4>
          <span className='profileInfoDesc'>Hello {users.firstName}</span>
        </div>
        
        <center><Map /></center>
      </div>
      <Modal isOpen={isOpenComments} onClose={closeCommentsModal} isCentered>
        <ModalOverlay />
        <ModalContent justifyContent={'center'}> 
          <center><ModalHeader>PJ TurbinePro GmbH Chat Room</ModalHeader></center>
          <center><Text>Here in this chat you can talk to all online</Text></center>
          <ModalBody>
            <center>
              <Button colorScheme="blue" mr={3} onClick={closeCommentsModal}>
                Close
              </Button>
            </center>
            <ModalBody style={{ display: 'flex', justifyContent: 'center' }}>
              <ChatFront />
            </ModalBody>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
}

export default CompanyProfilePage;
