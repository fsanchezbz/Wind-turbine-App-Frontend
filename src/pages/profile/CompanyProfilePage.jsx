import { Box, Flex } from '@chakra-ui/react';
import Map from '../../components/Map';
import Post from '../../components/post/Post';
import "./profile.css";
import Rightbar from '../../components/rightbar/Rightbar';
const CompanyProfilePage = () => {
  return (
    <div className="profile">
      <Box marginTop="4rem">
        <Map />
      </Box>
      <Box marginTop="2rem" padding="0 1rem">
        <Post />
      </Box>
      <Box>
      <Rightbar profile />
      </Box>
    </div>
  );
}

export default CompanyProfilePage;
