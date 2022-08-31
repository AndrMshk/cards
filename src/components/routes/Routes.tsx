import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../login/Login';

export const ProjectRoutes = () => {
  return <div>
    <Routes>
      <Route path={'/'} element={<Navigate to={'/profile'} />} />
      <Route path={'/login'} element={<Login/>} />
      <Route path={'/set-new-password/:token'} element={<div></div>} />
      <Route path={'/password-recovery'} element={<div></div>} />
      <Route path={'/password-recovery/:email'} element={<div></div>} />
      <Route path={'/profile'} element={<div></div>} />
      <Route path={'/registration'} element={<div></div>} />
      <Route path={'/packs'} element={<div></div>} />
      <Route path={'/cards/:packId/:packName'} element={<div></div>} />
      <Route path={'/learn/:packId/:packName'} element={<div></div>} />
      <Route path={'/404'} element={<div></div>} />
      <Route path={'*'} element={<Navigate to={'/404'} />} />
    </Routes>
  </div>;
};
