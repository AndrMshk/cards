import { ThunkType } from '../../../app/bll-dal/types';
import { setAppErrorAction, setAppIsLoadingAction } from '../../../app/bll-dal/app-reducer';
import { profileApi } from './profile-api';
import axios from 'axios';
import { setNewUserNameAction } from './profile-reducer';

export const setNewUserName = (newName: string): ThunkType => async(dispatch) => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await profileApi.setNewUserName(newName);
    dispatch(setNewUserNameAction(newName));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};
