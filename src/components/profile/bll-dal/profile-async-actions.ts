import { ThunkType } from '../../../app/bll-dal/types';
import { setAppIsLoadingAction } from '../../../app/bll-dal/app-reducer';
import { profileApi } from './profile-api';
import { updateUserAction } from './profile-reducer';
import { axiosErrorHandle } from '../../../utils/axiosErrorHandle';

export const setNewUserName = (newName: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await profileApi.updateUser({ name: newName });
    dispatch(updateUserAction({ name: newName }));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const setNewUserAvatar = (avatar: string | undefined): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await profileApi.updateUser({ avatar });
    dispatch(updateUserAction({ avatar: avatar || '' }));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};
