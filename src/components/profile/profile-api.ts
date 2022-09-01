import { AxiosResponse } from 'axios';
import { instance } from '../../app/app-api';
import { UserType } from '../auth/auth-api';

export const profileApi = {
  setNewUserName(name: string) {
    return instance.put<{ name: string },
      AxiosResponse<{ updatedUser: UserType, error?: string }>>('auth/me', { name });
  },
};
