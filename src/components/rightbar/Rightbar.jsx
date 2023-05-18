import './rightbar.css';
import Online from '../online/Online';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Rightbar({ profile }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://wind-turbine-app-backend.onrender.com/users/all", { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className='birthdayImg' src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola foster</b> and <b>3 others</b> have a birthday today.
          </span>
        </div>
        <img className='rignhtbarAd' src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarfriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img src="assets/persons/5.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingname">Emily Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/persons/6.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingname">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/persons/7.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingname">Sasha banks</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/persons/8.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingname">Nicole Lucy</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/persons/9.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingname">Laurel Porter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/persons/5.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingname">Charles Dickson</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/persons/6.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingname">Johnathan Carter</span>
                    </div>
                </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {users.map((user) => (
            <div className="rightbarFollowing" key={user.id}>
              <img src={user.profileImage} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingname">{`${user.firstName} ${user.lastName}`}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
