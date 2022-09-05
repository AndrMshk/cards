import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './basicModal.module.scss';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const BasicModal: React.FC<ModalPropsType> = React.memo(
  ({
    operationTitle,
    buttonName,
    handleOperation,
    handleCloseOperation,
    isOpenModal,
    setIsOpenModal,
    children,
    isForDelete = false,
  }) => {

    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: `2px solid ${isForDelete ? '#d32f2f' : '#1976d2'}`,
      borderRadius: '8px',
      boxShadow: 24,
      p: 4,
    };

    const handleClose = () => {
      handleCloseOperation && handleCloseOperation();
      setIsOpenModal(false);
    };

    const onClickHandler = () => {
      handleOperation();
      setIsOpenModal(false);
    };

    return (
      <Modal
        open={isOpenModal}
        onClose={handleClose}>
        <Box sx={style}>
          <div className={styles.title}>
            {operationTitle}
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </div>
          {children}
          <div className={styles.buttonsBlock}>
            <Button onClick={handleClose} color="primary" variant="contained">Cancel</Button>
            <Button onClick={onClickHandler} color={isForDelete ? 'error' : 'primary'}
                    variant="contained">{buttonName}</Button>
          </div>
        </Box>
      </Modal>
    );
  },
);

type ModalPropsType = {
  operationTitle: string
  buttonName: string
  handleOperation: () => void
  handleCloseOperation?: () => void
  isOpenModal: boolean
  children: ReactNode
  setIsOpenModal: (value: boolean) => void
  isForDelete?: boolean
}
