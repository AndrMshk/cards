import React, { memo, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { TextField } from '@mui/material';
import { updatePack } from '../bll-dal/packs-async-actions';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { convertFileToBase64 } from '../../../utils/convertorToBase64/conventorToBase64';
import style from './modals.module.scss';

export const UpdatePackModal: React.FC<UpdatePackType> =
  memo(({ packId, packName, isOpenModal, setIsOpenModal, deckCover }) => {

    const dispatch = useAppDispatch();

    const [newPackName, setNewPackName] = useState<string | undefined>(packName);
    const [cover, setCover] = useState<string>(deckCover || '');

    useEffect(() => {
      setCover(deckCover || '');
      setNewPackName(packName || '');
    }, [packName, deckCover]);

    const updatePackHandler = () => {
      packId && dispatch(updatePack(packId, newPackName || '', cover || ''));
      setNewPackName(newPackName);
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
        operationTitle="Change Pack"
        buttonName="Save"
        handleOperation={updatePackHandler}>
        {deckCover
          ? <div className={style.coverUpdate}>
            <label className={style.label}>
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={changeCoverHandler}
              />
              <img src={cover} alt="cover" />
            </label>
            <TextField
              style={{ width: '100%' }}
              label="Title"
              variant="standard"
              color="primary"
              value={newPackName}
              onChange={(e) => setNewPackName(e.currentTarget.value)} />
          </div>
          : <TextField
            style={{ width: '100%' }}
            label="Title"
            variant="standard"
            color="primary"
            value={newPackName}
            onChange={(e) => setNewPackName(e.currentTarget.value)} />
        }
        <div style={{ wordWrap: 'break-word', marginTop: '10px' }}>
          Do you really want to change {deckCover ? 'this pack' : <b>{packName}</b>}?
        </div>
      </BasicModal>
    );
  });

type UpdatePackType = {
  packId: string | undefined
  packName: string | undefined
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  deckCover?: string
}
