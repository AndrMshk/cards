import React from 'react';
import incubatorLogo from '../../assets/incubator.png';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import style from './header.module.scss';

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
      <Button variant="contained">Sign in</Button>
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
