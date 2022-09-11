import React, { useEffect, useState } from 'react';
import incubatorLogo from '../../assets/incubator.png';
import { useNavigate } from 'react-router-dom';
import style from './header.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/bll-dal/store';
import { Avatar, Button, LinearProgress } from '@mui/material';
import { logout } from '../auth/bll-dal/auth-async-actions';
import { PositionedMenu } from '../../common/optionMenu/OptionMenu';
import ForumIcon from '@mui/icons-material/Forum';
import { Chat } from '../chat/Chat';
import {
  closeConnectionTC,
  initAllMessagesTC,
  initNewMessageTC,
  openConnectionTC,
  setReadMessagesCountAction,
  setUserNameTC,
} from '../chat/bll-dal/chat-reducer';

export const Header = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpenChat, setIsOpenChat] = useState(false);

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
  const isLoading = useAppSelector(state => state.app.isLoading);
  const { avatar, name } = useAppSelector(state => state.profile);
  const { messages, readMessagesCount } = useAppSelector(state => state.chat);

  useEffect(() => {
    dispatch(setReadMessagesCountAction(messages.length));
  }, [isOpenChat]);

  useEffect(() => {
    dispatch(setUserNameTC(name));
    dispatch(openConnectionTC());
    dispatch(initAllMessagesTC());
    dispatch(initNewMessageTC());
    return () => {
      dispatch(closeConnectionTC());
    };
  }, []);

  return (
    <div className={style.main}>
      {isLoading && <div className={style.linearProgress}><LinearProgress /></div>}
      <PositionedMenu items={pathsMenuData}>
        <div className={style.img}>
          <img src={incubatorLogo} alt="it-incubator" />
        </div>
      </PositionedMenu>
      {isLoggedIn
        ? <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          position: 'relative',
        }}>
          <PositionedMenu items={profileMenuData}>
            <div className={style.profileInfo}>
              <h5>{name}</h5>
              <Avatar
                className={style.avatar}
                alt="Remy Sharp"
                src={avatar} />
            </div>
          </PositionedMenu>
          <ForumIcon style={{ cursor: 'pointer' }} onClick={() => {setIsOpenChat(!isOpenChat);}} />
          {!isOpenChat && readMessagesCount !== messages.length &&
          <span className={style.messagesCount}>{messages.length - readMessagesCount}</span>}
        </div>
        : <Button
          variant="contained"
          onClick={() => navigate('/login')}>Sign in</Button>}
      {isOpenChat && <Chat setIsOpenChat={setIsOpenChat} />}
    </div>
  );
};



