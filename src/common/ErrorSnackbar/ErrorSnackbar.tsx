import React from 'react';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from '../../app/store';
// import {setAppErrorAC} from "../../app/app-reducer";
import {useDispatch} from "react-redux";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
    open: boolean;
}

export const ErrorSnackbar = () => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useDispatch()

    const [state] = React.useState<State>({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const {vertical, horizontal} = state;


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      // dispatch(setAppErrorAC(null))};
    }

    return (
        <Snackbar open={error !== null}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{vertical, horizontal}}
                  key={vertical + horizontal}
        >
            <Alert onClose={handleClose}
                   severity="error"
                   sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
