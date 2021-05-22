import React, { useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function OptionsComponent({channelDetails, setChannelDetails}) {
    
    const handleChange = e => {
        console.log(e.target.id)
        var newDetails = channelDetails.map(channel => {
            console.log(channel.channelId)
            if(channel.channelId == e.target.id){
                console.log(channel.show)
                channel.show = !channel.show;
            }
            return channel;
        });
        // console.log(newDetails);
        setChannelDetails(newDetails);
    }

    return channelDetails.map(channel => (
        <FormControlLabel
            control={<Checkbox checked={channel.show} onChange={handleChange} name="gilad" id={channel.channelId} />}
            label={channel.channelName}
        />
    ))
    
}

export default OptionsComponent
