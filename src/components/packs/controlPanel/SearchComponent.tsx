import * as React from 'react';
import { FC } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import { sortPacksByNameAction } from '../bll-dal/packs-reducer';

export const SearchComponent: FC<SearchComponentPropsType> = ({ name, setName }) => {

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.app.isLoading);

  return (
    <Paper component="form"
           sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <InputBase
        disabled={isLoading}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search packs"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={name}
        onChange={(e) => {setName(e.target.value);}} />
      <IconButton
        onClick={() => {dispatch(sortPacksByNameAction(name));}}
        type="button" sx={{ p: '10px', color: '#1976d2' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};

type SearchComponentPropsType = {
  name: string
  setName: (name: string) => void
}
