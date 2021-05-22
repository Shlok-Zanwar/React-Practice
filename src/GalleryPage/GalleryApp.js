import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setImageDetails } from '../Actions/ImageDetailsActions';
import Timeline from './DateTime/Timeline';
import AllChannelsTable from './FullDayGrid/AllChannels';
import HandleRequests from './HandleRequests';

function GalleryApp() {

    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);
    // const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const pannelId = pannelDetailsReducer.pannelId;
        const channels = pannelDetailsReducer.channels;
        const newImageDetailsState = {...imageDetailsReducer};

        // Making pannelDetails Json
        if(!newImageDetailsState[pannelId]){
            newImageDetailsState[pannelId] = {};
        }
        if(!newImageDetailsState[pannelId].requests){
            newImageDetailsState[pannelId].requests = [];
        }
        for(var channel of channels){
            if(!newImageDetailsState[pannelId][channel.channelId]){
                newImageDetailsState[pannelId][channel.channelId] = {};
            }
        }

        dispatch(setImageDetails(newImageDetailsState));
    }, [pannelDetailsReducer])
    

    const addNewImages = (newData) => {
        const newImageDetailsState = {...imageDetailsReducer};
        try {
            var i = 0, time;
            for(let detail of newData){
                time = (detail.datetime_local).substring(0, 10) + "-" + (detail.datetime_local).substring(11, 13);
                if(!newImageDetailsState[detail.panel_no][detail.channel_no][time]){
                    newImageDetailsState[detail.panel_no][detail.channel_no][time] = [{
                        time: detail.datetime_local,
                        url: detail.get_object
                    }];
                }
                else{
                    // console.log("helllllllllooooo", detail.panel_no, detail.channel_no, time);
                    newImageDetailsState[detail.panel_no][detail.channel_no][time].push({
                        time: detail.datetime_local,
                        url: detail.get_object
                    });
                }
            }
            // console.log("i", newImageDetailsState);
            dispatch(setImageDetails(newImageDetailsState))
        } 
        catch (error) {
            console.log(error)
        }
    }


    const temp = e => {
        console.log("Temp");
        const newDetails = require("./Functions/Data.json");
        console.log(newDetails);

        addNewImages(newDetails.data)

    }

    return (
        <div className="gallery-app">
            <button onClick={temp} >Click Me</button>
            <AllChannelsTable />
            <Timeline />
            <HandleRequests />
        </div>
    )
}

export default GalleryApp

