/*
Nome - 14/09/20 (concluído)
Perfil do Usuário:
-Apresentando perfil do usuário com foto, nome e sobre.
-Puxando as Prateleiras
-Responsivo
*/

import axios from 'axios';
import React, { useState, useEffect } from 'react';

import userDefault from '../../assets/img/userDefault.png';
import { StyledHeadProfile } from '../../components/styled/';
import Shelves from '../shelves';

const Profile = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('currentUser')).id;

    axios
      .get(`https://ka-users-api.herokuapp.com/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('currentToken'),
        },
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
      <Shelves />
    </>
  );
};

export default Profile;
