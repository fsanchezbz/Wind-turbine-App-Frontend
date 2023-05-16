// CompanyProfilePage.js

import React from 'react';
import "./profile.css";
import { useSelector } from 'react-redux';

import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Map from '../../components/Map';
import WorkOrder from '../../components/WorkOrder';
import { Box, Text } from '@chakra-ui/react';

export default function CompanyProfilePage() {
  const workOrders = useSelector((state) => state.workOrder.workOrders);

  return (
    <>
      <div className="profile">
       
        <Map />

        <div className="profileRight">
          <div className="profilerightTop">
            <div className="profileInfo">
              <h4 className='profileInfoName'>Stephen Myburgh</h4>
              <span className='profileInfoDesc'>Hello my friends</span>
            </div>
          </div>
          <div className="profilerightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>

        <div>
          <h1>Company Profile Page</h1>
          {/* Render the work orders */}
          {workOrders.length > 0 ? (
            workOrders.map((workOrder, index) => (
              <div key={index}>
                <Box
                  padding="1rem"
                  marginBottom="1rem"
                  boxShadow="md"
                  borderRadius="md"
                  backgroundColor="lightblue"
                >
                  <Text fontWeight="bold" marginBottom="0.5rem">
                    Turbine Model: {workOrder.turbineModel}
                  </Text>
                  <Text marginBottom="0.5rem">Description: {workOrder.description}</Text>
                  <Text marginBottom="0.5rem">Technician: {workOrder.technician}</Text>
                  <Text>Date: {workOrder.date}</Text>
                </Box>
              </div>
            ))
          ) : (
            <p>No work orders found.</p>
          )}
        </div>
      </div>
    </>
  );
}
