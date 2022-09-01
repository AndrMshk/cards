import { ThunkType } from './types';
import { authAPI } from '../components/auth/auth-api';
import { setProfileAction } from '../components/profile/profile-reducer';
import axios from 'axios';
import { setAppErrorAction, setAppIsInitializedAction, setAppIsLoadingAction } from './app-reducer';
import { setIsLoggedInAction } from '../components/auth/auth-reducer';

export const authMe = (): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await authAPI.me();
    dispatch(setProfileAction(res.data));
    dispatch(setIsLoggedInAction(true))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
    dispatch(setAppIsInitializedAction(true));
  }
};
