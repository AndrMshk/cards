import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PacksTable } from './table/PacksTable';
import { useAppSelector } from '../../app/bll-dal/store';
import { BackButtonComponent } from '../../common/backButtonComponent/BackButtonComponent';
import style from './packs.module.scss';
import { ControlPanel } from './controlPanel/ControlPanel';
import { Button } from '@mui/material';
import { AddNewPackModal } from './modals/AddNewPackModal';

export const Packs = () => {

  const [isOpenAddPackModal, setIsOpenAddPackModal] = useState(false);

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const isLoading = useAppSelector(state => state.app.isLoading);

  if (!isLoggedIn) {return <Navigate to={'/login'} />;}

  return (
    <div className={style.main}>
      <BackButtonComponent />
      <div className={style.content}>
        <div className={style.headerBlock}>
          <h2>Pack list</h2>
          <Button
            onClick={() => setIsOpenAddPackModal(true)}
            variant="contained"
            disabled={isLoading}
          >Add new pack</Button>
          <AddNewPackModal isOpenModal={isOpenAddPackModal} setIsOpenModal={setIsOpenAddPackModal} />
        </div>
        <ControlPanel/>
        <PacksTable/>
      </div>
    </div>
  );
};




