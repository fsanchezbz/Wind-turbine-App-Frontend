import { Box, Flex } from '@chakra-ui/react';
import Map from '../../components/Map';
import Post from '../../components/post/Post';
import RightBar from '../../components/rightbar/Rightbar';
const CompanyProfilePage = () => {
  return (
    <div className="profile">
      <Box marginTop="4rem">
        <Map />
      </Box>
      <Box marginTop="4rem">
        <RightBar />
      </Box>
      <Box marginTop="2rem" padding="0 1rem">
        <Post />
      </Box>
    </div>
  );
}

export default CompanyProfilePage;
