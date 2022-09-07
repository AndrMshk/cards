import React, { FC, memo, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { TextField } from '@mui/material';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { updateCard } from '../bll-dal/cards-async-actions';
import style from './modals.module.scss';
import { convertFileToBase64 } from '../../../utils/convertorToBase64/conventorToBase64';

export const UpdateCardModal: FC<UpdateCardPropsType> =
  memo(({ cardId, cardQuestion, cardAnswer, isOpenModal, setIsOpenModal, questionImg }) => {

    const dispatch = useAppDispatch();

    const [newCardQuestion, setNewCardQuestion] = useState(cardQuestion);
    const [newCardAnswer, setNewCardAnswer] = useState(cardAnswer);
    const [newQuestionImg, setNewQuestionImg] = useState(questionImg);

    const updateCardHandler = () => {
      cardId && dispatch(updateCard(cardId, newCardQuestion, newCardAnswer));
      setNewCardQuestion('');
      setNewCardAnswer('');
    };

    useEffect(() => {
      setNewCardQuestion(cardQuestion || '');
      setNewCardAnswer(cardAnswer || '');
      setNewQuestionImg(questionImg || '');
    }, [isOpenModal]);

    const changeQuestionImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {convertFileToBase64(e.target.files[0], setNewQuestionImg);}
    };

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Change Card"
        buttonName="Save"
        handleOperation={updateCardHandler}>
        <div className={style.cardContent}>
          {questionImg
            ? <div className={style.questionImgUpdate}>
              <label className={style.label}>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={changeQuestionImgHandler} />
                <img src={newQuestionImg} alt="cover" />
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
        <div style={{ wordWrap: 'break-word' }}>
          Do you really want to change {questionImg ? <b>this card</b> : <b>{cardQuestion}</b>} and <b>{cardAnswer}</b>?
        </div>
      </BasicModal>
    );
  });

type UpdateCardPropsType = {
  cardId: string | undefined
  cardQuestion?: string | undefined
  cardAnswer: string | undefined
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  questionImg?: string | undefined
}
