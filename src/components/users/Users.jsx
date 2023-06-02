import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './users.css';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation(); // Initialize the useTranslation hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/all`, { withCredentials: true });
        setUsers(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const ProfileRightbar = () => {
    return (
      <>
        <br />
        <h4 className="rightbarTitle">{t('Users.rightbarTitle')}</h4>
        <div className="rightbarWrapper">
          <div className="card-deck row ">
            {users.map((user) => (
              <div key={user._id} className="" style={{ width: '14rem' }}>
                <div className={`card h-100 ${user.status === true ? 'active-user' : 'inactive-user'}`}>
                  <div className={`indicator ${user.status === true ? 'active-indicator' : 'inactive-indicator'}`}></div>
                  <div>
                    {user.status === true && <span className="online-text">{t('Users.onlineText')}</span>}
                    <br />
                    <img src={user.profileImage} className="card-img-top" alt="" />
                    <div className="card-body">
                      <h5 className="card-title">{`${user.firstName} ${user.lastName}`}</h5>
                      {user.isAdmin && <span>{t('Users.adminManager')}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='rightbar'>
      <ProfileRightbar />
    </div>
  );
};

export default Users;
