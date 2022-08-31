import React from 'react';
import { Button, FormControl, IconButton, Paper, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import style from './registration.module.scss';

export const Registration = () => {

  const [isShowPassword, setIsShowPassword] = React.useState(false);

  type FormikErrorType = { email?: string, password?: string }

  const formik = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '' },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (values.password.length < 8) {
        errors.password = 'Password is too short';
      }
      if (values.password !== values.confirmPassword) {
        errors.password = 'Password ne sovpal';
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
        <h2>Sign Up</h2>
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
          <FormControl variant="standard" className={style.input}>
            <TextField
              variant="standard"
              color="primary"
              id="password"
              autoComplete="on"
              label="Password"
              type={isShowPassword ? 'text' : 'password'}
              helperText={formik.errors.password}
              error={!!formik.errors.password && formik.touched.password}
              {...formik.getFieldProps('password')} />
            <IconButton
              onClick={() => {setIsShowPassword(!isShowPassword);}}
              onMouseDown={e => {e.preventDefault();}}>
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </FormControl>
          <FormControl variant="standard" className={style.input}>
            <TextField
              variant="standard"
              color="primary"
              id="confirmPassword"
              autoComplete="on"
              label="Confirm password"
              type={isShowPassword ? 'text' : 'password'}
              helperText={formik.errors.password}
              error={!!formik.errors.password && formik.touched.password}
              {...formik.getFieldProps('confirmPassword')} />
            <IconButton
              onClick={() => {setIsShowPassword(!isShowPassword);}}
              onMouseDown={e => {e.preventDefault();}}>
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </FormControl>
          <Button className={style.button} color="primary" variant='contained' type="submit">Sign Up</Button>
          Already have an account?
          <Link to={'/login'}>Sign In</Link>
        </form>
      </Paper>
    </div>
  );
};
