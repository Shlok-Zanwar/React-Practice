import moment from 'moment';


const createState = () => {
    var timelineStart = moment(moment().format()).subtract(24, 'hours').format();
    var state = {
        timelineStart: timelineStart,
        selectedTime: timelineStart.substring(0, 10) + "-" + timelineStart.substring(11, 13) + "-00"
    }
    // console.log("Timeline State", state);
    return state;
}


const dateTimeReducer = (state = createState(), action) => {
    var newState;
    switch (action.type) {
        case 'CHANGE_TIMELINE_START':
            newState = {...state};
            newState.timelineStart = action.payload;
            return newState;
        
        case 'SET_SELECTED_TIME':
            newState = {...state};
            newState.selectedTime = action.payload;
            return newState;
        
        case 'TEMP':
            newState = {...state};
            newState.selectedDate= "shlok"
            // newState.timelineStart = action.payload;
            return newState;

        default:
            return state;
    }
}

export default dateTimeReducer;