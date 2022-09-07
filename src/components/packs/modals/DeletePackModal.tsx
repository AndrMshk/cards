import React, { memo } from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { deletePack } from '../bll-dal/packs-async-actions';
import style from './modals.module.scss';

export const DeletePackModal: React.FC<DeletePackPropsType> =
  memo(({ packId, packName, isOpenModal, setIsOpenModal, deckCover }) => {

    const dispatch = useAppDispatch();

    const deletePackHandler = () => {packId && dispatch(deletePack(packId));};

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Delete pack?"
        buttonName="Yes"
        isForDelete
        handleOperation={deletePackHandler}>
        {deckCover && <div className={style.coverDelete}><img src={deckCover} alt="cover" /></div>}
        <div style={{ wordWrap: 'break-word' }}>Do you really want to remove pack <b>{packName}</b>?</div>
        <div>The pack will be removed.</div>
      </BasicModal>
    );
  });

type DeletePackPropsType = {
  packId: string | undefined
  packName: string | undefined
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  deckCover?: string
}
