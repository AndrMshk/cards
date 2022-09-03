import { AxiosResponse } from 'axios';
import { instance } from '../../../app/bll-dal/app-api';
import { UpdateUserDataType, UserType } from '../../../app/bll-dal/types';

export const profileApi = {
  updateUser(params: UpdateUserDataType) {
    return instance.put<{ params: UpdateUserDataType },
      AxiosResponse<{ updatedUser: UserType, error?: string }>>('auth/me', { ...params });
  },
};
