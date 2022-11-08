import {
  LoginRequestDataType,
  NewPasswordRequestDataType,
  SignUpRequestDataType,
  ThunkType,
} from '../../../app/bll-dal/types';
import { setAppIsLoadingAction } from '../../../app/bll-dal/app-reducer';
import { authAPI } from './auth-api';
import { setProfileAction } from '../../profile/bll-dal/profile-reducer';
import { setIsLoggedInAction } from './auth-reducer';
import { axiosErrorHandle } from '../../../utils/axiosErrorHandle';

export const login = (data: LoginRequestDataType): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await authAPI.login(data);
    dispatch(setProfileAction(res.data));
    dispatch(setIsLoggedInAction(true));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const logout = (): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await authAPI.logout();
    dispatch(setIsLoggedInAction(false));
    dispatch(setProfileAction(null));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const signUp = (data: SignUpRequestDataType): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await authAPI.signUp(data);
    return res.data;
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const sendEmail = (email: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await authAPI.forgot({
      email,
      from: 'Memo Cards Team <memocards@gmail.com>',
      message: 'Test mail for password recovery',
    });
    return res.data;
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const setNewPassword = (data: NewPasswordRequestDataType): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await authAPI.newPassword(data);
    return res.data;
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

