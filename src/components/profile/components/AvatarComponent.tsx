import React from 'react';
import { IconButton } from '@mui/material';
// import { input } from '@testing-library/user-event/dist/types/utils';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import testAva from '../../../assets/avatar.png';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

type AvatarPropsType = {
  avatar: string | undefined
}

export const AvatarComponent: React.FC<AvatarPropsType> = ({ avatar }) => {
  return (
    <Badge
      style={{ width: '96px', height: '96px' }}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <IconButton
          style={{
            background: '#808080',
            border: '1px solid #FFFFFF',
            color: '#ffffff',
            width: '32px',
            height: '32px',
          }}
          aria-label="upload picture"
          component="label">
          <input hidden accept="image/*" type="file" />
          <CameraAltOutlinedIcon style={{ height: '16px' }} />
        </IconButton>
      }>
      <Avatar style={{ width: '100%', height: '100%' }}
              alt="ava"
              src={avatar ? avatar : testAva}
      />
    </Badge>
  );
};
