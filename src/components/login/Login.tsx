import React from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, Paper, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import style from './login.module.scss';

export const Login = () => {

  type State = {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password is too short';
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
        <h2>Sign In</h2>
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
              type={values.showPassword ? 'text' : 'password'}
              helperText={formik.errors.password}
              error={!!formik.errors.password && formik.touched.password}
              {...formik.getFieldProps('password')} />
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}>
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </FormControl>
          <div className={style.checkbox}>
            <FormControlLabel
              label={'Remember me'}
              control={<Checkbox
                color="primary"
                checked={formik.values.rememberMe}
                {...formik.getFieldProps('rememberMe')} />} />
          </div>
          <div className={style.forgotPassword}>
          <Link to={'/password-recovery'}>Forgot Password</Link>
          </div>
          <Button className={style.button} color="primary" variant={'contained'} type="submit">Login</Button>
          Don’t have an account?
          <Link to={'/registration'}>Sign Up</Link>
        </form>
      </Paper>
    </div>
  );
};
