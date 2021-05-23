export const changeChannelDetails = (details) => {
    return {
        type: "CHANGE_CHANNEL_DETAILS",
        payload: details
    }
}

export const changePannelDetails = (details) => {
    return {
        type: "CHANGE_PANNEL_DETAILS",
        payload: details
    }
}