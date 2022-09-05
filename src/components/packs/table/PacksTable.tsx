import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import TablePagination from '@mui/material/TablePagination';
import { PackItem } from './PackItem';
import { SortTableCell } from './SortTableSell';
import { setCurrentPageAction, setCurrentPageCountAction } from '../bll-dal/packs-reducer';
import { deletePack, setPacks, updatePack } from '../bll-dal/packs-async-actions';
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
    title: 'Cards',
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

export const PacksTable = () => {

  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [headersForSort, setHeadersForSort] = useState(tableHeaderTitles);

  const { cardPacks, page, cardPacksTotalCount, pageCount } = useAppSelector(state => state.packs);
  const { sortOrder, filterByCardsCount, packName, isOwn } = useAppSelector(state => state.packs.filterValues);
  const userId = useAppSelector(state => state.profile._id);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    isLoggedIn && dispatch(setPacks(
      {
        page,
        pageCount,
        min: filterByCardsCount.min,
        max: filterByCardsCount.max,
        user_id: isOwn ? userId : undefined,
        packName: packName || undefined,
        sortPacks: sortOrder || undefined,
      }));
  }, [
    page,
    pageCount,
    isOwn,
    filterByCardsCount,
    sortOrder,
    packName,
  ]);

  useEffect(() => {setHeadersForSort(headersForSort.map(el => ({ ...el, sort: 'none' })));}, [sortOrder]);

  const showIsAvailableToSortHandler = (title: string, is: boolean) => {
    setHeadersForSort(headersForSort.map(
      el => el.title === title ? { ...el, isAvailableToSort: is } : { ...el, isAvailableToSort: false }));
  };

  const changeSortHandler = (title: string, sort: 'up' | 'down' | 'none') => {
    setHeadersForSort(headersForSort.map(
      el => el.title === title ? { ...el, sort, isAvailableToSort: false } : { ...el, sort: 'none' }));
  };

  const changePageHandler = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
    dispatch(setCurrentPageAction(newPage + 1));
  };

  const changeRowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(setCurrentPageCountAction(+event.target.value));

  const deletePackHandler = (packId: string) => dispatch(deletePack(packId));

  const changePackNameHandler = (packId: string, newPackName: string) => dispatch(updatePack(packId, newPackName));

  return (
    <div className={style.packsTable}>
      <TableContainer component={Paper}>
        {cardPacks.length
          ? <Table aria-label="simple table">
            <TableHead className={style.tableHeader}>
              <TableRow>
                {headersForSort.map((el, index) =>
                  <SortTableCell
                    key={index}
                    el={el}
                    showIsAvailableToSort={showIsAvailableToSortHandler}
                    changeSort={changeSortHandler} />)}
                <TableCell className={style.sortTableCell} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardPacks.map(pack => (
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
        count={cardPacksTotalCount}
        page={currentPage}
        onPageChange={changePageHandler}
        rowsPerPage={pageCount}
        onRowsPerPageChange={changeRowsPerPageHandler}
        rowsPerPageOptions={[5, 10, 15, 20]} />
    </div>
  );
};

