import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { changeTimelineStart, changeSelectedTime } from '../../Actions/DateTimeActions';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DatePicker from './DatePicker';
import moment from 'moment'



function ValueLabelComponent(props) { 	// Function for tooltip on timeline
    const { children, open, value } = props;
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
}

ValueLabelComponent.propTypes = {		// Something used by ValueLabelComponent()
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Timeline() { 
    // const [marks, setMarks] = useState([{'value': 0, 'label': '00'}, {'value': 4, 'label': '01'}, {'value': 8, 'label': '02'}, {'value': 12, 'label': '03'}, {'value': 16, 'label': '04'}, {'value': 20, 'label': '05'}, {'value': 24, 'label': '06'}, {'value': 28, 'label': '07'}, {'value': 32, 'label': '08'}, {'value': 36, 'label': '09'}, {'value': 40, 'label': '10'}, {'value': 44, 'label': '11'}, {'value': 48, 'label': '12'}, {'value': 52, 'label': '13'}, {'value': 56, 'label': '14'}, {'value': 60, 'label': '15'}, {'value': 64, 'label': '16'}, {'value': 68, 'label': '17'}, {'value': 72, 'label': '18'}, {'value': 76, 'label': '19'}, {'value': 80, 'label': '20'}, {'value': 84, 'label': '21'}, {'value': 88, 'label': '22'}, {'value': 92, 'label': '23'}]);

    const [currSelectedTick, setCurrSelectedTick] = useState(0);
    const dateTimeReducer = useSelector(state => state.dateTimeReducer);
    const dispatch = useDispatch();
	const slotsInHour = 4;						// no of ticks between 1 hr 4 => 0, 15, 30, 24

    const makeTimelineMarks = () => {
		var marks = [];
		var i, timeLabel, fullDate, myHour, key;
		

		for(i = 0; i < 24; i ++){
			timeLabel = moment(dateTimeReducer.timelineStart).add(i, 'hours');		// Timelinestart + current position (hour) 
			fullDate = timeLabel.format().split("T")[0];                 // returns YYYY-mm-dd
			myHour = timeLabel.hour() <= 9 ? "-0" : "-";				 // Converting (adding extra 0)
			myHour += timeLabel.hour();
			key = fullDate + myHour;									 // Format => ("YYYY-MM-DD-HH")

			let markTemplate = {
				value: i*slotsInHour,
				label: myHour[1] + myHour[2],
				key: key,
			}
			marks.push(markTemplate);
		}
		return marks;
    }
    const [marks, setMarks] = useState(makeTimelineMarks());
    

    const valuetext = (value) => {
        var key = marks[Math.floor(value/4)].key;									// Taking Key from Marks Array
        var arr = key.split("-");													// Convert to ["YYYY", "MM", "DD", "HH"]
        var toRender = arr[2] + " " + moment.monthsShort()[parseInt(arr[1]) - 1];	// Eg => 20 May 
        var minutes = value%4 === 0 ? "0" : "";
        minutes += (value%4 * 15)
        toRender += " " + moment(arr[3] + ":" + minutes, ["HH:mm"]).format("hh:mm A");	// Eg => 20 May 08:15 AM
        return toRender;
    }

    // This will re-render the timelime and timeline Marks everytime a new date is set
    useEffect(() => {
        setMarks(makeTimelineMarks);
    }, [dateTimeReducer.timelineStart])

	// This is for handling date change
    useEffect(() => {
		handleTimeChange("e", currSelectedTick);
    }, [marks])


    const handleClick = () => {
		console.log(dateTimeReducer);
		// console.log(ImageFunctions());
    }

    const handleTimeChange = (e, newValue) => {		// New Value of timeline
        setCurrSelectedTick(newValue);
		// Setting to to redux state
		var selectedTime = marks[parseInt(newValue/4)].key;
		var minutes = newValue%4 === 0 ? "0" : "";
        minutes += (newValue%4 * 15)
		dispatch(changeSelectedTime( selectedTime + "-" + minutes )) // Format => ("YYYY-MM-DD-HH-MM")
    }

    const handlePrev = () => {
		dispatch(changeTimelineStart( moment(dateTimeReducer.timelineStart).subtract(6, 'hours').format() )) // 6hrs back from current timeline start
		// console.log(Math.min(currSelectedTick + 24, 95));
		setCurrSelectedTick(Math.min(currSelectedTick + 24, 95));			// Tick mover to +24 (6*4)
    }

    const handleNext = () => {
		const end = moment(dateTimeReducer.timelineStart).add(6, 'hours').format(); 				// 6hrs front from current timeline start
		var duration = moment.duration(moment(new Date()).diff(end) )								// Diff b/w current time and new set
		// console.log(duration.asHours());
		if(duration.asHours() > 24){																//Checking if possible
			dispatch(changeTimelineStart(end));
			setCurrSelectedTick(Math.max(0, currSelectedTick - 24));
		}
		else{																						// Else 24 back from now
			dispatch(changeTimelineStart(moment(moment().format()).subtract(24, 'hours').format()))
			setCurrSelectedTick(0);
		}
    }

    return (
        <div className="timeline-div">
			<div style={{display: 'flex'}}>
				<DatePicker />
				<div style={{cursor: 'pointer', padding: "0px 10px 0px 0px"}}>
					<NavigateBeforeIcon style={{fontSize: "30px"}} onClick={() => {handlePrev()}} />
				</div>
				<Slider
					value={currSelectedTick}
					onChange={handleTimeChange}
					max={95}
					getAriaValueText={valuetext}
					valueLabelFormat={valuetext}
					ValueLabelComponent={ValueLabelComponent}
					aria-labelledby="custom thumb label"
					step={1}
					track={false}
					valueLabelDisplay="on"
					marks={marks}
				/>
				<div style={{cursor: 'pointer', padding: "0px 0px 0px 10px"}}>
					<NavigateNextIcon style={{fontSize: "30px"}} onClick={() => {handleNext()}} />
				</div>
			</div>
        </div>
    );
}