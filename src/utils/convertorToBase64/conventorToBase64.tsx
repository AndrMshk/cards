import { ChangeEvent } from 'react';
import { setAppErrorAction } from '../../app/bll-dal/app-reducer';
import { DispatchType, ThunkType } from '../../app/bll-dal/types';

export const uploadHandler = (
  e: ChangeEvent<HTMLInputElement>, dispatch: DispatchType, action: (value: string | undefined) => ThunkType,
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0];
    if (file.size < 2000000) {
      convertFileToBase64(file, (file64: string) => {
        dispatch(action(file64));
      });
    } else {
      dispatch(setAppErrorAction('Image size is to large'));
    }
  }
};

const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const file64 = reader.result as string;
    callBack(file64);
  };
  reader.readAsDataURL(file);
};
