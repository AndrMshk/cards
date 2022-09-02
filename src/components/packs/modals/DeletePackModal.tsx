import React from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { deletePack } from '../bll-dal/packs-async-actions';

export const DeletePackModal: React.FC<DeletePackPropsType> =
  React.memo(({ packId, packName, isOpenModal, setIsOpenModal }) => {

    const dispatch = useAppDispatch();

    const deletePackHandler = () => {
      packId && dispatch(deletePack(packId));
    };

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Add new Pack"
        buttonName="Yes"
        handleOperation={deletePackHandler}>
        <div>Do you really want to remove pack <b>{packName}</b>?</div>
        <div>The pack will be removed.</div>
      </BasicModal>
    );
  });

type DeletePackPropsType = {
  packId: string | undefined
  packName: string | undefined
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
