import React from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { useParams } from 'react-router-dom';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { createCard } from '../bll-dal/cards-async-actions';

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
        <TextField
          label="Question"
          variant="standard"
          color="secondary"
          value={newCardQuestion}
          onChange={e => setNewCardQuestion(e.currentTarget.value)} />
        <TextField
          label="Answer"
          variant="standard"
          color="secondary"
          value={newCardAnswer}
          onChange={e => setNewCardAnswer(e.currentTarget.value)} />
      </BasicModal>
    );
  });

type AddNewCardPropsType = {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
