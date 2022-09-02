import React from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { deleteCard } from '../bll-dal/cards-async-actions';
import { BasicModal } from '../../../common/basicModal/BasicModal';

export const DeleteCardModal: React.FC<DeleteCardPropsType> =
  React.memo(({ cardId, cardQuestion, isOpenModal, setIsOpenModal }) => {

    const dispatch = useAppDispatch();

    const deleteCardHandler = () => {
      cardId && dispatch(deleteCard(cardId));
    };

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Add new Card"
        buttonName="Save"
        handleOperation={deleteCardHandler}>
        <div>Do you really want to remove card with question <b>{cardQuestion}</b>?</div>
        <div>The card will be removed.</div>
      </BasicModal>
    );
  });

type DeleteCardPropsType = {
  cardId: string | undefined
  cardQuestion?: string
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
