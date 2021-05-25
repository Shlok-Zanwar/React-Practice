const createState = () => {
    var state = {
        pannelId: "500002",
        channels: [
            {
                "channelId": "1",
                "channelName": "Channel 1",
                "show": true
            },
            {
                "channelId": "2",
                "channelName": "Channel 2",
                "show": true
            },
            {
                "channelId": "3",
                "channelName": "Channel 3",
                "show": true
            },
            {
                "channelId": "4",
                "channelName": "Channel 4",
                "show": true
            },
            {
                "channelId": "5",
                "channelName": "Channel 5",
                "show": true
            },
            {
                "channelId": "6",
                "channelName": "Channel 6",
                "show": true
            },
            {
                "channelId": "7",
                "channelName": "Channel 7",
                "show": true
            },
            {
                "channelId": "8",
                "channelName": "Channel 8",
                "show": true
            },
            {
                "channelId": "9",
                "channelName": "Channel 9",
                "show": true
            },
            {
                "channelId": "10",
                "channelName": "Channel 10",
                "show": true
            },
            {
                "channelId": "11",
                "channelName": "Channel 11",
                "show": true
            },
            {
                "channelId": "12",
                "channelName": "Channel 12",
                "show": true
            },
            {
                "channelId": "13",
                "channelName": "Channel 13",
                "show": true
            },
            {
                "channelId": "14",
                "channelName": "Channel 14",
                "show": true
            },
            {
                "channelId": "15",
                "channelName": "Channel 15",
                "show": true
            },
            {
                "channelId": "16",
                "channelName": "Channel 16",
                "show": true
            },
            {
                "channelId": "17",
                "channelName": "Channel 17",
                "show": true
            },
        ]
    }
    state = {
        pannelId: "",
        channels: [],
    }
    return state;
}

// Id needs to be stored in string format
const pannelDetailsReducer = (state = createState(), action) => {
    var newState;
    switch (action.type) {
        case 'CHANGE_CHANNEL_DETAILS':
            newState = {...state};
            newState.channels = action.payload;
            return newState;

        case 'CHANGE_PANNEL_DETAILS':
            return action.payload;

        default:
            return state;
    }
}

export default pannelDetailsReducer;