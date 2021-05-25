import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setImageDetails } from '../Actions/ImageDetailsActions';
import { changePannelDetails } from '../Actions/PannelDetailsAction';
import Timeline from './DateTime/Timeline';
import AllChannelsTable from './FullDayGrid/AllChannels';
import HandleRequests from './HandleRequests';
import { SemipolarLoading } from 'react-loadingg';

function GalleryApp() {

    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);
    // const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const loadingReducer = useSelector(state => state.loadingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const pannelId = pannelDetailsReducer.pannelId;
        const channels = pannelDetailsReducer.channels;
        const newImageDetailsState = {...imageDetailsReducer};
        if(pannelId === ""){
            return;
        }

        // Making pannelDetails Json
        if(!newImageDetailsState[pannelId]){
            newImageDetailsState[pannelId] = {};
        }
        if(!newImageDetailsState[pannelId].requests){
            newImageDetailsState[pannelId].requests = {};
        }
        for(var channel of channels){
            if(!newImageDetailsState[pannelId][channel.channelId]){
                newImageDetailsState[pannelId][channel.channelId] = {};
            }
        }

        dispatch(setImageDetails(newImageDetailsState));
        dispatch({type: "REMOVE_LOADING"})
    }, [pannelDetailsReducer.pannelId])
    

    const addNewImages = (newData) => {
        var newImageDetailsState = {...imageDetailsReducer};
        try {
            var time;
            for(let detail of newData){
                time = (detail.datetime_local).substring(0, 10) + "-" + (detail.datetime_local).substring(11, 13);
                if(!newImageDetailsState[detail.panel_no][detail.channel_no][time]){
                    newImageDetailsState[detail.panel_no][detail.channel_no][time] = [{
                        time: detail.datetime_local,
                        // url: detail.get_object,
                        url: detail.get_presignedUrl
                    }];
                }
                else{
                    // console.log("helllllllllooooo", detail.panel_no, detail.channel_no, time);
                    newImageDetailsState[detail.panel_no][detail.channel_no][time].push({
                        time: detail.datetime_local,
                        // url: detail.get_object,
                        url: detail.get_presignedUrl
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


    return loadingReducer || pannelDetailsReducer.pannelId === "" ? <SemipolarLoading size="large" color="blue" /> : (
        <div className="gallery-app">
            <Timeline />
            <AllChannelsTable />
            
            <HandleRequests addNewImages={addNewImages} />
        </div>
    )
}

export default GalleryApp

