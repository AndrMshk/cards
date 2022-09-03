import * as React from 'react';
import { FC, ReactElement } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type PositionedMenuPropsType = {
  items: { title: string, action: () => void }[]
  children: ReactElement
}

export const PositionedMenu: FC<PositionedMenuPropsType> = ({ items, children }) => {

  const [isOpen, setIsOpen] = React.useState<null | HTMLElement>(null);

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: '100%' }} onClick={e => {setIsOpen(e.currentTarget);}}>{children}</div>
      <Menu
        anchorEl={isOpen}
        open={!!isOpen}
        onClose={() => {setIsOpen(null);}}>
        {items.map((el, index) =>
          <MenuItem
            key={index}
            onClick={() => {
              el.action();
              setIsOpen(null);
            }}>{el.title}</MenuItem>)}
      </Menu>
    </div>
  );
};
