import React, { useState } from 'react';
import { Box, Text, Input, Textarea, Button, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb } from 'pdf-lib';

const WorkOrder = () => {
  const { t } = useTranslation();
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
  const navigate = useNavigate();

  const generateWorkOrderPDF = async () => {
    try {
      const existingPdfBytes = await fetch('/src/components/pdf/Work-Order-Request-Form.pdf').then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
      const page = pdfDoc.getPage(0);
      const font = await pdfDoc.embedFont('Helvetica');
    
      function addTextInBoxToPdf(text, x, y, width, height, fontSize) {
        const availableWidth = width - 10; // Adjusted for padding
        const availableHeight = height - 10; // Adjusted for padding
    
        const lines = [];
        let currentLine = '';
    
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const lineWidth = font.widthOfTextAtSize(currentLine + char, fontSize);
    
          if (lineWidth > availableWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = '';
          }
    
          currentLine += char;
        }
    
        if (currentLine !== '') {
          lines.push(currentLine);
        }
    
        let textToRender = lines.join('\n');
    
        if (lines.length > Math.floor(availableHeight / (fontSize + 2))) {
          const overflowLines = Math.floor(availableHeight / (fontSize + 2)) - 1;
          textToRender = lines.slice(0, overflowLines).join('\n') + '...';
        }
    
        const textX = x + 0; // Adjusted for padding
        const textY = y - 0; // Adjusted for padding
    
        page.drawText(textToRender, { x: textX, y: textY, font, size: fontSize, color: rgb(0, 0, 0) });
      }
    
      addTextInBoxToPdf(`${turbineModel}`, 150, 625, 180, 40, 10);
      addTextInBoxToPdf(`${description}`, 400, 625, 180, 40, 10);
      addTextInBoxToPdf(`${location}`, 160, 587, 280, 40, 10);
      addTextInBoxToPdf(`${technician}`, 160, 552, 180, 40, 10);
      addTextInBoxToPdf(`${date}`, 390, 490, 180, 40, 10);
      addTextInBoxToPdf(`${name}`, 135, 490, 180, 40, 10);
      addTextInBoxToPdf(`${email}`, 135, 452, 180, 40, 10);
      addTextInBoxToPdf(`${phone}`, 390, 452, 180, 40, 10);
      addTextInBoxToPdf(`${requestDetails}`, 80, 375, 440, 100, 10);
      addTextInBoxToPdf(`${bestTimes}`, 265, 207, 180, 40, 10);
      addTextInBoxToPdf(`${completionDate}`, 265, 170, 180, 40, 10);
    
      const pdfBytes = await pdfDoc.save();
    
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'work_order.pdf';
      downloadLink.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_PRODUCTION_API}/work/work-orders`, {
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
      });
      navigate('/profile');
      console.log('Work order submitted:', response.data);
      // Reset the form fields
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
      // Generate the PDF work order form
      await generateWorkOrderPDF();
    } catch (error) {
      console.error('Error submitting work order:', error);
    }
  };

  // 39.627038, -2.287618
  // 39.630678, -2.284431
  // 39.634185, -2.281091
  // 39.637196, -2.278140
  // 39.640481, -2.277091
  // 39.641390, -2.294946
  // 39.638467, -2.298962
  // 39.635318, -2.303638
  // 39.580464, -2.253965
  // 39.576838, -2.258782
  // 39.573908, -2.260765
  return (
    <>
     <Box padding="2rem">
     <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
          {t('WorkOrder.formTitle')}
        </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing="1rem" align="start">
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.turbineModelLabel')}
              </Text>
              <Input
                type="text"
                value={turbineModel}
                onChange={(e) => setTurbineModel(e.target.value)}
                placeholder={t('WorkOrder.turbineModelPlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.descriptionLabel')}
              </Text>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('WorkOrder.descriptionPlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.locationLabel')}
              </Text>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('WorkOrder.locationPlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.technicianLabel')}
              </Text>
              <Input
                type="text"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                placeholder={t('WorkOrder.technicianPlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.dateLabel')}
              </Text>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.nameLabel')}
              </Text>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('WorkOrder.namePlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.emailLabel')}
              </Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('WorkOrder.emailPlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.phoneLabel')}
              </Text>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('WorkOrder.phonePlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.requestDetailsLabel')}
              </Text>
              <Textarea
                value={requestDetails}
                onChange={(e) => setRequestDetails(e.target.value)}
                placeholder={t('WorkOrder.requestDetailsPlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.bestTimesLabel')}
              </Text>
              <Input
                type="text"
                value={bestTimes}
                onChange={(e) => setBestTimes(e.target.value)}
                placeholder={t('WorkOrder.bestTimesPlaceholder')}
                required
              />
            </Box>
            <Box marginBottom="1rem">
              <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
                {t('WorkOrder.completionDateLabel')}
              </Text>
              <Input
                type="text"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                placeholder={t('WorkOrder.completionDatePlaceholder')}
                required
              />
            </Box>
           
            <Button type="submit" colorScheme="blue">
              {t('WorkOrder.submitButton')}
            </Button>
          </VStack>
      </form>
    </Box>
    {/* <Footer /> */}
    </>
  );
};

export default WorkOrder;
