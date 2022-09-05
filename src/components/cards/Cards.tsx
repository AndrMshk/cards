import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/bll-dal/store';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CardsTable } from './table/CardsTable';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import useDebounce from '../../utils/hooks/useDebounce';
import { AddNewCardModal } from './modals/AddNewCardModal';
import { BackButtonComponent } from '../../common/backButtonComponent/BackButtonComponent';
import { setCards } from './bll-dal/cards-async-actions';
import style from './cards.module.scss';
import { PositionedMenu } from '../../common/optionMenu/OptionMenu';
import { DeletePackModal } from '../packs/modals/DeletePackModal';
import { UpdatePackModal } from '../packs/modals/UpdatePackModal';

export const Cards = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { packId } = useParams();

  const [question, setQuestion] = useState<string>('');
  const [isOpenModalAddNewCard, setIsOpenModalAddNewCard] = useState(false);
  const [isOpenDeletePackModal, setIsOpenDeletePackModal] = useState(false);
  const [isOpenUpdatePackModal, setIsOpenUpdatePackModal] = useState(false);

  const { packUserId, cards, page, pageCount, cardsTotalCount, packName } = useAppSelector(state => state.cards);
  const userId = useAppSelector(state => state.profile._id);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const pack = useAppSelector(state => state.packs.currentCardPack);

  const questionDebounce = useDebounce(question, 1000);

  const packMenuData = [
    {
      title: 'Learn',
      action: () => {!!cardsTotalCount && navigate(`/learn/${packId}`);},
    },
    {
      title: 'Edit',
      action: () => {setIsOpenUpdatePackModal(true);},
    },
    {
      title: 'Delete',
      action: () => {setIsOpenDeletePackModal(true);},
    },
  ];

  useEffect(() => {
    packId && dispatch(setCards(
      {
        cardsPack_id: packId,
        page,
        pageCount,
        cardQuestion: question || undefined,
      }));
  }, [packId, page, pageCount, questionDebounce, pack]);

  if (!isLoggedIn) {return <Navigate to={'/login'} />;}

  return (
    <div className={style.main}>
      <DeletePackModal
        packName={packName}
        packId={packId}
        setIsOpenModal={setIsOpenDeletePackModal}
        isOpenModal={isOpenDeletePackModal} />
      <UpdatePackModal
        packName={packName}
        packId={packId}
        setIsOpenModal={setIsOpenUpdatePackModal}
        isOpenModal={isOpenUpdatePackModal} />
      <BackButtonComponent />
      <div className={style.content}>
        {userId !== packUserId
          ? <div className={style.headerBlock}>
            <div
              className={style.title}
              onClick={() => {!!cardsTotalCount && navigate(`/learn/${packId}`);}}
            ><h2>{packName}</h2></div>
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
              <div>
                <PositionedMenu items={packMenuData}><h2>{packName}</h2></PositionedMenu>
              </div>
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
          </div>}
        <CardsTable cards={cards} userId={userId} pageCount={cardsTotalCount} rowsPerPage={pageCount} />
      </div>
    </div>
  );
};
