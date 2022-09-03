import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { deletePack } from '../bll-dal/packs-async-actions';
import { BasicModal2 } from '../../../common/basicModal/BasicModal2';

export const DeletePackModal2: React.FC<DeletePackPropsType> =
  React.memo(({
    packId, packName, isOpenModal,
    setIsOpenModal,
  }) => {

    const dispatch = useAppDispatch();

    const isOpen = useAppSelector(state => state.modals.isOpen);

    const deletePackHandler = () => {packId && dispatch(deletePack(packId));};

    return (
      <BasicModal2
        isOpenModal={isOpen}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Add new Pack"
        buttonName="Yes"
        isForDelete
        handleOperation={deletePackHandler}>
        <div style={{ wordWrap: 'break-word' }}>Do you really want to remove pack <b>{packName}</b>?</div>
        <div>The pack will be removed.</div>
      </BasicModal2>
    );
  });

type DeletePackPropsType = {
  packId: string | undefined
  packName: string | undefined
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
