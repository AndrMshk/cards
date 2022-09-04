import React, { useState } from 'react';
import style from '../packs.module.scss';
import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import { resetAllFiltersAction, showMyPacksAction } from '../bll-dal/packs-reducer';
import { SliderFilter } from './Slider';
import { SearchComponent } from './SearchComponent';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const ControlPanel = () => {

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.app.isLoading);
  const { packName, isOwn } = useAppSelector(state => state.packs.filterValues);
  const { minCardsCount, maxCardsCount } = useAppSelector(state => state.packs);

  const [tempValues, setTempValues] = useState({ min: minCardsCount, max: maxCardsCount });
  const [searchName, setSearchName] = useState(packName || '');

  const toggleOwnAllPackHandler = (isOwn: boolean) => {dispatch(showMyPacksAction(isOwn));};

  return (
    <div className={style.controlPanel}>
      <SearchComponent name={searchName} setName={setSearchName} />
      <div className={style.isOnwToggle}>
        <h5>Show packs cards</h5>
        <ButtonGroup disableElevation className={style.buttonGroup} disabled={isLoading}>
          <Button
            onClick={() => toggleOwnAllPackHandler(false)}
            variant={!isOwn ? 'contained' : 'text'}
          >All</Button>
          <Button
            onClick={() => toggleOwnAllPackHandler(true)}
            variant={isOwn ? 'contained' : 'text'}
          >My</Button>
        </ButtonGroup>
      </div>
      <div className={style.cardsCount}>
        <h5>Number of cards</h5>
        <SliderFilter tempValues={tempValues} setTempValues={setTempValues} />
      </div>
      <div className={style.reset}>
        <HighlightOffIcon
          onClick={() => {
            setSearchName('');
            setTempValues({ min: minCardsCount, max: maxCardsCount });
            dispatch(resetAllFiltersAction());
          }} />
      </div>
    </div>
  );
};

