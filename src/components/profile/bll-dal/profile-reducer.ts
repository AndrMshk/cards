import { UpdateUserDataType, UserType } from '../../../app/bll-dal/types';

const initialState = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  rememberMe: false,
};

export const profileReducer = (
  state: UserType = initialState, action: ProfileActionType): UserType => {
  switch (action.type) {
    case 'profile/SET-NEW-PROFILE':
      return { ...state, ...action.user };
    case 'profile/UPDATE-USER':
      return { ...state, ...action.params };
    default:
      return state;
  }
};

export type SetProfileActionType = ReturnType<typeof setProfileAction>
export type UpdateUserActionType = ReturnType<typeof updateUserAction>

export const setProfileAction = (user: UserType | null) => ({ type: 'profile/SET-NEW-PROFILE', user } as const);
export const updateUserAction = (params: UpdateUserDataType) => ({ type: 'profile/UPDATE-USER', params } as const);

export type ProfileActionType =
  | SetProfileActionType
  | UpdateUserActionType



