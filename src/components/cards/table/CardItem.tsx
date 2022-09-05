import TableRow from '@mui/material/TableRow';
import { Button, Rating, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React, { useState } from 'react';
import { DeleteCardModal } from '../modals/DeleteCardModal';
import { UpdateCardModal } from '../modals/UpdateCardModal';
import { CardType } from '../../../app/bll-dal/types';
import { formatDate } from '../../packs/table/PacksTable';
import style from '../cards.module.scss';
import { useAppSelector } from '../../../app/bll-dal/store';

export const CardItem: React.FC<CardItemPropsType> = ({ card, userId }) => {

  const [deleteCardData, setDeleteCardData] = useState<CardType | null>(null);
  const [updateCardData, setUpdateCardData] = useState<CardType | null>(null);
  const [isOpenDeleteCardModal, setIsOpenDeleteCardModal] = useState(false);
  const [isOpenUpdateCardModal, setIsOpenUpdateCardModal] = useState(false);
  const [isValidPictureQuestion, setIsValidPictureQuestion] = useState(true);

  const isLoading = useAppSelector(state => state.app.isLoading);

  const openModalDeleteCard = () => {
    setIsOpenDeleteCardModal(true);
    setDeleteCardData(card);
  };

  const openModalUpdateCard = () => {
    setIsOpenUpdateCardModal(true);
    setUpdateCardData(card);
  };

  return (
    <TableRow key={card._id}>
      <TableCell scope="row" className={style.text}>
        {card.questionImg && isValidPictureQuestion
          ? <div className={style.question}>
            <img
              onError={() => {setIsValidPictureQuestion(false);}}
              src={card.questionImg}
              alt="question" />
          </div>
          : card.question}
      </TableCell>
      <TableCell className={style.text}>{card.answer}</TableCell>
      <TableCell
        align="right"
        style={{ minWidth: '130px', maxWidth: '130px' }}>
        <Rating name="read-only" value={card.grade} readOnly />
      </TableCell>
      {/*@ts-ignore*/}
      <TableCell align="right" className={style.text}>{formatDate(card.updated)}</TableCell>
      <TableCell sx={{ textAlign: 'right' }} style={{ minWidth: '130px', maxWidth: '130px' }}>
        <Button
          onClick={openModalDeleteCard}
          disabled={userId !== card.user_id || isLoading}
          color="error"
          size="small"
          startIcon={<DeleteIcon />} />
        {deleteCardData && <DeleteCardModal
          cardId={deleteCardData._id}
          cardQuestion={deleteCardData.question}
          isOpenModal={isOpenDeleteCardModal}
          setIsOpenModal={setIsOpenDeleteCardModal}
        />
        }
        <Button
          onClick={openModalUpdateCard}
          disabled={userId !== card.user_id || isLoading}
          color="primary" size="small"
          startIcon={<BorderColorIcon />} />
        {updateCardData && <UpdateCardModal
          cardId={updateCardData._id}
          cardQuestion={updateCardData.question}
          cardAnswer={updateCardData.answer}
          isOpenModal={isOpenUpdateCardModal}
          setIsOpenModal={setIsOpenUpdateCardModal} />}
      </TableCell>
    </TableRow>
  );
};

type CardItemPropsType = {
  card: CardType
  userId: string
  deleteCardHandler: (cardId: string | undefined) => void
  updateCardHandler: (cardId: string | undefined, cardAnswer: string, cardQuestion: string) => void
}

