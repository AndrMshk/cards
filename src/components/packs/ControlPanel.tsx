import React, { FC } from 'react';
import style from './packs.module.scss';
import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import { useAppDispatch } from '../../app/store';
import { sortPacksByNameAction } from './packs-reducer';
import { SliderFilter } from './Slider';

type ControlsPanelPropsType = {
  packName: string | undefined
  isOwn: boolean
  toggleOwnAllPackHandler: (isOwn: boolean) => void
}

export const ControlPanel: FC<ControlsPanelPropsType> = ({ packName, isOwn, toggleOwnAllPackHandler }) => {

  const dispatch = useAppDispatch();

  return (
    <div className={style.controlPanel}>
      <TextField
        className={style.search}
        id="search"
        label="Search by name"
        variant="outlined"
        value={packName}
        onChange={(e) => dispatch(sortPacksByNameAction(e.target.value))}
      />
      <div className={style.isOnwToggle}>
        <h5>Show packs cards</h5>
        <ButtonGroup disableElevation className={style.buttonGroup}>
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
        <SliderFilter />
      </div>
    </div>
  );
};

