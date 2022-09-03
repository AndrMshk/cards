import React, { useEffect, useState } from 'react';
import style from './profile.module.scss';
import { Button, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useAppDispatch, useAppSelector } from '../../app/bll-dal/store';
import { useFormik } from 'formik';
import { BackButtonComponent } from '../../common/backButtonComponent/BackButtonComponent';
import { AvatarComponent } from './components/AvatarComponent';
import { EditNameForm } from './components/EditNameForm';
import { Navigate } from 'react-router-dom';
import { setNewUserName } from './bll-dal/profile-async-actions';
import { logout } from '../auth/bll-dal/auth-async-actions';

export const Profile = () => {

  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

  const { name, email } = useAppSelector(state => state.profile);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: { name: name },
    validate: (values) => {
      const errors: { name?: string } = {};
      if (!values.name) {
        errors.name = 'Required';
      }
      if (values.name.length > 20) {
        errors.name = 'To long name';
      }
      return errors;
    },
    onSubmit: values => {
      if (values.name.trim() !== name) {
        dispatch(setNewUserName(values.name));
      } else {
        values.name = name;
      }
      setEditMode(false);
    },
  });

  useEffect(() => {formik.initialValues.name = name;}, [name]);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={style.main}>
      <BackButtonComponent title="To pack list" path="/packs" />
      <Paper className={style.content} elevation={4}>
        <h2>Personal Information</h2>
        <AvatarComponent/>
        {editMode
          ? <EditNameForm
            name={name}
            handleChange={formik.handleChange}
            handleSubmit={formik.handleSubmit}
            newName={formik.values.name}
            setEditMode={setEditMode}
            error={formik.errors.name}
          />
          : <div className={style.name}><h3>
            {name}
            <BorderColorOutlinedIcon
              style={{ cursor: 'pointer', height: '16px', width: '16px', marginLeft: '9px', marginBottom: '-1px' }}
              onClick={() => setEditMode(true)}
            />
          </h3></div>}
        <p>{email}</p>
        <Button
          onClick={() => {dispatch(logout());}}
          className={style.button}
          variant="outlined"
          startIcon={<ExitToAppIcon />}>
          Log out
        </Button>
      </Paper>
    </div>
  );
};
