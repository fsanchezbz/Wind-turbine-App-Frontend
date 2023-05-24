import React from 'react';
import "./profile.css";
import Map from '../../components/Map';
import Post from "../../components/post/Post";
import Rightbar from '../../components/rightbar/Rightbar'

const CompanyProfilePage = () => {

  // const [filter, setFilter] = useState();
 
  // const handleChange = (event) => {
  //  const optionFilter = event.target.value
  //  setFilter(optionFilter)

  return (
    <>
      <div className="profile">
        <div className="profileInfo">
            <h4 className='profileInfoName'>Company Profile Page</h4>
            <span className='profileInfoDesc'>Hello my Employees</span>
        </div>

        {/* <div className="selectOption">
        <label> Show orders:</label>
        <select name="selectFilter" onChange={handleChange}>
          <option value="all">All Orders</option>
          <option value="open">Open Orders</option>
          <option value="close">Close Orders</option>
        </select>
         <p>{filter}</p>
        </div> */}

        <center><Map /></center>
        <div className="profileRight">
          <div className="profilerightTop">
          
          </div>
          <div className="profilerightBottom">
            <div className="postContainer">
              <Post className="layout"/>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyProfilePage;
