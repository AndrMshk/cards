import React, { useState } from 'react';
import { Button, IconButton, Paper, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import style from './registration.module.scss';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { signUp } from '../bll-dal/auth-async-actions';

export const Registration = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { control, handleSubmit, reset, formState: { errors }, getValues } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    const { login: email, password } = data;
    const res = await dispatch(signUp({ email, password }));
    if (res) {
      navigate('/login');
    }
    reset();
  };

  return (
    <div className={style.main}>
      <Paper elevation={3} className={style.content}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="login"
            control={control}
            rules={{
              required: 'Required field',
              pattern: {
                value: /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i,
                message: 'Please, enter correct email address',
              },
            }}
            render={({ field }) => (
              <TextField
                className={style.input}
                variant="standard"
                color="primary"
                id="email"
                label="Email"
                type="email"
                helperText={errors?.login && errors?.login?.message}
                error={!!errors?.login}
                {...field}
              />)} />
          <Controller
            name="password"
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
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Required field',
              validate: {
                equal: v => v === getValues().password ? true : 'Passwords don\'t match',
              },
            }}
            render={({ field }) => (
              <div className={style.input}>
                <TextField
                  variant="standard"
                  color="primary"
                  id="confirmPassword"
                  autoComplete="on"
                  label="Confirm password"
                  type={isShowConfirmPassword ? 'text' : 'password'}
                  helperText={errors?.confirmPassword && errors?.confirmPassword?.message}
                  error={!!errors?.confirmPassword}
                  {...field} />
                <IconButton
                  onClick={() => {setIsShowConfirmPassword(!isShowConfirmPassword);}}
                  onMouseDown={e => {e.preventDefault();}}>
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>)} />
          <Button className={style.button} color="primary" variant="contained" type="submit">Sign Up</Button>
          Already have an account?
          <Link to={'/login'}>Sign In</Link>
        </form>
      </Paper>
    </div>
  );
};

type FormData = {
  login: string
  password: string
  confirmPassword: string
}
