import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PacksTable } from './table/PacksTable';
import { useAppDispatch, useAppSelector } from '../../app/store';
import useDebounce from '../../common/hooks/useDebounce';
import { showMyPacksAction } from './packs-reducer';
import { setPacks } from './packs-async-actions';
import { BackButtonComponent } from '../../common/backButtonComponent/BackButtonComponent';
import style from './packs.module.scss';
import { ControlPanel } from './ControlPanel';
import { Button } from '@mui/material';
import { AddNewPackModal } from './modals/AddNewPackModal';

export const Packs = () => {
  const dispatch = useAppDispatch();

  const { cardPacks, page, cardPacksTotalCount, pageCount } = useAppSelector(state => state.packs);
  const { sortOrder, filterByCardsCount, packName, isOwn } = useAppSelector(state => state.packs.filterValues);
  const userId = useAppSelector(state => state.profile._id);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const [isOpenAddPackModal, setIsOpenAddPackModal] = useState(false);

  const packNameDebounce = useDebounce(packName, 1000);
  const filterByCardsCountDebounce = useDebounce(filterByCardsCount, 1000);

  const toggleOwnAllPackHandler = (isOwn: boolean) => {
    dispatch(showMyPacksAction(isOwn));
  };

  useEffect(() => {
    dispatch(setPacks(
      {
        page,
        pageCount,
        min: filterByCardsCount.min,
        max: filterByCardsCount.max,
        user_id: isOwn ? userId : undefined,
        packName: !!packName ? packName : undefined,
        sortPacks: sortOrder || undefined,
      }));
  }, [
    page,
    pageCount,
    isOwn,
    filterByCardsCountDebounce,
    packNameDebounce,
    sortOrder,
  ]);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={style.main}>
      <BackButtonComponent />
      <div className={style.content}>
        <div className={style.headerBlock}>
          <h2>Pack list</h2>
          <Button
            onClick={() => setIsOpenAddPackModal(true)}
            variant="contained"
          >Add new pack</Button>
          <AddNewPackModal isOpenModal={isOpenAddPackModal} setIsOpenModal={setIsOpenAddPackModal} />
        </div>
        <ControlPanel packName={packName} isOwn={isOwn} toggleOwnAllPackHandler={toggleOwnAllPackHandler} />
          <PacksTable
            packs={cardPacks}
            userId={userId}
            rowsPerPage={pageCount}
            pageCount={cardPacksTotalCount}
          />
      </div>
    </div>
  );
};




