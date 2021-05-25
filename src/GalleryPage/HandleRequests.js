import axios from 'axios'
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setImageDetails } from '../Actions/ImageDetailsActions';
import { changePannelDetails } from '../Actions/PannelDetailsAction';

function HandleRequests({addNewImages}) {
    const dispatch = useDispatch();
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);
    const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    const { enqueueSnackbar } = useSnackbar();
    

    const getTimeForRequest = () => {
        if(!imageDetailsReducer[pannelDetailsReducer.pannelId]){
            return false;
        }

        // check (selectedTime or timelineStart)
        var startTime = (dateTimeReducer.selectedTime).substring(0, 10) + "T" + (dateTimeReducer.selectedTime).substring(11, 13)  + ":00:00+05:30";
        var endTime = moment(startTime).add(24, 'hours').format();                  // 24 => from currTime to next 24 hrs (change to any num)
        startTime = moment(startTime).subtract(6, 'hours').format();                // 6 => from 6 hrs back to currTime
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

    const [firstRender, setFirstRender] = useState(1);
    useEffect(() => {
        // This if is to prevent multiple requests at first time
        if(firstRender === 1){
            setFirstRender(2);
            return;
        }
        var data = getTimeForRequest();
        if(!data){      // Error handling
            return;
        }
        var keysToAdd = data.keysToAdd;
        // console.log("New Requests", data.requestsToMake);
        if((data.requestsToMake).length > 0){
            var url;
            url = "http://192.168.2.53:8081/metadata";
            // console.log("url", );
            axios.get(url, {
                params: {
                    panel_no: pannelDetailsReducer.pannelId,
                    from_dt: data.requestsToMake[0].start,
                    to_dt: data.requestsToMake[0].end
                }
              })
                .then(res => {
                    addNewImages(res.data.data);
                    addKeys(keysToAdd);
                })
                .catch(err => {
                    console.log(err);
                    enqueueSnackbar(err, {
                        variant: 'error',
                    })
                })
        }
    }, [dateTimeReducer])


    return <></>
}

export default HandleRequests
