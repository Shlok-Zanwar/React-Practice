import React, { useEffect, useState } from 'react'
import RenderRowWise from './RenderRow';
import moment from 'moment';
import { useSelector } from 'react-redux';
import ChannelOptions from './ChannelOptions';

function AllChannelsTable() {
    const pannelDetailsReducer = useSelector(state => state.pannelDetailsReducer);
    const imageDetailsReducer = useSelector(state => state.imageDetailsReducer);
    const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const [keysToRender, setKeysToRender] = useState([]);
    const hoursToShow = 8;


    const createNewKeys = () => {
        var temp = dateTimeReducer.selectedTime;
        var startTime = (dateTimeReducer.selectedTime).substring(0, 10) + "T" + temp[11] + temp[12] + ":00:00+05:30" ;

        var newKeys = [(dateTimeReducer.selectedTime).substring(0, 10) + "-" + temp[11] + temp[12]];        // intializing a list with one index [abc, ...]
        var i, timeLabel, fullDate, myHour, key;

        for(i = 1; i < hoursToShow; i ++){
            timeLabel = moment(startTime).add(i, 'hours');
			fullDate = timeLabel.format().split("T")[0];                 // returns YYYY-mm-dd
			myHour = timeLabel.hour() <= 9 ? "-0" : "-";
			myHour += timeLabel.hour();
			key = fullDate + myHour;

            newKeys.push(key);
        }

        // console.log("StartTime, newKeys", startTime, newKeys);
        setKeysToRender(newKeys);
    }


    useEffect(() => {
        createNewKeys();
    }, [dateTimeReducer.selectedTime])

    useEffect(() => {
        createNewKeys();
    }, [imageDetailsReducer])


    const keyToTime = (key) => {
        var arr = key.split("-");													// Convert to ["YYYY", "MM", "DD", "HH"]
        var date = arr[2] + " " + moment.monthsShort()[parseInt(arr[1]) - 1];	    // Eg => 20 May 
        var minutes = "00";
        var time = moment(arr[3] + ":" + minutes, ["HH:mm"]).format("hh:mm A");     // Eg => 08:15 AM
        // date += " " + time;	// Eg => 20 May 08:15 AM
        return [date, time];
    }

    const renderTimeHeadings = keysToRender.map(key => {
        var temp = keyToTime(key)
        return (
            <div className="channel-cell">
                {temp[0]} <br /> {temp[1]} 
            </div>
        )
    })


    const mapChannnels = pannelDetailsReducer.channels.map(channel => {
        if(channel.show){
            return (
                <div className="channel-row">
                    <div className="channel-cell channel-name-cell">{channel.channelName}</div>
                    <RenderRowWise pannelId={pannelDetailsReducer.pannelId} channelId={channel.channelId} keysToRender={keysToRender} />
                </div>
            )
        }
        else{
            return (<></>)
        }
    })

    return (
        <div className="channels-outer-div">
            <div className="channels-table-div">
                <div className="channel-time-row">
                    <div className="channel-cell channel-name-cell" style={{border: '2px solid red'}} >
                        <ChannelOptions />
                    </div>
                    {renderTimeHeadings}
                </div>
                {mapChannnels}
            </div>
        </div>

    )
        
    
}

export default AllChannelsTable

    // const [channels, setChannels] = useState(["CH1", "CH4", "CH3", "CH2"]);
    // const details = {
    //     "CH1" : {
    //         "2021-05-20-21": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_cZFl6Xrgbj6dx3S6Pz_n9t4Qadt_tYiQ6A&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG9rF-yIQKtr-Ckx--uka8vmfON6mteje1Kw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyU3wgD8quWg172UZj_bAwES2mKgBkY3eYw&usqp=CAU"]
    //     },
    //     "CH2" : {

    //     },
    //     "CH3" : {
    //         "2021-05-20-23": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_cZFl6Xrgbj6dx3S6Pz_n9t4Qadt_tYiQ6A&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG9rF-yIQKtr-Ckx--uka8vmfON6mteje1Kw&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyU3wgD8quWg172UZj_bAwES2mKgBkY3eYw&usqp=CAU"]
    //     },
    //     "CH4" : {

    //     }
    // }


//     <div className="channel-row">
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
// </div>
// <div className="channel-row">
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
// </div>
// <div className="channel-row">
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
// </div>
// <div className="channel-row">
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
//     <div className="channel-column"><div className="temp123">Shlok</div></div>
// </div>
// </div>
// </div>