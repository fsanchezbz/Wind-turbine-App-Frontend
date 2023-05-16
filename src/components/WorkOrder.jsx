import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Box, Text, Input, Textarea, Button } from '@chakra-ui/react';
import { addWorkOrder } from '../store/workOrderSlice';

const WorkOrder = () => {
  const dispatch = useDispatch();
  const workOrders = useSelector((state) => state.workOrder.workOrders);
  const [workOrder, setWorkOrder] = useState({
    turbineModel: '',
    description: '',
    location: '',
    technician: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkOrder((prevWorkOrder) => ({
      ...prevWorkOrder,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the addWorkOrder action to store the work order
    dispatch(addWorkOrder(workOrder));
    // Reset the form
    setWorkOrder({
      turbineModel: '',
      description: '',
      location: '',
      technician: '',
      date: '',
    });
  };

  useEffect(() => {
    console.log(workOrders);
  }, [workOrders]);
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
    <Box padding="2rem">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
        Work Order Form
      </Text>
      <form onSubmit={handleSubmit}>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Turbine Model
          </Text>
          <Input
            type="text"
            name="turbineModel"
            value={workOrder.turbineModel}
            onChange={handleChange}
            placeholder="Enter turbine model"
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Description
          </Text>
          <Textarea
            name="description"
            value={workOrder.description}
            onChange={handleChange}
            placeholder="Enter work order description"
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Location
          </Text>
          <Input
            type="text"
            name="location"
            value={workOrder.location}
            onChange={handleChange}
            placeholder="Enter Location"
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Technician
          </Text>
          <Input
            type="text"
            name="technician"
            value={workOrder.technician}
            onChange={handleChange}
            placeholder="Enter technician name"
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
            Date
          </Text>
          <Input
            type="date"
            name="date"
            value={workOrder.date}
            onChange={handleChange}
            required
          />
        </Box>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default WorkOrder;
