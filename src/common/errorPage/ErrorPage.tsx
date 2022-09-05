import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import errorPicture from '../../assets/404.svg';
import style from './errorPage.module.scss';

export const ErrorPage = () => {

  const navigate = useNavigate();

  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={style.info}>
          <h1>Ooops!</h1>
          <h5>Sorry! Page not found!</h5>
          <Button
            className={style.button}
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => navigate('/profile')}
          >Back to home page</Button>
        </div>
        <img src={errorPicture} alt="error" />
      </div>
    </div>
  );
};
