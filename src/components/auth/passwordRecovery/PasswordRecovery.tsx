import React from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import style from './passwordRecovery.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { sendEmail } from '../bll-dal/auth-async-actions';

export const PasswordRecovery = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<FormData> = async data => {
    const res = await dispatch(sendEmail(data.email));
    if (res) {
      navigate(`/password-recovery/${data.email}`);
    }
    reset();
  };

  return (
    <div className={style.main}>
      <Paper elevation={3} className={style.content}>
        <h2>Forgot your password?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              required: 'Required field',
              pattern: {
                value: /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i,
                message: 'Please, enter correct email address',
              },
            }}
            render={({ field }) => (
              <div className={style.input}>
                <TextField
                  label="Email"
                  variant="standard"
                  helperText={errors?.email && errors?.email?.message}
                  error={!!errors?.email}
                  {...field} />
              </div>)} />
          <div className={style.info}>Enter your email address and we will send you further instructions</div>
          <Button className={style.button} color="primary" variant="contained" type="submit">Send Instructions</Button>
          Did you remember your password?
          <Link to="/login">Try logging in</Link>
        </form>
      </Paper>
    </div>
  );
};

type FormData = {
  email: string
}
