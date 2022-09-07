import React, { FC, memo } from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { deleteCard } from '../bll-dal/cards-async-actions';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import style from './modals.module.scss';

export const DeleteCardModal: FC<DeleteCardPropsType> =
  memo(({ cardId, cardQuestion, isOpenModal, setIsOpenModal, questionImg }) => {

    const dispatch = useAppDispatch();

    const deleteCardHandler = () => {cardId && dispatch(deleteCard(cardId));};

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Add new Card"
        buttonName="Save"
        isForDelete
        handleOperation={deleteCardHandler}>
        {questionImg
          ? <div className={style.questionImgDelete}>
            Do you really want to remove card with this question?
            <img src={questionImg} alt="questionImg" />
          </div>
          : <div style={{ wordWrap: 'break-word' }}>
            Do you really want to remove card with question <b>{cardQuestion}</b>?
          </div>}
        <div>The card will be removed.</div>
      </BasicModal>
    );
  });

type DeleteCardPropsType = {
  cardId: string | undefined
  cardQuestion?: string
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  questionImg?: string
}
