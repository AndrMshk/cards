import { AxiosResponse } from 'axios';
import { instance } from '../../../app/bll-dal/app-api';
import { UserType } from '../../../app/bll-dal/types';

export const profileApi = {
  setNewUserName(name: string) {
    return instance.put<{ name: string },
      AxiosResponse<{ updatedUser: UserType, error?: string }>>('auth/me', { name });
  },
};
