import React, { useState } from 'react';
import { Button, IconButton, Paper, TextField } from '@mui/material';
import style from './newPassword.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { setNewPassword } from '../bll-dal/auth-async-actions';

export const NewPassword = () => {

  const dispatch = useAppDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<FormData> = async data => {
    console.log(data);
    const res = await dispatch(setNewPassword({ password: data.password, resetPasswordToken: token }));
    if (res) {
      navigate('/login');
    }
    reset();
  };

  return (
    <div className={style.main}>
      <Paper elevation={3} className={style.content}>
        <h2>Create new password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              required: 'Required field',
              minLength: {
                value: 8,
                message: 'Password less than 8 symbols',
              },
            }}
            render={({ field }) => (
              <div className={style.input}>
                <TextField
                  variant="standard"
                  color="primary"
                  id="password"
                  autoComplete="on"
                  label="Password"
                  type={isShowPassword ? 'text' : 'password'}
                  helperText={errors?.password && errors?.password?.message}
                  error={!!errors?.password}
                  {...field} />
                <IconButton
                  onClick={() => {setIsShowPassword(!isShowPassword);}}
                  onMouseDown={e => {e.preventDefault();}}>
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>)} />
          <div className={style.info}>Create new password and we will send you further instructions to email</div>
          <Button className={style.button} color="primary" variant="contained" type="submit">
            Create new password</Button>
        </form>
      </Paper>
    </div>
  );
};

type FormData = {
  password: string
}

