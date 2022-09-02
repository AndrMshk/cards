import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch } from '../../../app/bll-dal/store';
import TablePagination from '@mui/material/TablePagination';
import { PackItem } from './PackItem';
import { SortTableCell } from './SortTableSell';
import { setCurrentPageAction, setCurrentPageCountAction } from '../bll-dal/packs-reducer';
import { deletePack, updatePack } from '../bll-dal/packs-async-actions';
import { PackType } from '../../../app/bll-dal/types';
import style from '../packs.module.scss';

export const formatDate = (date: Date | string | number) => {
  return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString();
};

const tableHeaderTitles = [
  {
    title: 'Name',
    value: 'name',
    isAvailableToSort: false,
    sort: 'none',
  },
  {
    title: 'Cards Count',
    value: 'cardsCount',
    isAvailableToSort: false,
    sort: 'none',
  },
  {
    title: 'Created By',
    value: 'user_name',
    isAvailableToSort: false,
    sort: 'none',
  },
  {
    title: 'Last Updated',
    value: 'updated',
    isAvailableToSort: false,
    sort: 'none',
  },
];

export const PacksTable: React.FC<PacksTablePropsType> = ({ packs, userId, pageCount, rowsPerPage }) => {

  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(0);
  const [headersForSort, setHeadersForSort] = useState(tableHeaderTitles);

  const showIsAvailableToSortHandler = (title: string, is: boolean) => {
    setHeadersForSort(headersForSort.map(
      el => el.title === title ? { ...el, isAvailableToSort: is } : { ...el, isAvailableToSort: false }));
  };

  const changeSortHandler = (title: string, sort: 'up' | 'down' | 'none') => {
    setHeadersForSort(headersForSort.map(
      el => el.title === title ? { ...el, sort, isAvailableToSort: false } : { ...el, sort: 'none' }));
  };

  const changePageHandler = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    dispatch(setCurrentPageAction(newPage + 1));
  };

  const changeRowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(setCurrentPageCountAction(+event.target.value));

  const deletePackHandler = (packId: string) => dispatch(deletePack(packId));

  const changePackNameHandler = (packId: string, newPackName: string) => dispatch(updatePack(packId, newPackName));

  return (
    <div className={style.packsTable}>
      <TableContainer component={Paper}>
        {packs.length
          ? <Table aria-label="simple table">
            <TableHead className={style.tableHeader}>
              <TableRow>
                {headersForSort.map((el, index) => <SortTableCell
                  key={index}
                  el={el}
                  showIsAvailableToSort={showIsAvailableToSortHandler}
                  changeSort={changeSortHandler} />)}
                <TableCell className={style.sortTableCell} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packs.map(pack => (
                <PackItem
                  key={pack._id}
                  pack={pack}
                  userId={userId}
                  deletePackHandler={deletePackHandler}
                  changePackNameHandler={changePackNameHandler} />))}
            </TableBody>
          </Table>
          : <h3>Packs not found</h3>}
      </TableContainer>
      <TablePagination
        component="div"
        count={pageCount}
        page={page}
        onPageChange={changePageHandler}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={changeRowsPerPageHandler}
        rowsPerPageOptions={[5, 10, 15, 20]} />
    </div>
  );
};

type PacksTablePropsType = {
  packs: PackType[]
  userId: string
  rowsPerPage: number
  pageCount: number
}


