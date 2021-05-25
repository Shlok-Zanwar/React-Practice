import React, { useEffect } from 'react';
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { changeTimelineStart } from '../../Actions/DateTimeActions';

export default function MaterialUIPickers() {
	const dateTimeReducer = useSelector(state => state.dateTimeReducer);
	const [selectedDate, setSelectedDate] = React.useState(moment().format());
	const dispatch = useDispatch();


	const handleDateChange = (date) => {
		let selectedDate = date.format();           // Converting th date to new format
		selectedDate = moment(selectedDate.substring(0, 10) + "T00:00:00+05:30").format();
		

		var duration = moment.duration(moment(new Date()).diff(selectedDate) );      // Comparing time difference between current time and selectedDate
		if(duration.asHours() > 24){                      // means theres enough space on timeline
			dispatch(changeTimelineStart(selectedDate));    // therefore setting it to the state
		}
		else{                                             // Setting the time to (today - 24 hrs)
			dispatch(changeTimelineStart(moment(moment().format()).subtract(24, 'hours').format()))
		}

		setSelectedDate(date.format());					  // Setting the date for DatePicker 
	};


	// For changing date when user uses arrow button 
	useEffect(() => {
		setSelectedDate(moment(dateTimeReducer.timelineStart).format())
	}, [dateTimeReducer.timelineStart])
 
	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<KeyboardDatePicker
				disableToolbar
				variant="inline" 
				format="MM/DD/yyyy"
				margin="normal"
				id="date-picker-inline"
				value={selectedDate}
				onChange={handleDateChange}
				maxDate={new Date()}
				style={{maxWidth: '150px'}}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}