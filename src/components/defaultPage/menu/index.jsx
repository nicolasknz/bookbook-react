import React, { useState } from 'react';
import StyledMenu from '../../styled/styled-menu';
import { MenuCenter, MenuLeft, MenuRight, StyledLogo, StyledUser, NameUser } from './styled';
import { Grid, Feed, Dropdown } from 'semantic-ui-react';
import { AiOutlineHome, AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { RiSearchFill } from 'react-icons/ri';
import UserDefault from '../../../assets/img/userDefault.jpg';
import LogoMenu from '../../../assets/img/LogoBrancoVerde.png';
import { useHistory, useLocation } from 'react-router-dom';
import { login } from '../../../redux/actions/session';
import Swal from 'sweetalert2';
import ChangeProfile from '../../change-profile';
import { Modal } from 'semantic-ui-react';

import { useDispatch, useSelector } from 'react-redux';

import './menu.css';

const TopBar = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  
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
                {location.pathname === '/' && (
                  <>
                    <div className="div-home-active">
                      <AiFillHome className="icon-home" />
                    </div>
                    <div
                      className="div-search"
                      onClick={() => {
                        history.push('/book-search');
                      }}>
                      <BsSearch className="icon-search" />
                    </div>
                    <div
                      className="div-user"
                      onClick={() => {
                        history.push('/shelves');
                      }}>
                      <AiOutlineUser className="icon-user" />
                    </div>
                  </>
                )}
                {location.pathname === '/book-search' && (
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
                    <div
                      className="div-user"
                      onClick={() => {
                        history.push('/shelves');
                      }}>
                      <AiOutlineUser className="icon-user" />
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
                        history.push('/book-search');
                      }}>
                      <BsSearch className="icon-search" />
                    </div>
                    <div className="div-user-active">
                      <FaUserAlt className="icon-user-active" />
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
                        <StyledUser src={session.user.image_url} />
                      ) : (
                        <img src={UserDefault} />
                      )}
                    </Feed.Label>
                  </Feed.Event>
                </Feed>
                <Dropdown direction="left" text={<NameUser>{session.user.name} </NameUser>}>
                  <Dropdown.Menu>
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
