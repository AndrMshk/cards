import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import { sortPacksByCardsCountAction } from '../bll-dal/packs-reducer';

function valuetext(value: number) {
  return `${value}`;
}

const minDistance = 10;

export const SliderFilter: React.FC = () => {

  const dispatch = useAppDispatch();

  const filterByCardsCount = useAppSelector(state => state.packs.filterValues.filterByCardsCount);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      dispatch(sortPacksByCardsCountAction(
        {
          min: Math.min(newValue[0], filterByCardsCount.max || maxCardsCount - minDistance),
          max: filterByCardsCount.max,
        }));
    } else {
      dispatch(sortPacksByCardsCountAction(
        {
          min: filterByCardsCount.min,
          max: Math.max(newValue[1], filterByCardsCount.min || minCardsCount + minDistance),
        }));
    }
  };

  return (
    <Box sx={{ width: 300, display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ width: '30px', textAlign: 'center' }}>{filterByCardsCount.min || 0}</div>
      <Slider
        style={{ width: '60%' }}
        getAriaLabel={() => 'Minimum distance'}
        value={[filterByCardsCount.min || minCardsCount, filterByCardsCount.max || maxCardsCount]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        max={110}
        min={0}
      />
      <div style={{ width: '30px', textAlign: 'center' }}>{filterByCardsCount.max || 110}</div>
    </Box>
  );
};


