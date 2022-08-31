import React from 'react';
import { ProjectRoutes } from '../components/routes/Routes';
import style from './app.module.scss';

import { Header } from '../components/header/Header';

function App() {
  return (
    <div className={style.main}>
      <Header/>
      <ProjectRoutes/>
    </div>
  );
}

export default App;
