import React, { useState } from 'react'
import axios from "axios";
import publicIp from "public-ip";

function Temp() {
    const [ip, setIp] = useState();

    

    // export const getClientIp = async () => await publicIp.v4({
    //     fallbackUrls: [ "https://ifconfig.co/ip" ]
    // });
    const API_KEY = '0547a1dc7d31f1ea00564901dd257f2d';


    const handleClick = async() => {
        console.log(await publicIp.v4());
        var ipp = await publicIp.v4();
        console.log(ipp);
        axios.get('https://ipapi.co/' + ipp + '/latlong/')
            .then(res => {
                var latlong = res.data.split(",");
                console.log(latlong);
                axios.get('http://api.openweathermap.org/data/2.5/weather?lat='+latlong[0]+'&lon='+latlong[1]+'&appid='+API_KEY)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <button onClick = {() => handleClick()}>
                Click
            </button>
        </div>
    )
}

export default Temp
