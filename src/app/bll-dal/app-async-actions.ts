import { ThunkType } from './types';
import { authAPI } from '../../components/auth/bll-dal/auth-api';
import { setProfileAction } from '../../components/profile/bll-dal/profile-reducer';
import { setAppIsInitializedAction, setAppIsLoadingAction } from './app-reducer';
import { setIsLoggedInAction } from '../../components/auth/bll-dal/auth-reducer';
import { axiosErrorHandle } from '../../utils/axiosErrorHandle';

export const authMe = (): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await authAPI.me();
    dispatch(setProfileAction(res.data));
    dispatch(setIsLoggedInAction(true));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
    dispatch(setAppIsInitializedAction(true));
  }
};
