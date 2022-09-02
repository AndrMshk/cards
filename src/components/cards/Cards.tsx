import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/bll-dal/store';
import { Navigate, useParams } from 'react-router-dom';
import { CardsTable } from './table/CardsTable';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import useDebounce from '../../utils/hooks/useDebounce';
import { AddNewCardModal } from './modals/AddNewCardModal';
import { BackButtonComponent } from '../../common/backButtonComponent/BackButtonComponent';
import { setCards } from './bll-dal/cards-async-actions';
import style from './cards.module.scss';

export const Cards = () => {

  const dispatch = useAppDispatch();
  const { packId, packName } = useParams();

  const [question, setQuestion] = useState<string>('');
  const [isOpenModalAddNewCard, setIsOpenModalAddNewCard] = useState(false);

  const { packUserId, cards, page, pageCount, cardsTotalCount } = useAppSelector(state => state.cards);
  const userId = useAppSelector(state => state.profile._id);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const questionDebounce = useDebounce(question, 1000);

  useEffect(() => {
    packId && dispatch(setCards(
      {
        cardsPack_id: packId,
        page,
        pageCount,
        cardQuestion: !!question ? question : undefined,
      }));
  }, [packId, page, pageCount, questionDebounce]);

  if (!isLoggedIn) {return <Navigate to={'/login'} />;}

  return (
    <div className={style.main}>
      <BackButtonComponent />
      <div className={style.content}>
        {userId !== packUserId
          ? <div className={style.headerBlock}>
            <div className={style.title}><h3>{packName}</h3></div>
            <TextField
              className={style.search}
              id="search"
              label="search"
              variant="outlined"
              value={question}
              onChange={e => setQuestion(e.target.value)} />
            <AddNewCardModal isOpenModal={isOpenModalAddNewCard} setIsOpenModal={setIsOpenModalAddNewCard} />
          </div>
          : <div className={style.headerBlock}>
            <div className={style.title}>
              <h3>{packName}</h3>
              <Button
                onClick={() => setIsOpenModalAddNewCard(true)}
                variant="contained">Add new card</Button>
            </div>
            <TextField
              className={style.search}
              id="search"
              label="search"
              variant="outlined"
              value={question}
              onChange={e => setQuestion(e.target.value)} />
            <AddNewCardModal isOpenModal={isOpenModalAddNewCard} setIsOpenModal={setIsOpenModalAddNewCard} />
          </div>
        }
        <CardsTable cards={cards} userId={userId} pageCount={cardsTotalCount} rowsPerPage={pageCount} />
      </div>
    </div>
  );
};
