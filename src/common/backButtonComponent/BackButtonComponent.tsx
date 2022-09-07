import { To, useNavigate } from 'react-router-dom';
import React from 'react';
import classes from './backButtonComponent.module.scss';

export const BackButtonComponent: React.FC<BackButtonComponentPropsType> = ({ title = 'Back', path = -1 as To }) => {

  const navigate = useNavigate();

  return (
    <div className={classes.main} onClick={() => navigate(path)}>
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="black" strokeWidth="2" />
      </svg>
      <span className={classes.back}>{title}</span>
    </div>
  );
};

type BackButtonComponentPropsType = {
  title?: string
  path?: To
}
