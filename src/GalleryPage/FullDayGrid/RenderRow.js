import React from 'react'
import { useSelector } from 'react-redux';
import RenderIndividual from './RenderIndividual';

function RenderRow({pannelId, channelId, keysToRender}) {
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);

    const keyDetails = (key) => {
        if(!imageDetailsReducer[pannelId][channelId][key]){
            return [];
        }
        else{
            // console.log(pannelId, channelId, imageDetailsReducer[pannelId][channelId][key])
            return imageDetailsReducer[pannelId][channelId][key];
        }
    }

    return keysToRender.map(key => (
        <div className="channel-cell">
            <RenderIndividual arr={keyDetails(key)} />
        </div>
    ))
}

export default RenderRow
