import React from 'react';
import { Button, FormControl, IconButton, Paper, TextField } from '@mui/material';
import style from './newPassword.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';

export const NewPassword = () => {

  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '', rememberMe: false },
    validate: (values) => {
      const errors: { password?: string } = {};
      if (values.password.length < 8) {
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
        <h2>Create new password</h2>
        <form onSubmit={formik.handleSubmit}>
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
        <div className={style.info}>Create new password and we will send you further instructions to email</div>
        <Button className={style.button} color="primary" variant="contained" type="submit">
          Create new password</Button>
        </form>
      </Paper>
    </div>
  );
};
