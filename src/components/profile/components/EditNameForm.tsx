import { Button, FormControl, Input, InputAdornment } from '@mui/material';
import * as React from 'react';

export const EditNameForm: React.FC<EditNameFormPropsType> = (
  { handleSubmit, handleChange, name, setEditMode, newName, error },
) => {

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === 'Escape') {
      setEditMode(false);
      name = newName;
    }
  };

  return (
    <FormControl>
      <form onSubmit={handleSubmit} style={{ height: '75px' }}>
        <Input
          autoFocus
          autoComplete={'off'}
          onKeyDown={onKeyDownHandler}
          name="name"
          onChange={handleChange}
          value={newName}
          onBlur={() => handleSubmit()}
          error={!!error}
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                style={{ height: '24px', width: '54px' }}
                type={'submit'}
                disabled={!!error}
              >SAVE
              </Button>
            </InputAdornment>
          }
        />
      </form>
    </FormControl>
  );
};

type EditNameFormPropsType = {
  handleSubmit: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  name: string
  newName: string
  setEditMode: (mode: boolean) => void
  error: string | undefined
}
