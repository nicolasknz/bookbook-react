import React from 'react';

import userDefault from '../../assets/img/userDefault.png';
import { StyledHeadProfile } from '../../components/styled/';

const Profile = () => {
  const { user } = useSelector((state) => state.session);

  return (
    <>
      <StyledHeadProfile>
        <img src={user.image_url ? user.image_url : userDefault} alt={user.name} />
        <span className="profileName">{user.name}</span>
        <span className="profileUser">@{user.user}</span>
        <span className="profileAbout">"{user.about}"</span>
      </StyledHeadProfile>
    </>
  );
};

export default Profile;
