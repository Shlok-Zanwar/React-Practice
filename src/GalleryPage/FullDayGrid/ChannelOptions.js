import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { changeChannelDetails } from '../../Actions/PannelDetailsAction';


export default function ChannelOptions() {
    const [open, setOpen] = React.useState(false);
    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    const dispatch = useDispatch();
    const [channelDetails, setChannelDetails] = useState(pannelDetailsReducer.channels);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSaveAndClose = () => {
        dispatch(changeChannelDetails(channelDetails));
        setOpen(false);
    };

    const handleCheckBoxChange = e => {
        var newDetails = channelDetails.map(channel => {
            if(channel.channelId === e.target.id){ 
                channel.show = !channel.show;
            }
            return channel;
        });
        setChannelDetails(newDetails);
    }

    return (
        <div>
        <button variant="outlined" color="primary" onClick={handleClickOpen}>
            Settings
        </button>
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Channels</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Check the channels you wnat to see.
            </DialogContentText>

            <FormGroup>
                {
                    channelDetails.map(channel => (
                        <FormControlLabel key={channel.channelId}
                            control={<Checkbox checked={channel.show} onChange={handleCheckBoxChange} name="gilad" id={channel.channelId} key={channel.channelId} />}
                            label={channel.channelName}
                        />
                    ))
                }
            </FormGroup>

            </DialogContent>
            <DialogActions>
            <Button onClick={handleSaveAndClose} color="primary" autoFocus>
                Save and Close
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}