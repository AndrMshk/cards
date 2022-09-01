import React, { useEffect } from 'react';
import { ProjectRoutes } from '../components/routes/Routes';
import style from './app.module.scss';

import { Header } from '../components/header/Header';
import { useAppDispatch, useAppSelector } from './store';
import { authMe } from './app-async-actions';
import { CircularProgress, LinearProgress } from '@mui/material';

function App() {

  const dispatch = useAppDispatch();

  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoading = useAppSelector(state => state.app.isLoading);

  useEffect(() => {
    dispatch(authMe());
  }, []);

  if (!isInitialized) {
    return (
      <div className={style.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={style.main}>
      <Header />
      {isLoading && <LinearProgress />}
      <ProjectRoutes />
    </div>
  );
}

export default App;
