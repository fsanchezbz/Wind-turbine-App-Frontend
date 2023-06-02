import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import './post.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const Post = () => {
  const { t } = useTranslation();
  const [workOrders, setWorkOrders] = useState([]);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(null);
  const [isOpenAddInfo, setIsOpenAddInfo] = useState(false);
  const [addInfo, setAddInfo] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [pdfs, setPdfs] = useState([]); // Add the missing state setter function

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

  // useEffect(() => {
  //   const fetchPdf = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/pdf/all`, { withCredentials: true });
  //       setPdfs(response.data);  
  //       console.log('UseEffect takes all pdfs:', response.data)           
  //     } catch (error) {
  //       console.error('Error fetching work orders:', error);
  //     }
  //   };

  //   fetchPdf();
  // }, []);

  const openAddInfoModal = async (orderId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/work/${orderId}`);
      const { addInfo } = response.data;
      setSelectedWorkOrderId(orderId);
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
      const formData = new FormData();
      formData.append('addInfo', addInfo);
      formData.append('status', true); // Set the status to true when the "Done" button is clicked
      formData.append('pdfs', selectedFile); // Append the selected file to form data

      const response = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_API}/work/update/${selectedWorkOrderId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'
          },
        }
      );
      console.log('Work order updated:', response.data);
      closeAddInfoModal();
      setWorkOrders((prevWorkOrders) =>
        prevWorkOrders.map((workOrder) => {
          if (workOrder.orderId === selectedWorkOrderId) {
            return { ...workOrder, status: true };
          } else {
            return workOrder;
          }
        })
      );
    } catch (error) {
      console.error('Failed to update work order:', error);
    }
  };

  const handleFileUpload = async (orderId) => {
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('pdfs', selectedFile);
      formData.append('orderId', orderId); // Use the orderId parameter

      const response = await axios.post(`${import.meta.env.VITE_PRODUCTION_API}/pdf/upload-pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);

      setUploadedFiles((prevUploadedFiles) => ({
        ...prevUploadedFiles,
        [orderId]: response.data,
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
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
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="card-deck row row-cols-1 row-cols-md-3">
          {workOrders.length > 0 ? (
            workOrders.map((workOrder) => (
              <div
                key={workOrder._id}
                className={`card ${workOrder.status ? 'card-done' : ''}`}
                style={{ width: '18rem', backgroundColor: workOrder.status ? 'green' : '' }}
              >
                <div className="card-body">
                  <div className="card-title">
                    {t('Post.orderStatus')}:{workOrder.status} &nbsp; {!workOrder.status ? t('Post.open') : t('Post.close')}
                  </div>
                  <h5 className="card-title">
                    {t('Post.model')}:&nbsp; <span style={{ fontWeight: 'normal' }}>{workOrder.turbineModel}</span>
                  </h5>
                  <hr />
                  <h5 className="card-title">
                    {t('Post.orderId')}:&nbsp; <span style={{ fontWeight: 'normal' }}>{workOrder.orderId}</span>
                  </h5>
                  <hr />
                  <div
                    
                    
                  >
                    <div className="card-text">
                      <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{t('Post.coordinates')}:&nbsp;</span>{' '}
                      {workOrder.location}
                      <hr />
                    </div>
                    {/* Other card texts */}
                  </div>
                  <FormControl>
                      <FormLabel fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                        {t('Post.fileLabel')}
                      </FormLabel>
                      <Input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} name="pdfs" />
                    </FormControl>
                    <Button onClick={() => handleFileUpload(workOrder.orderId)}>Upload File</Button>
                  <Box marginBottom="1rem">
                   
                  </Box>
                  
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

                  {uploadedFiles[workOrder.orderId] && uploadedFiles[workOrder.orderId].filePath && (
                    <div>
                      <h6>Uploaded File:</h6>
                      <a
                        href={`${import.meta.env.VITE_PRODUCTION_API}/${uploadedFiles[workOrder.orderId].filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {uploadedFiles[workOrder.orderId].filename}
                      </a>
                    </div>
                  )}
                     {/* Display WorkOrder Image Name */}
                     {workOrder.image && (
                      <div>
                        {/* <h6>WorkOrder Image:</h6> */}
                        <a
                          href={workOrder.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'underline', cursor: 'pointer' }}
                        >
                          <h4>Doc Orders:</h4>
                          
                        </a>
                      </div>
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
