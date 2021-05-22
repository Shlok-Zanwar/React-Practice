const createState = () => {
    var state = {
        pannelId: "450001",
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
            }
        ]
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

        default:
            return state;
    }
}

export default pannelDetailsReducer;