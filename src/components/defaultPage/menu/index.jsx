import React, { useState } from 'react';
import StyledMenu from '../../styled/styled-menu';
import { MenuCenter, MenuLeft, MenuRight, StyledLogo } from './styled';
import { Grid, Feed, Dropdown } from 'semantic-ui-react';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { RiSearchFill } from 'react-icons/ri';
import UserDefault from '../../../assets/img/userDefault.jpg';
import LogoMenu from '../../../assets/img/LogoBrancoVerde.png';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../../redux/actions/session';

import { useDispatch } from 'react-redux';

import './menu.css';

const TopBar = () => {
  const [activeHome, setActiveHome] = useState(true);
  const [activeSearch, setActiveSearch] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <>
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
                {!activeHome ? (
                  <div
                    className="div-home"
                    onClick={() => {
                      setActiveHome(!activeHome);
                      setActiveSearch(false);
                      history.push('/');
                    }}>
                    <AiOutlineHome className="icon-home" />
                  </div>
                ) : (
                  <div className="div-home-active">
                    <AiFillHome className="icon-home" />
                  </div>
                )}
                {!activeSearch ? (
                  <div
                    className="div-search"
                    onClick={() => {
                      setActiveSearch(!activeSearch);
                      setActiveHome(false);
                      history.push('/home');
                    }}>
                    <BsSearch className="icon-search" />
                  </div>
                ) : (
                  <div className="div-search-active">
                    <RiSearchFill className="icon-search" />
                  </div>
                )}
              </MenuCenter>
            </Grid.Column>
            <Grid.Column>
              <MenuRight>
                <Feed>
                  <Feed.Event>
                    <Feed.Label className="user-default">
                      <img src={UserDefault} />
                    </Feed.Label>
                  </Feed.Event>
                </Feed>
                <Dropdown direction="left" text={<b> Bruno </b>}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon="user"
                      text="Meu Perfil"
                      onClick={() => history.push('/shelves')}
                    />
                    <Dropdown.Item icon="edit" text="Alterar informações" />
                    <Dropdown.Item
                      icon="sign-out"
                      color="red"
                      text="Sair"
                      onClick={() => {
                        window.localStorage.clear();
                        dispatch(login('', ''));
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
