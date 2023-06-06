import React, { useState } from 'react';
import {
  Box,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './WorkOrder.css';

const WorkOrder = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [orderId, setOrderId] = useState('');
  const [turbineModel, setTurbineModel] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [technician, setTechnician] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [bestTimes, setBestTimes] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const generateWorkOrderImage = async () => {
    try {
      // Fetch the image URL from the backend API
      const pngresponse = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/png/file/647dcbb8d62bb06bcf8ee356`);
      const pngImage = pngresponse.data;

      const existingImageBytes = await fetch(pngImage).then((res) => res.arrayBuffer());
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = URL.createObjectURL(new Blob([existingImageBytes]));
      });
     

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);

      function drawTextBox(x, y, width, height, text, fontSize) {
        const padding = 10;
        const textX = x + padding;
        const textY = y + padding;
        const availableWidth = width - 2 * padding;
        const availableHeight = height - 2 * padding;
      
        context.fillStyle = 'transparent'; // Box background color
        context.fillRect(x, y, width, height);
      
        const lines = [];
        let currentLine = '';
      
        context.font = `${fontSize}px Helvetica`;
        context.fillStyle = '#000000'; // Text color
      
        for (let i = 0; i < text.length; i++) {
          currentLine += text[i];
      
          if (currentLine.length === 80 || i === text.length - 1) {
            lines.push(currentLine);
            currentLine = '';
          }
        }
      
        let lineY = textY;
        let lineHeight = fontSize; // Adjust line height as needed
      
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          context.fillText(line, textX, lineY);
          lineY += lineHeight;
        }
      }
      
      
      

      drawTextBox(105, 112, 280, 60, turbineModel, 10);
      drawTextBox(306, 112, 180, 60, description, 10);
      drawTextBox(114, 145, 280, 60, location, 10);
      drawTextBox(114, 170, 180, 60, technician, 10);
      drawTextBox(301, 219, 180, 60, date, 10);
      drawTextBox(100, 220, 180, 60, name, 10);
      drawTextBox(100, 253, 180, 60, email, 10);
      drawTextBox(301, 250, 180, 60, phone, 10);
      drawTextBox(55, 319, 840, 100, requestDetails, 10);
      drawTextBox(200, 448, 180, 60, bestTimes, 10);
      drawTextBox(200, 477, 180, 60, completionDate, 10);

      const imageDataUrl = canvas.toDataURL('/png');
      const imageBlob = await (await fetch(imageDataUrl)).blob();

      const formData = new FormData();
      formData.append('upload_preset', 'v2ng3uyg'); // Cloudinary upload preset
      formData.append('file', imageBlob, orderId);

      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/windturbineprofile/image/upload',
        formData
      );

      const imageUrl = uploadResponse.data.url;

      const response = await axios.post(`${import.meta.env.VITE_PRODUCTION_API}/work/work-orders`, {
        orderId: orderId,
        turbineModel: turbineModel,
        description: description,
        location: location,
        technician: technician,
        date: date,
        name: name,
        email: email,
        phone: phone,
        requestDetails: requestDetails,
        bestTimes: bestTimes,
        completionDate: completionDate,
        image: imageUrl, // Pass the Cloudinary image URL to the server
      });

      setOrderId('');
      setTurbineModel('');
      setDescription('');
      setLocation('');
      setTechnician('');
      setDate('');
      setName('');
      setEmail('');
      setPhone('');
      setRequestDetails('');
      setBestTimes('');
      setCompletionDate('');

      setIsConfirmationOpen(false);

      // Show success toast notification
      toast({
        title: 'Work Order Submitted',
        description: 'The work order has been successfully submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error generating images:', error);

      // Show error toast notification
      toast({
        title: 'Error Submitting Work Order',
        description: 'An error occurred while submitting the work order. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Open confirmation modal
    setIsConfirmationOpen(true);
  };

  const handleWorkOrderSubmit = async () => {
    setIsConfirmationOpen(false);
    try {
      await generateWorkOrderImage();
    } catch (error) {
      console.error('Error submitting work order:', error);
    }
  };

  return (
    <Box
    maxWidth="500px" width="100%" padding="2rem" margin="0 auto"
      
    >
      <Box
        padding="2rem"
        border="1px solid #ccc"
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        borderRadius="md"
        maxWidth="500px"
        width="100%"
        bg="gray.200"
      ><Box maxWidth="600px" width="100%" padding="2rem">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem" textAlign="center">
        {t('WorkOrder.formTitle')}
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing="1rem" align="stretch">
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.workOrderIdLabel')}</Text>
            <Input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder={t('WorkOrder.workOrderIdPlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.turbineModelLabel')}</Text>
            <Input
              type="text"
              value={turbineModel}
              onChange={(e) => setTurbineModel(e.target.value)}
              placeholder={t('WorkOrder.turbineModelPlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.descriptionLabel')}</Text>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('WorkOrder.descriptionPlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.locationLabel')}</Text>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t('WorkOrder.locationPlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.technicianLabel')}</Text>
            <Input
              type="text"
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              placeholder={t('WorkOrder.technicianPlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.dateLabel')}</Text>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.nameLabel')}</Text>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('WorkOrder.namePlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.emailLabel')}</Text>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('WorkOrder.emailPlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.phoneLabel')}</Text>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('WorkOrder.phonePlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.requestDetailsLabel')}</Text>
            <Textarea
              value={requestDetails}
              onChange={(e) => setRequestDetails(e.target.value)}
              placeholder={t('WorkOrder.requestDetailsPlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.bestTimesLabel')}</Text>
            <Input
              type="text"
              value={bestTimes}
              onChange={(e) => setBestTimes(e.target.value)}
              placeholder={t('WorkOrder.bestTimesPlaceholder')}
              required
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{t('WorkOrder.completionDateLabel')}</Text>
            <Input
              type="text"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              placeholder={t('WorkOrder.completionDatePlaceholder')}
              required
            />
          </Box>
          <Button type="submit" colorScheme="blue" alignSelf="center">
            {t('WorkOrder.submitButton')}
          </Button>
        </VStack>
      </form>
      <Modal isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('WorkOrder.confirmationTitle')}</ModalHeader>
          <ModalBody>{t('WorkOrder.confirmationMessage')}</ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsConfirmationOpen(false)}>
              {t('WorkOrder.cancelButton')}
            </Button>
            <Button colorScheme="blue" ml={3} onClick={handleWorkOrderSubmit}>
              {t('WorkOrder.confirmButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box></Box>
      
    </Box>
  );
};

export default WorkOrder;
