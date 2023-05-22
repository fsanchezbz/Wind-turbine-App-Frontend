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
      <Box >
        <RightBar profile/>
      </Box>
      <Box marginTop="2rem" padding="0 1rem">
        <Post />
      </Box>
      <section class="layout">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </section>
    </div>
  );
}

export default CompanyProfilePage;
