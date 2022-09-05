import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { TextField } from '@mui/material';
import { updatePack } from '../bll-dal/packs-async-actions';
import { BasicModal } from '../../../common/basicModal/BasicModal';

export const UpdatePackModal: React.FC<UpdatePackType> =
  React.memo(({ packId, packName, isOpenModal, setIsOpenModal }) => {

    const dispatch = useAppDispatch();

    const [newPackName, setNewPackName] = useState(packName);

    useEffect(()=>{setNewPackName(packName)}, [packName])

    const updatePackHandler = () => {
      packId  && dispatch(updatePack(packId, newPackName || ''));
      setNewPackName(newPackName);
    };

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Change Pack"
        buttonName="Save"
        handleOperation={updatePackHandler}>
        <TextField
          style={{ width: '100%' }}
          label="Title"
          variant="standard"
          color="primary"
          value={newPackName}
          onChange={(e) => setNewPackName(e.currentTarget.value)} />
        <div style={{ wordWrap: 'break-word', marginTop: '10px' }}>Do you really want to change <b>{packName}</b>?</div>
      </BasicModal>
    );
  });

type UpdatePackType = {
  packId: string | undefined
  packName: string | undefined
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
