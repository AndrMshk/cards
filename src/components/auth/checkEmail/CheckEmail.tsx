import React from 'react';
import { Button, Paper } from '@mui/material';
import style from './checkEmail.module.scss';
import letter from './letter.svg';

export const CheckEmail = () => {

  return (
    <div className={style.main}>
      <Paper elevation={3} className={style.content}>
        <h2>Check Email</h2>
        <img src={letter} alt="letter" />
        <div className={style.info}>We’ve sent an Email with instructions to *********************</div>
        <Button className={style.button} color="primary" variant="contained">Back to login</Button>
      </Paper>
    </div>
  );
};
