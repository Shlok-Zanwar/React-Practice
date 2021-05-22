import moment from 'moment';
// import { useSelector } from 'react-redux';

// const state = useSelector(state => state.dateTimeReducer);

export const makeTimeMarks = (startTime, difference, frequency) => {
    let marks = [];
    // var i = 0;
    // for(i = 0; i < 24; i ++){
    //     var timeLabel = moment(state.timelineStart).add(i, 'hours');
    //     var label = timeLabel.year() + timeLabel.month() + timeLabel.date(); 

    //     let markTemplate = {
    //         value: i * difference,
    //         label:  'shlok'
    //     }
    // }


    for(var i = 0; i < 24; i){
        let abc = {
            value: i*difference,
            label: ""
        }

        let ans = ""
        if((startTime + i)%24 <= 9){
            ans += "0";
        }
        
        ans += (startTime + i)%24 ;
        abc.label = ans;
        marks.push(abc);

        i += frequency;
    }
    return marks;
}

