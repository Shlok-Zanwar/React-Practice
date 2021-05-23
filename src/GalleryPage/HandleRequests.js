import axios from 'axios'
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setImageDetails } from '../Actions/ImageDetailsActions';
import { changePannelDetails } from '../Actions/PannelDetailsAction';

function HandleRequests({addNewImages}) {
    const dispatch = useDispatch();
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);
    const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    

    const getTimeForRequest = () => {
        if(!imageDetailsReducer[pannelDetailsReducer.pannelId]){
            return false;
        }

        var startTime = (dateTimeReducer.selectedTime).substring(0, 10) + "T" + (dateTimeReducer.selectedTime).substring(11, 13)  + ":00:00+05:30";
        var endTime = moment(startTime).add(24, 'hours').format();
        startTime = moment(startTime).subtract(6, 'hours').format();
        var requestsToMake = [];
        var keysToAdd = [];
        var startTime_itr = startTime ;

        while(startTime_itr !== endTime){
            var myTime = (startTime_itr).substring(0, 10) + "-" + (startTime_itr).substring(11, 13);
            if(!imageDetailsReducer[pannelDetailsReducer.pannelId].requests[myTime]){
                keysToAdd.push(myTime);
                startTime_itr = moment(startTime_itr).add(1, 'hours').format();
            }
            else{
                if(startTime !== startTime_itr){
                    requestsToMake.push({
                        start: startTime,
                        end: startTime_itr
                    });
                }
                startTime_itr = moment(startTime_itr).add(1, 'hours').format();
                startTime = startTime_itr;
            }
        }
        if(startTime !== startTime_itr){
            requestsToMake.push({
                start: startTime,
                end: startTime_itr
            });
        }

        return {requestsToMake: requestsToMake, keysToAdd: keysToAdd};
    }

    const addKeys = (keysToAdd) => {
        var newImageDetailsState = {...imageDetailsReducer};
        var pannelId = pannelDetailsReducer.pannelId;
        for(let key of keysToAdd){
            newImageDetailsState[pannelId].requests[key] = true;
        }
        dispatch(setImageDetails(newImageDetailsState));
    }

    useEffect(() => {
        var data = getTimeForRequest();
        if(!data){
            return;
        }
        var keysToAdd = data.keysToAdd;
        console.log("new Requests", data.requestsToMake);
        if((data.requestsToMake).length > 0){
            var url;
            url="www......../ ?pannel=" + pannelDetailsReducer.pannelId + "requests=" + data.requestsToMake;
            url = "https://shlok-m-server.herokuapp.com/blogs/toxicbot"
            console.log("url", data.requestsToMake);
            axios.get(url)
                .then(res => {
                    console.log(res.data);
                    // addNewImages(res.data.data);
                    addKeys(keysToAdd);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [dateTimeReducer])

    const handleClick = e => {
        // var requestsToMake = getTimeForRequest();
        console.log(imageDetailsReducer);
    }

    return (<div onClick={handleClick}>Click</div>)
}

export default HandleRequests
