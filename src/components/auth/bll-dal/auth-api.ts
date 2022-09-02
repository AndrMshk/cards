import { AxiosResponse } from 'axios';
import { instance } from '../../../app/bll-dal/app-api';
import {
  ForgotRequestDataType,
  LoginRequestDataType,
  LoginResponseType,
  NewPasswordRequestDataType,
  PasswordResponseType,
  SignUpRequestDataType,
  SignUpResponseType,
  UserType,
} from '../../../app/bll-dal/types';

export const authAPI = {
  me() {
    return instance.post<{}, AxiosResponse<UserType>>('auth/me');
  },
  login(data: LoginRequestDataType) {
    return instance.post<LoginRequestDataType, AxiosResponse<LoginResponseType>>('auth/login', data);
  },
  logout() {
    return instance.delete<LoginResponseType>('auth/me');
  },
  signUp(data: SignUpRequestDataType) {
    return instance.post<SignUpResponseType>('auth/register', data);
  },
  forgot(data: ForgotRequestDataType) {
    return instance.post<PasswordResponseType>('auth/forgot', data);
  },
  newPassword(data: NewPasswordRequestDataType) {
    return instance.post<PasswordResponseType>('auth/set-new-password', data);
  },
};

