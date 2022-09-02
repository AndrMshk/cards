import TableRow from '@mui/material/TableRow';
import { Button, Rating, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React, { useState } from 'react';
import { DeleteCardModal } from '../modals/DeleteCardModal';
import { UpdateCardModal } from '../modals/UpdateCardModal';
import { CardType } from '../../../app/bll-dal/types';
import { formatDate } from '../../packs/table/PacksTable';

type CardItemPropsType = {
  card: CardType
  userId: string
  deleteCardHandler: (cardId: string | undefined) => void
  updateCardHandler: (cardId: string | undefined, cardAnswer: string, cardQuestion: string) => void
}

export const CardItem: React.FC<CardItemPropsType> = ({ card, userId }) => {

  const [deleteCardData, setDeleteCardData] = useState<CardType | null>(null);
  const [updateCardData, setUpdateCardData] = useState<CardType | null>(null);
  const [isOpenDeleteCardModal, setIsOpenDeleteCardModal] = useState(false);
  const [isOpenUpdateCardModal, setIsOpenUpdateCardModal] = useState(false);

  const openModalDeleteCard = (cardId: string | undefined) => {
    setIsOpenDeleteCardModal(true);
    setDeleteCardData(card);
  };

  const openModalUpdateCard = (cardId: string | undefined) => {
    setIsOpenUpdateCardModal(true);
    setUpdateCardData(card);
  };

  return (
    <TableRow
      key={card._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {card.question}
      </TableCell>
      <TableCell align="right">{card.answer}</TableCell>
      <TableCell align="right"><Rating name="read-only" value={card.grade} readOnly />
      </TableCell>
      {/*@ts-ignore*/}
      <TableCell align="right">{formatDate(card.updated)}</TableCell>
      <TableCell sx={{ textAlign: 'right' }}>
        <Button
          onClick={() => openModalDeleteCard(card._id)}
          disabled={userId !== card.user_id}
          color="error"
          size="small"
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
        {deleteCardData && <DeleteCardModal
          cardId={deleteCardData._id}
          cardQuestion={deleteCardData.question}
          isOpenModal={isOpenDeleteCardModal}
          setIsOpenModal={setIsOpenDeleteCardModal} />
        }
        <Button
          onClick={() => openModalUpdateCard(card._id)}
          disabled={userId !== card.user_id}
          color="secondary" size="small"
          startIcon={<BorderColorIcon />}>
          Edit
        </Button>
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

