import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import './post.css';

export default function Post({ post }) {
  const [workOrders, setWorkOrders] = useState([]);
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
        </div>
      
    </div>
  );
}
