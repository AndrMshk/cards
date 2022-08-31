import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const EditInput: React.FC<PackEditInputPropsType> = ({value, callBack, myId, userId}) => {

    const [open, setOpen] = React.useState(false);
    const [newValue, setNewValue] = useState(value);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmNewValue = () => {
        if (newValue !== value && newValue !== '' && newValue.length <= 30) {
            callBack(newValue);
        } else {
            setNewValue(value);
        }
        setOpen(false);
    };

    const onChangeValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewValue(e.target.value);
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                disabled={myId !== userId}
                color="secondary"
                size="small"
                startIcon={<BorderColorIcon/>}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter new name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newValue}
                        onChange={(e) => onChangeValueHandler(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={confirmNewValue}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

type PackEditInputPropsType = {
    value: string
    callBack: (value: string) => void
    userId?: string
    myId?: string
}