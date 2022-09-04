import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import { sortPacksByCardsCountAction } from '../bll-dal/packs-reducer';

type x = {
  tempValues: any, setTempValues: any
}

export const SliderFilter = ({setTempValues, tempValues}:x) => {

  const dispatch = useAppDispatch();

  const filterByCardsCount = useAppSelector(state => state.packs.filterValues.filterByCardsCount);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);



  useEffect(() => {
    setTempValues({ min: minCardsCount, max: maxCardsCount });
    // @ts-ignore
    if (filterByCardsCount.min < tempValues.max || filterByCardsCount.max > tempValues.min) {
      dispatch(sortPacksByCardsCountAction({ min: undefined, max: undefined }));
    }
  }, [minCardsCount, maxCardsCount]);

  useEffect(() => {

  }, []);

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setTempValues({ ...tempValues, min: Math.min(newValue[0], filterByCardsCount.max || maxCardsCount) });
    } else {
      setTempValues({ ...tempValues, max: Math.max(newValue[1], filterByCardsCount.min || minCardsCount) });
    }
  };

  return (
    <Box sx={{ width: 300, display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ width: '30px', textAlign: 'center' }}>{tempValues.min}</div>
      <Slider
        style={{ width: '60%' }}
        getAriaLabel={() => 'Minimum distance'}
        value={[tempValues.max, tempValues.min]}
        onChange={handleChange}
        onChangeCommitted={() => {dispatch(sortPacksByCardsCountAction(tempValues));}}
        valueLabelDisplay="auto"
        disableSwap
        max={maxCardsCount}
        min={minCardsCount} />
      <div style={{ width: '30px', textAlign: 'center' }}>{tempValues.max}</div>
    </Box>
  );
};
