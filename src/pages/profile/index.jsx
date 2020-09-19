/*
Nome - 16/09/20 (concluído)
Perfil do Usuário:
-Colocado o Profile em Shelves, estava invertido
*/

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import userDefault from '../../assets/img/userDefault.png';
import { StyledHeadProfile } from '../../components/styled/';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const session = useSelector((state) => state.session);

  useEffect(() => {
    const userId = session.user.id;

    axios
      .get(`https://ka-users-api.herokuapp.com/users/${userId}`, {
        headers: { Authorization: session.token },
      })
      .then((res) => setProfile(res.data));
  }, []);

  return (
    <>
      <StyledHeadProfile>
        <img src={profile.image_url ? profile.image_url : userDefault} alt={profile.name} />
        <span className="profileName">{profile.name}</span>
        <span className="profileUser">@{profile.user}</span>
        <span className="profileAbout">"{profile.about}"</span>
      </StyledHeadProfile>
    </>
  );
};

export default Profile;
