export const changeTimelineStart = (timelineStart) => {
    // console.log(timelineStart)
    return {
        type: "CHANGE_TIMELINE_START",
        payload: timelineStart
    }
}

export const changeSelectedTime = (time) => {
    // console.log(time)
    return {
        type: "SET_SELECTED_TIME",
        payload: time
    }
}

export const changeTemp = () => {
    // console.log("changing ....")
    return {
        type: "TEMP"
    }
}

