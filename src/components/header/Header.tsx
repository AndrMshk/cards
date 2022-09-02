import React from 'react';
import incubatorLogo from '../../assets/incubator.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import style from './header.module.scss';
import { useAppSelector } from '../../app/bll-dal/store';
import { Avatar, Button } from '@mui/material';

const paths = [
  {
    path: '/login',
    title: 'Login',
  },
  {
    path: '/registration',
    title: 'Registration',
  },
  {
    path: '/profile',
    title: 'Profile',
  },
  {
    path: '/404',
    title: 'Error page',
  },
  {
    path: '/password-recovery',
    title: 'Password recovery',
  },
  {
    path: '/password-recovery/mail@gmail.com',
    title: 'Password recovery letter',
  },
  {
    path: '/set-new-password/token',
    title: 'New password',
  },
  {
    path: '/packs',
    title: 'Packs',
  },
  {
    path: '/cards/:packId',
    title: 'Cards',
  },
];

export const Header = () => {

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const { avatar, name } = useAppSelector(state => state.profile);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (path: string) => {
    navigate(path);
    setAnchorEl(null);
  };

  return (
    <div className={style.main}>
      <div className={style.img} onClick={(event) => {setAnchorEl(event.currentTarget);}}>
        <img src={incubatorLogo} alt="it-incubator" />
      </div>
      {isLoggedIn
        ? <div className={style.profileInfo}>
          <h5>{name}</h5>
          <Avatar
            onClick={() => {navigate('/profile');}}
            className={style.avatar}
            alt="Remy Sharp"
            src={avatar} />
        </div>
        : <Button
          variant="contained"
          onClick={() => navigate('/login')}>Sign in</Button>
      }
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
        {paths.map((el, index) => <MenuItem key={index} onClick={() => handleClose(el.path)}>{el.title}</MenuItem>)}
      </Menu>
    </div>
  );
};

