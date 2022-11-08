import React from 'react';
import { IconButton } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { useAppDispatch, useAppSelector } from '../../../app/bll-dal/store';
import { uploadHandler } from '../../../utils/conventorToBase64';
import { setNewUserAvatar } from '../bll-dal/profile-async-actions';
import { setAppErrorAction } from '../../../app/bll-dal/app-reducer';

export const AvatarComponent = () => {

  const dispatch = useAppDispatch();

  const avatar = useAppSelector(state => state.profile.avatar);

  return (
    <Badge
      style={{ width: '96px', height: '96px', marginTop: '20px' }}
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
          <input
            hidden accept="image/*" type="file"
            onChange={(e) => uploadHandler(e, dispatch, setNewUserAvatar)} />
          <CameraAltOutlinedIcon style={{ height: '16px' }} />
        </IconButton>}>
      <Avatar
        style={{ width: '100%', height: '100%' }}
        alt="ava"
        src={avatar && avatar}
        onError={() => {dispatch(setAppErrorAction('Invalid photo'));}} />
    </Badge>
  );
};

