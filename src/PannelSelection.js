import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { changePannelDetails } from './Actions/PannelDetailsAction';

function PannelSelection() {
    // const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    const [pannelId, setPannelId] = useState("");
    const dispatch = useDispatch();
    const [disableButton, setDisableButton] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = e => {
        setPannelId(e.target.value);
    }

    const handleSubmit = async e => {
        dispatch({type: "SET_LOADING"})
        var url = "/get/distinctChannel";
        setDisableButton(true);
        await axios.get(url, {
            params: {
                panel_no: pannelId
            }
        })
        .then(res => {
            if((res.data).length === 0){
                enqueueSnackbar("Invalid Panel Number", {
                    variant: 'error',
                });
                dispatch(changePannelDetails({pannelId: "", channels: []}));
                return;
            }
            var channels = (res.data).map(channel => {
                return {
                    channelId: channel.channel_no,
                    channelName: channel.channel_name,
                    show: true
                }
            })
            dispatch(changePannelDetails({pannelId: pannelId, channels: channels}))
        })
        .catch(err => {
            console.log(err);
            enqueueSnackbar(err.message, {
                variant: 'error',
            })
            dispatch(changePannelDetails({pannelId: "", channels: []}));
            dispatch({type: "REMOVE_LOADING"});
            
        })
        setPannelId("");
        setDisableButton(false);
    }

    return (
        <div>
            <input
                type="text"
                className="pannel-input"
                value={pannelId}
                onChange={handleChange}
                placeholder="Panel Id"
            />
            <button className="pannel-submit" disabled={disableButton} onClick={handleSubmit}>Change Pannel</button>
        </div>
    )
}

export default PannelSelection
