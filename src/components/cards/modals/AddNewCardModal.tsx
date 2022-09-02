import React from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { useParams } from 'react-router-dom';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { createCard } from '../bll-dal/cards-async-actions';
import style from '../../../common/basicModal/basicModal.module.scss';

export const AddNewCardModal: React.FC<AddNewCardPropsType> =
  React.memo(({ isOpenModal, setIsOpenModal }) => {

    const dispatch = useAppDispatch();
    const { packId } = useParams<'packId'>();

    const [newCardQuestion, setNewCardQuestion] = React.useState('');
    const [newCardAnswer, setNewCardAnswer] = React.useState('');

    const addNewCard = () => {
      packId && dispatch(createCard(
        { cardsPack_id: packId, question: newCardQuestion, answer: newCardAnswer, grade: 0 }));
      setNewCardQuestion('');
      setNewCardAnswer('');
    };

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Add new Card"
        buttonName="Save"
        handleOperation={addNewCard}>
        <div className={style.cardContent}>
          <TextField
            label="Question"
            variant="standard"
            color="primary"
            value={newCardQuestion}
            onChange={e => setNewCardQuestion(e.currentTarget.value)} />
          <TextField
            label="Answer"
            variant="standard"
            color="primary"
            value={newCardAnswer}
            onChange={e => setNewCardAnswer(e.currentTarget.value)} />
        </div>
      </BasicModal>
    );
  });

type AddNewCardPropsType = {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
