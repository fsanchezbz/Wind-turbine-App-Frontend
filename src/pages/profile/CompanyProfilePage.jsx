import React, { useState, useEffect } from "react";
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import "./profile.css";
import Map from '../../components/map/Map';
import '../../index.css';
import axios from 'axios';
import ChatFront from "./Chat/ChatFront";
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const CompanyProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedComments, setSelectedComments] = useState(''); // State for tracking the selected work order comments
  const [isOpenComments, setIsOpenComments] = useState(false);
  const { t } = useTranslation(); // Initialize the useTranslation hook

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
      console.error(error);
    }
  };

  return (
    <>
      <div className="profile">
        <div className="profileInfo">
          <h2 className='profileInfoName'>{t('CompanyProfilePage.profilePageTitle')}</h2>
          <span className='profileInfoDesc'>{t('CompanyProfilePage.helloMessage', { name: users.firstName })}</span>
          <Button onClick={() => openCommentsModal()} style={{ marginTop: '10px' }} colorScheme="yellow">{t('CompanyProfilePage.liveChatButton')}</Button>
        </div>
        <Map />
      </div>
      <Modal isOpen={isOpenComments} onClose={closeCommentsModal} isCentered>
        <ModalOverlay />
        <ModalContent justifyContent={'center'}>
          <center><ModalHeader>{t('CompanyProfilePage.chatRoomTitle')}</ModalHeader></center>
          <center><Text>{t('CompanyProfilePage.chatRoomDescription')}</Text></center>
          <ModalBody>
            <center>
              <Button colorScheme="blue" mr={3} onClick={closeCommentsModal}>
                {t('CompanyProfilePage.closeButton')}
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
