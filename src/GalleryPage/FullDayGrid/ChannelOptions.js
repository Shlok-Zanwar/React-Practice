import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import OptionsComponent from './OptionsComponent';
import FormGroup from '@material-ui/core/FormGroup';

export default function ChannelOptions() {
    const [open, setOpen] = React.useState(false);
    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    const dispatch = useDispatch();
    const [channelDetails, setChannelDetails] = useState(pannelDetailsReducer.channels);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log("hi")
        setOpen(false);
    };

    return (
        <div>
        <button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open alert dialog
        </button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Channels</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Check the channels you wnat to see.
            </DialogContentText>

            <FormGroup>
                <OptionsComponent channelDetails={channelDetails} setChannelDetails={setChannelDetails} />
            </FormGroup>

            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Save and Close
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}