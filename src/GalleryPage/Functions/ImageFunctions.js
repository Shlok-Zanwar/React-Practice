import { useDispatch, useSelector } from "react-redux";

// export function GetImages () {
    
// }

import React from 'react'

function ImageFunctions() {
    const dispatch = useDispatch();
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);
    const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);

    const newDetails = require("./Data.json");

    var i = 0;
    for(let detail of newDetails){
        i ++;
    }


    console.log(newDetails);
    return (
        <></>
    );
}

export default ImageFunctions


import axios from 'axios'
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setImageDetails } from '../Actions/ImageDetailsActions';

function HandleRequests() {
    const dispatch = useDispatch();
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);
    const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    const wait = (delay, ...args) => new Promise(resolve => setTimeout(resolve, delay, ...args));

    Array.prototype.insert = function ( index, item ) {
        this.splice( index, 0, item );
    };

    const addRequest = (requestsDone, requestToAdd) => {
        var i;
        for(i = 0; i < requestsDone.length; i ++){
            if(moment(requestToAdd.end).isSameOrBefore(requestsDone[i].start)){
                requestsDone.insert(i, requestToAdd);
                return requestsDone;
            }
        }
        requestsDone.insert(requestsDone.length, requestToAdd);
        return requestsDone;
    }

    const addNewRequestsToState = (requestsToMake) => {
        if(requestsToMake.length === 0){
            return;
        }

        var requestsDone = imageDetailsReducer[pannelDetailsReducer.pannelId].requests;
        var i;
        for(i = 0; i < requestsToMake.length; i ++){
            requestsDone = addRequest(requestsDone, requestsToMake[i]);
        }

        var newImageDetailsState = {...imageDetailsReducer};
        newImageDetailsState[pannelDetailsReducer.pannelId].requests = requestsDone;
        dispatch(setImageDetails(newImageDetailsState));
    }

    const getTimeForRequest = () => {
        if(!imageDetailsReducer[pannelDetailsReducer.pannelId]){
            return [];
        }

        var startTime = (dateTimeReducer.selectedTime).substring(0, 10) + "T" + (dateTimeReducer.selectedTime).substring(11, 13)  + ":00:00+05:30";
        var endTime = moment(startTime).add(24, 'hours').format();
        startTime = moment(startTime).subtract(6, 'hours').format();
        var requestsDone = imageDetailsReducer[pannelDetailsReducer.pannelId].requests;
        var requestsToMake = [];

        var i;

        for(i = 0; i < requestsDone.length; i ++){
            if( moment(startTime).isBetween(requestsDone[i].start, requestsDone[i].end, undefined, '[]') ){
                startTime = requestsDone[i].end;

                if(moment(endTime).isBetween(requestsDone[i].start, requestsDone[i].end, undefined, '[]')){
                    return requestsToMake;
                }

                if(i < requestsDone.length - 1){
                    console.log("here");
                    requestsToMake.push({
                        start: startTime,
                        end: moment.min([ moment(requestsDone[i+1].start), moment(endTime) ]).format()
                    });

                    if(moment(endTime).isBetween(requestsDone[i+1].start, requestsDone[i+1].end, undefined, '[]')){
                        startTime = requestsDone[i+1].end;
                        continue;
                    }
                    else{
                        return requestsToMake;;
                    }

                }
                else{
                    requestsToMake.push({
                        start: startTime,
                        end: endTime
                    })
                    return requestsToMake;;
                }

            }

            if(moment(endTime).isBetween(requestsDone[i].start, requestsDone[i].end, undefined, '[]')){
                requestsToMake.push({
                    start: startTime,
                    end: requestsDone[i].start
                })
                return requestsToMake;;
            }
        }

        requestsToMake.push({
            start: startTime,
            end: endTime
        })

        // console.log(startTime);
        // console.log(endTime);
        // console.log(moment("2021-05-22T00:00:00+05:30").isBetween(startTime, endTime, undefined, '[)'));
        // console.log("hii", moment.min([moment(startTime), undefined]).format() );
        // console.log(moment(startTime).isSameOrAfter(requestsDone[i].start))

        return requestsToMake;
    }


    useEffect(async() => {
        // await wait(2000);
        // console.log("hiii")
        
        var requestsToMake = getTimeForRequest();
        addNewRequestsToState(requestsToMake);
        console.log("new Requests", requestsToMake);

        var url;
        for(let request of requestsToMake){
            url="www......../ ?pannel=" + pannelDetailsReducer.pannelId + "start=" + request.start + "end=" + request.end;
            console.log(url);
            // axios.get();
        }
        
    }, [dateTimeReducer])

    const handleClick = e => {
        // var requestsToMake = getTimeForRequest();
        console.log(imageDetailsReducer);
    }

    return (<div onClick={handleClick}>Click</div>)
}

export default HandleRequests

