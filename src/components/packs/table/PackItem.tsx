import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, { useState } from 'react';
import { formatDate } from './PacksTable';
import { DeletePackModal } from '../modals/DeletePackModal';
import { UpdatePackModal } from '../modals/UpdatePackModal';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { PackType } from '../../../app/types';
import style from '../packs.module.scss';

export const PackItem: React.FC<PackItemPropsType> = ({ pack, userId }) => {

  const [deletePackData, setDeletePackData] = useState<PackType | null>(null);
  const [updatePackData, setUpdatePackData] = useState<PackType | null>(null);
  const [isOpenDeletePackModal, setIsOpenDeletePackModal] = useState(false);
  const [isOpenUpdatePackModal, setIsOpenUpdatePackModal] = useState(false);

  const openModalDeletePack = () => {
    setIsOpenDeletePackModal(true);
    setDeletePackData(pack);
  };

  const openModalUpdatePack = () => {
    setIsOpenUpdatePackModal(true);
    setUpdatePackData(pack);
  };

  const navigate = useNavigate();

  return (
    <TableRow
      key={pack._id}>
      <TableCell component="th" scope="row" align="left" className={style.packName}>
        <NavLink to={`/cards/${pack._id}/${pack.name}`}>{pack.name}</NavLink>
      </TableCell>
      <TableCell align="right" style={{ width: '110px' }}>{pack.cardsCount}</TableCell>
      <TableCell align="right" style={{ wordWrap: 'break-word', width: '240px' }}>{pack.user_name}</TableCell>
      <TableCell align="right" style={{ width: '150px' }}>{formatDate(pack.updated)}</TableCell>
      <TableCell sx={{ textAlign: 'right' }} style={{ width: '200px' }}>
        <Button
          onClick={openModalDeletePack}
          disabled={userId !== pack.user_id}
          color="error"
          size="small"
          startIcon={<DeleteIcon />} />
        {deletePackData && <DeletePackModal
          packName={pack.name}
          packId={deletePackData._id}
          isOpenModal={isOpenDeletePackModal}
          setIsOpenModal={setIsOpenDeletePackModal} />
        }
        <Button
          onClick={openModalUpdatePack}
          disabled={userId !== pack.user_id}
          color="secondary" size="small"
          startIcon={<BorderColorIcon />} />
        {updatePackData && <UpdatePackModal
          packId={updatePackData._id}
          packName={updatePackData.name}
          isOpenModal={isOpenUpdatePackModal}
          setIsOpenModal={setIsOpenUpdatePackModal} />}
        <Button
          disabled={pack.cardsCount === 0}
          onClick={() => {navigate(`/learn/${pack._id}/${pack.name}`);}}
          color="primary" size="small" startIcon={<MenuBookIcon />} />
      </TableCell>
    </TableRow>
  );
};

type PackItemPropsType = {
  pack: PackType
  userId: string
  deletePackHandler: (packId: string) => void
  changePackNameHandler: (packId: string, newPackName: string) => void
}
