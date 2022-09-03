import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { createPack } from '../bll-dal/packs-async-actions';

export const AddNewPackModal: React.FC<AddNewPackPropsType> =
  React.memo(({ isOpenModal, setIsOpenModal }) => {

    const dispatch = useAppDispatch();

    const [newPackName, setNewPackName] = useState('');

    useEffect(()=>{setNewPackName('')}, [isOpenModal])

    const addNewPack = () => {
      dispatch(createPack(newPackName));
      setNewPackName('')
    };

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Add new Card"
        buttonName="Save"
        handleOperation={addNewPack}>
        <TextField
          style={{width: '100%'}}
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
