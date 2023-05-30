import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './post.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import ChatFront from '../../pages/profile/Chat/ChatFront';

const Post = () => {
  const { t } = useTranslation();
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
        console.error('Error fetching work orders:', error);
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
      console.error('Failed to delete work order:', error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="card-deck row row-cols-1 row-cols-md-3">
          {workOrders.length > 0 ? (
            workOrders.map((workOrder) => (
              <div key={workOrder._id} className={`card ${workOrder.status ? 'card-done' : ''}`} style={{ width: '18rem', backgroundColor: workOrder.status ? 'green' : '' }}>
                <div className="card-body">
                  <div className="card-title">
                    {t('Post.orderStatus')}:{workOrder.status} &nbsp; {!workOrder.status ?  t('Post.open') : t('Post.close') }        
                  </div>
                  <h5 className="card-title">
                    {t('Post.model')}:&nbsp; <span style={{fontWeight: 'normal'}}>{workOrder.turbineModel}</span>
                  </h5>
                  <hr />
                  <div style={{ border: '1px solid black', padding: '10px', borderRadius: '10px' ,boxShadow: '0px 0px 16px 1px rgba(0, 0, 0, 0.68)' }}>
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.description')}:&nbsp;</span> {workOrder.description}
                      <hr />
                    </div>
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.coordinates')}:&nbsp;</span> {workOrder.location}
                      <hr />
                    </div>
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.technician')}:&nbsp;</span> {workOrder.technician}
                      <hr />
                    </div>
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.date')}:&nbsp;</span> {workOrder.date.substring(0, 10)}  
                    </div>
                    <hr />
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.name')}:&nbsp;</span> {workOrder.name}  
                    </div>
                    <hr />
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.dateTime')}:&nbsp;</span> {workOrder.dateTime}  
                    </div>
                    <hr />
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.email')}:&nbsp;</span> {workOrder.email}  
                    </div>
                    <hr />
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.phone')}:&nbsp;</span> {workOrder.phone}  
                    </div>
                    <hr />
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.requestDetails')}:&nbsp;</span> {workOrder.requestDetails}  
                    </div>
                    <hr />
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.bestTimes')}:&nbsp;</span> {workOrder.bestTimes}  
                    </div>
                    <hr />
                    <div className="card-text">
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>{t('Post.completionDate')}:&nbsp;</span> {workOrder.completionDate}  
                    </div>
                  </div>
                  <hr />

                  {/* const [turbineModel, setTurbineModel] = useState('');
                      const [description, setDescription] = useState('');
                      const [location, setLocation] = useState('');
                      const [technician, setTechnician] = useState('');
                      const [date, setDate] = useState('');
                      const [name, setName] = useState('');
                      const [dateTime, setDateTime] = useState('');
                      const [email, setEmail] = useState('');
                      const [phone, setPhone] = useState('');
                      const [requestDetails, setRequestDetails] = useState('');
                      const [bestTimes, setBestTimes] = useState('');
                      const [completionDate, setCompletionDate] = useState(''); */}
                  {isAdmin && (
                    <Button colorScheme="red" onClick={() => deleteWorkOrder(workOrder._id)}>
                      {t('Post.deleteButton')}
                    </Button>
                  )}
                  &nbsp;
                  {!workOrder.status && (
                    <>
                      <Button colorScheme="blue" onClick={() => openAddInfoModal(workOrder._id)}>
                        {t('Post.doneButton')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>{t('Post.noWorkOrders')}</p>
          )}
        </div>
      </div>
      {selectedWorkOrderId && (
        <Modal isOpen={isOpenAddInfo} onClose={closeAddInfoModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{t('Post.addInfoModalTitle')}</ModalHeader>
            <ModalBody>
              <form onSubmit={handleAddInfoFormSubmit}>
                <FormControl>
                  <FormLabel>{t('Post.informationLabel')}:</FormLabel>
                  <Input
                    type="text"
                    placeholder={t('Post.informationPlaceholder')}
                    value={addInfo}
                    onChange={(e) => setAddInfo(e.target.value)}
                  />
                </FormControl>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={() => setStatus(true)}>
                    {t('Post.doneButton')}
                  </Button>
                  <Button colorScheme="blue" mr={3} onClick={closeAddInfoModal}>
                    {t('Post.closeButton')}
                  </Button>
                  <Button type="submit" variant="ghost">
                    {t('Post.saveButton')}
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
