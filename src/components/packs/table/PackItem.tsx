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
import { PackType } from '../../../app/bll-dal/types';
import style from '../packs.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import { setCurrentPackAction } from '../bll-dal/packs-reducer';

export const PackItem: React.FC<PackItemPropsType> = ({ pack, userId }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deletePackData, setDeletePackData] = useState<PackType | null>(null);
  const [updatePackData, setUpdatePackData] = useState<PackType | null>(null);
  const [isOpenDeletePackModal, setIsOpenDeletePackModal] = useState(false);
  const [isOpenUpdatePackModal, setIsOpenUpdatePackModal] = useState(false);

  const isLoading = useAppSelector(state => state.app.isLoading);

  const openModalDeletePackHandler = () => {
    setIsOpenDeletePackModal(true);
    setDeletePackData(pack);
  };

  const openModalUpdatePackHandler = () => {
    setIsOpenUpdatePackModal(true);
    setUpdatePackData(pack);
  };

  return (
    <TableRow
      key={pack._id}>
      <TableCell scope="row" align="left" className={style.packName}>
        <span onClick={()=>{
          navigate(`/cards/${pack._id}/${pack.name}`)
          dispatch(setCurrentPackAction(pack))
        }}>{pack.name}</span>
        {/*<NavLink to={`/cards/${pack._id}/${pack.name}`}>{pack.name}</NavLink>*/}
      </TableCell>
      <TableCell align="right" style={{ minWidth: '110px', maxWidth: '110px' }}>{pack.cardsCount}</TableCell>
      <TableCell
        align="right"
        style={{ wordWrap: 'break-word', minWidth: '198px', maxWidth: '198px' }}>{pack.user_name}</TableCell>
      <TableCell align="right" style={{ minWidth: '140px', maxWidth: '140px' }}>{formatDate(pack.updated)}</TableCell>
      <TableCell sx={{ textAlign: 'right' }} style={{ minWidth: '200px', maxWidth: '200px' }}>
        <Button
          onClick={openModalDeletePackHandler}
          disabled={userId !== pack.user_id || isLoading}
          color="error" size="small"
          startIcon={<DeleteIcon />} />
        {deletePackData && <DeletePackModal
          packName={deletePackData.name}
          packId={deletePackData._id}
          isOpenModal={isOpenDeletePackModal}
          setIsOpenModal={setIsOpenDeletePackModal} />}
        <Button
          onClick={openModalUpdatePackHandler}
          disabled={userId !== pack.user_id || isLoading}
          color="secondary" size="small"
          startIcon={<BorderColorIcon />} />
        {updatePackData && <UpdatePackModal
          packId={updatePackData._id}
          packName={updatePackData.name}
          isOpenModal={isOpenUpdatePackModal}
          setIsOpenModal={setIsOpenUpdatePackModal} />}
        <Button
          disabled={pack.cardsCount === 0 || isLoading}
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
