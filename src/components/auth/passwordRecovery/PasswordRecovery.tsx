import React from 'react';
import { Button, FormControl, Paper, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import style from './passwordRecovery.module.scss';

export const PasswordRecovery = () => {

  const formik = useFormik({
    initialValues: { email: ''},
    validate: (values) => {
      const errors: { email?: string } = {};
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <div className={style.main}>
      <Paper elevation={3} className={style.content}>
        <h2>Forgot your password?</h2>
        <form onSubmit={formik.handleSubmit}>
          <FormControl variant="standard" className={style.input}>
            <TextField
              variant="standard"
              color="primary"
              id="email"
              label="Email"
              type="email"
              helperText={formik.errors.email}
              {...formik.getFieldProps('email')}
              error={!!formik.errors.email && formik.touched.email} />
          </FormControl>
          <div className={style.info}>Enter your email address and we will send you further instructions</div>
          <Button className={style.button} color="primary" variant="contained" type="submit">Send Instructions</Button>
          Did you remember your password?
          <Link to="/login">Try logging in</Link>
        </form>
      </Paper>
    </div>
  );
};
