import axios from 'axios'
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function HandleRequests() {
    const dispatch = useDispatch();
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);
    const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);


    const getTimeForRequest = () => {
        var startTime = (dateTimeReducer.selectedTime).substring(0, 10) + "T" + (dateTimeReducer.selectedTime).substring(11, 13)  + ":00:00+05:30";
        var endTime = moment(startTime).subtract(24, 'hours').format();
        startTime = moment(startTime).subtract(6, 'hours').format();
        

        console.log(startTime)
        console.log(endTime)
    }


    useEffect(() => {
        // getTimeForRequest();
        // axios.get();
    }, [dateTimeReducer])

    const handleClick = e => {
        getTimeForRequest()
        console.log(dateTimeReducer);
    }

    return (<div onClick={handleClick}>Click</div>)
}

export default HandleRequests
