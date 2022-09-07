import React, { memo, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { createPack } from '../bll-dal/packs-async-actions';
import style from './modals.module.scss';
import { convertFileToBase64 } from '../../../utils/convertorToBase64/conventorToBase64';

export const AddNewPackModal: React.FC<AddNewPackPropsType> = memo(({ isOpenModal, setIsOpenModal }) => {

  const dispatch = useAppDispatch();

  const [newPackName, setNewPackName] = useState('');
  const [cover, setCover] = useState('');

  useEffect(() => {
    setNewPackName('');
    setCover('');
  }, [isOpenModal]);

  const addNewPackHandler = () => {
    dispatch(createPack(newPackName, cover));
    setNewPackName('');
    setCover('');
  };

  const changeCoverHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      convertFileToBase64(e.target.files[0], setCover);
    }
  };

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      operationTitle="Add new Card"
      buttonName="Save"
      handleOperation={addNewPackHandler}>
      <div className={style.main}>
        <div className={style.coverTitle}>
          <h3>Cover</h3>
          <label style={{ display: 'block', cursor: 'pointer' }}>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={changeCoverHandler} />
            <span>Change cover</span>
          </label>
        </div>
        <div className={style.cover}>
          {cover
            ? <img src={cover} alt="cover" />
            : <div>No cover</div>}
        </div>
      </div>
      <TextField
        style={{ width: '100%' }}
        label="Pack name"
        variant="standard"
        color="primary"
        value={newPackName}
        onChange={e => setNewPackName(e.currentTarget.value)} />
    </BasicModal>
  );
});

type AddNewPackPropsType = {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
