import React from 'react';
import incubatorLogo from '../../assets/incubator.png';
import { useNavigate } from 'react-router-dom';
import style from './header.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/bll-dal/store';
import { Avatar, Button } from '@mui/material';
import { logout } from '../auth/bll-dal/auth-async-actions';
import { PositionedMenu } from '../../common/optionMenu/OptionMenu';

export const Header = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pathsMenuData = [
    {
      action: () => {navigate('/login');},
      title: 'Login',
    },
    {
      action: () => {navigate('/registration');},
      title: 'Registration',
    },
    {
      action: () => {navigate('/profile');},
      title: 'Profile',
    },
    {
      action: () => {navigate('/404');},
      title: 'Error page',
    },
    {
      action: () => {navigate('/password-recovery');},
      title: 'Password recovery',
    },
    {
      action: () => {navigate('/password-recovery/mail@gmail.com');},
      title: 'Password recovery letter',
    },
    {
      action: () => {navigate('/set-new-password/token');},
      title: 'New password',
    },
    {
      action: () => {navigate('/packs');},
      title: 'Packs',
    },
    {
      action: () => {navigate('/cards/:packId');},
      title: 'Cards',
    },
  ];
  const profileMenuData = [
    {
      title: 'Profile',
      action: () => {navigate('profile');},
    },
    {
      title: 'Logout',
      action: () => {dispatch(logout());},
    },

  ];

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const { avatar, name } = useAppSelector(state => state.profile);

  return (
    <div className={style.main}>
      <PositionedMenu items={pathsMenuData}>
        <div className={style.img}>
          <img src={incubatorLogo} alt="it-incubator" />
        </div>
      </PositionedMenu>
      {isLoggedIn
        ? <PositionedMenu items={profileMenuData}>
          <div className={style.profileInfo}>
            <h5>{name}</h5>
            <Avatar
              className={style.avatar}
              alt="Remy Sharp"
              src={avatar} />
          </div>
        </PositionedMenu>
        : <Button
          variant="contained"
          onClick={() => navigate('/login')}>Sign in</Button>}
    </div>
  );
};

