import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { setAppErrorAction } from '../app/bll-dal/app-reducer';

export const axiosErrorHandle = (err: unknown, dispatch: Dispatch) => {
  const errr = err as AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const errrr = errr.response?.data ? errr.response.data.error : errr.message;
    dispatch(setAppErrorAction(errrr));
  } else {
    dispatch(setAppErrorAction('Some error'));
  }
}
