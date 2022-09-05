import React, { useEffect, useState } from 'react';
import { Switch, TextField } from '@mui/material';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { useParams } from 'react-router-dom';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { createCard } from '../bll-dal/cards-async-actions';
import style from './modals.module.scss';
import { convertFileToBase64 } from '../../../utils/convertorToBase64/conventorToBase64';

export const AddNewCardModal: React.FC<AddNewCardPropsType> =
  React.memo(({ isOpenModal, setIsOpenModal }) => {

    const dispatch = useAppDispatch();
    const { packId } = useParams<'packId'>();

    const [newCardQuestion, setNewCardQuestion] = useState('');
    const [newCardAnswer, setNewCardAnswer] = useState('');
    const [isPictureQuestion, setIsPictureQuestion] = useState(false);
    const [pictureQuestion, setPictureQuestion] = useState('');

    useEffect(() => {
      setNewCardAnswer('');
      setNewCardQuestion('');
      setIsPictureQuestion(false);
      setPictureQuestion('');
    }, [isOpenModal]);

    const addNewCard = () => {
      packId && dispatch(createCard(
        {
          cardsPack_id: packId,
          question: newCardQuestion,
          answer: newCardAnswer,
          grade: 0,
          questionImg: pictureQuestion,
        }));
      setNewCardQuestion('');
      setNewCardAnswer('');
    };

    const changePictureQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        convertFileToBase64(e.target.files[0], setPictureQuestion);
      }
    };

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Add new Card"
        buttonName="Save"
        handleOperation={addNewCard}>
        <div className={style.cardContent}>
          <div className={style.switchBlock}>
            <span>Text question</span>
            <Switch
              checked={isPictureQuestion}
              onChange={(e) => {setIsPictureQuestion(e.target.checked);}}
              size="small"
            />
            <span>Picture question</span>
          </div>
          {isPictureQuestion
            ? <div className={style.pictureQuestion}>
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={changePictureQuestionHandler}
                />
                <div>
                  {!pictureQuestion
                    ? <div>Add picture for question</div>
                    : <img src={pictureQuestion} alt="pictureQuestion" />
                  }
                </div>
              </label>
            </div>
            : <TextField
              label="Question"
              variant="standard"
              color="primary"
              value={newCardQuestion}
              onChange={e => setNewCardQuestion(e.currentTarget.value)} />}
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
