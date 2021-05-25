import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import WaveLoading from 'react-loadingg/lib/WaveLoading';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        // position: 'relative'
      zIndex: theme.zIndex.drawer + 1,
      color: 'rgb(255, 128, 44)',
    },
  }));

function RenderIndividual({arr, imagesReceived}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = useState(0);

    const handlePrev = e => {
        if(index === 0){
            setIndex(arr.length - 1);
        }
        else{
            setIndex(index - 1);
        }
    }
    const handleNext = e => {
        setIndex((index + 1)%arr.length);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        if(arr.length === 0){
            return;
        }
        setOpen(true);
    };

    const keyToTime = (key) => {
        var arr = key.split("T");													// Convert to ["YYYY", "MM", "DD", "HH"]
        var temp = arr[0].split("-")
        var date = temp[2] + " " + moment.monthsShort()[parseInt(temp[1]) - 1];	    // Eg => 20 May 
        temp = arr[1].split(":");
        var time = moment(temp[0] + ":" + temp[1], ["HH:mm"]).format("hh:mm A");     // Eg => 08:15 AM
        date += " " + time;	// Eg => 20 May 08:15 AM
        return date;
    }
    // 

    return imagesReceived === true ? ( arr[0] === undefined ? (<div>No Images</div>) : (
        <>
            <img src={arr[0].url} alt={"couldnt load Image"} className="small-grid-images" style={{cursor: 'zoom-in' }} onClick={handleOpen} />
            
            {open===true ?  (
                <Backdrop className={classes.backdrop} open={true}>
                    <div style={{position: 'absolute', top: '48%', left: '1%', cursor: 'pointer'}}>
                        <NavigateBeforeIcon style={{fontSize: "90px"}} onClick={handlePrev} />
                    </div>
                    <img src={arr[index].url} alt={"couldnt load Image"} className="backdrop-image"  />
                    <div style={{position: 'absolute', top: '48%', right: '1%', cursor: 'pointer'}}>
                        <NavigateNextIcon style={{fontSize: "90px"}} onClick={handleNext} />
                    </div>
                    <CloseIcon  style={{position: 'absolute', top: "1%", right: "1%", fontSize: "50px", cursor: "pointer", color: "red"}} onClick={handleClose} />
                    <div style={{position: 'absolute', top: '1%', left: '44%', fontSize: '35px'}} >
                        Image {index + 1} / {arr.length}
                    </div>
                    <div style={{position: 'absolute', backgroundColor: "#fff", borderRadius: "8px", bottom: "2%", left: "42%", fontSize: "35px", cursor: "pointer", color: "red"}} >
                    &nbsp; {keyToTime(arr[index].time)} &nbsp;
                    </div>
                </Backdrop>
                )
           : <></> }
        </> )) : (<WaveLoading size="large" color="rgba(255, 118, 20, 1)" />
    )
}

export default RenderIndividual
