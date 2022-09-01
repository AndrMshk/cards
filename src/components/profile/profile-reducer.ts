import { UserType } from '../../app/types';

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
    case 'profile/SET-NEW-USER-NAME':
      return { ...state, name: action.newName };
    default:
      return state;
  }
};

export type SetProfileActionType = ReturnType<typeof setProfileAction>
export type SetNewUserNameActionType = ReturnType<typeof setNewUserNameAction>

export const setProfileAction = (user: UserType | null) => ({ type: 'profile/SET-NEW-PROFILE', user } as const);
export const setNewUserNameAction = (newName: string) => ({ type: 'profile/SET-NEW-USER-NAME', newName } as const);

export type ProfileActionType =
  | SetProfileActionType
  | SetNewUserNameActionType



