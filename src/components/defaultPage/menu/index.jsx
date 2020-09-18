import React, { useState, useEffect } from 'react';
import StyledMenu from '../../styled/styled-menu';
import { MenuCenter, MenuLeft, MenuRight, StyledLogo, StyledUser, NameUser } from './styled';
import { Grid, Feed, Dropdown } from 'semantic-ui-react';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { RiSearchFill } from 'react-icons/ri';
import UserDefault from '../../../assets/img/userDefault.jpg';
import LogoMenu from '../../../assets/img/LogoBrancoVerde.png';
import { useHistory, useLocation } from 'react-router-dom';
import { login } from '../../../redux/actions/session';
import Swal from 'sweetalert2';
import ChangeProfile from '../../../pages/profile/change-profile';
import axios from 'axios';
import { Modal } from 'semantic-ui-react';

import { useDispatch, useSelector } from 'react-redux';

import './menu.css';

const TopBar = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const history = useHistory();
  const location = useLocation();

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
      <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
        <ChangeProfile setOpen={setOpen} />
      </Modal>
      <StyledMenu>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <MenuLeft>
                <StyledLogo src={LogoMenu} onClick={() => history.push('/')} />
              </MenuLeft>
            </Grid.Column>
            <Grid.Column>
              <MenuCenter>
                {location.pathname == '/' && (
                  <>
                    <div className="div-home-active">
                      <AiFillHome className="icon-home" />
                    </div>
                    <div
                      className="div-search"
                      onClick={() => {
                        history.push('/home');
                      }}>
                      <BsSearch className="icon-search" />
                    </div>
                  </>
                )}
                {location.pathname == '/home' && (
                  <>
                    <div
                      className="div-home"
                      onClick={() => {
                        history.push('/');
                      }}>
                      <AiOutlineHome className="icon-home" />
                    </div>
                    <div className="div-search-active">
                      <RiSearchFill className="icon-search" />
                    </div>
                  </>
                )}
                {location.pathname === '/shelves' && (
                  <>
                    <div
                      className="div-home"
                      onClick={() => {
                        history.push('/');
                      }}>
                      <AiOutlineHome className="icon-home" />
                    </div>
                    <div
                      className="div-search"
                      onClick={() => {
                        history.push('/home');
                      }}>
                      <BsSearch className="icon-search" />
                    </div>
                  </>
                )}
              </MenuCenter>
            </Grid.Column>
            <Grid.Column>
              <MenuRight>
                <Feed>
                  <Feed.Event>
                    <Feed.Label className="user-default">
                      {session && session.user.image_url ? (
                        <StyledUser src={profile.image_url} />
                      ) : (
                        <img src={UserDefault} />
                      )}
                    </Feed.Label>
                  </Feed.Event>
                </Feed>
                <Dropdown direction="left" text={<NameUser>{profile.name} </NameUser>}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon="user"
                      text="Meu Perfil"
                      onClick={() => history.push('/shelves')}
                    />
                    <Dropdown.Item
                      icon="edit"
                      text="Alterar informações"
                      onClick={() => setOpen(true)}
                    />
                    <Dropdown.Item
                      icon="sign-out"
                      color="red"
                      text="Sair"
                      onClick={() => {
                        Swal.fire({
                          title: `Volte logo, ${session.user.name}!`,
                          confirmButtonText: `Sair`,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            window.localStorage.clear();
                            dispatch(login('', ''));
                          }
                        });
                      }}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </MenuRight>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </StyledMenu>
    </>
  );
};

export default TopBar;
