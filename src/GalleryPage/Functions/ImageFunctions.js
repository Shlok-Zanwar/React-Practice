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
