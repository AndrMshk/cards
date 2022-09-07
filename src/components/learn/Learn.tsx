import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import { CardType } from '../../app/bll-dal/types';
import { useAppDispatch, useAppSelector } from '../../app/bll-dal/store';
import { setCards, updateCardGrade } from '../cards/bll-dal/cards-async-actions';
import { setDefaultPageCountValueAction } from '../cards/bll-dal/cards-reducer';
import { BackButtonComponent } from '../../common/backButtonComponent/BackButtonComponent';
import style from './learn.module.scss';

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
    const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
    return { sum: newSum, id: newSum < rand ? i : acc.id };
  }, { sum: 0, id: -1 });
  return cards[res.id + 1];
};

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer'];

export const Learn = () => {

  const dispatch = useAppDispatch();
  const { packId } = useParams();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [card, setCard] = useState<CardType>({} as CardType);
  const [isValidPictureQuestion, setIsValidPictureQuestion] = useState(true);

  const { cards, packName } = useAppSelector(state => state.cards);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: { grade: 0 },
    onSubmit: values => {
      setIsChecked(false);
      setCard(getCard(cards));
      if (card._id) {dispatch(updateCardGrade(card._id, values.grade));}
      values.grade = 0;
    },
  });

  useEffect(() => {
    dispatch(setCards({ cardsPack_id: packId, page: 1, pageCount: maxCardsCount }));
    return () => {dispatch(setDefaultPageCountValueAction());};
  }, [packId]);

  useEffect(() => {if (cards.length) {setCard(getCard(cards));}}, [cards]);

  if (!isLoggedIn) {return <Navigate to={'/login'} />;}

  return (
    <div className={style.main}>
      <BackButtonComponent path="/packs" title="Back to pack list" />
      <div className={style.content}>
        <h2>Learn {packName}</h2>
        <Paper className={style.learnPaper}>
          <h3>Question:</h3>
          {card.questionImg && isValidPictureQuestion
            ? <img
              onError={() => {setIsValidPictureQuestion(false);}}
              src={card.questionImg} alt="question" />
            : <span className={style.text}>{card.question}</span>
          }
          <h5>Количество попыток ответов на вопрос: {card.shots}</h5>
          {!isChecked
            ? <Button variant="contained" onClick={() => setIsChecked(true)}>Show answer</Button>
            : <div className={style.answerBlock}>
              <h3>Answer: </h3>
              <span className={style.text}>{card.answer}</span>
              <h5>Rate yourself:</h5>
              <FormControl>
                <form onSubmit={formik.handleSubmit}>
                  <RadioGroup name="grade">
                    {grades.map((el, index) =>
                      <FormControlLabel
                        key={index}
                        value={grades.indexOf(el) + 1}
                        control={<Radio />}
                        label={el}
                        onChange={formik.handleChange} />)}
                  </RadioGroup>
                  <Button
                    disabled={formik.values.grade === 0}
                    variant="contained"
                    type="submit"
                  >Next</Button>
                </form>
              </FormControl>
            </div>}
        </Paper>
      </div>
    </div>
  );
};



