import { useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import './Datepicker.css';
import {useNavigate} from 'react-router-dom';
const weekDays = { en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }; // English weekday names

const DatePicker = ({ selectedDate, onChange }) => {
  const today = new Date();
  const navigate = useNavigate();
  // Parse the selectedDate if it exists, otherwise default to today
  const [showDate, setShowDate] = useState(
    selectedDate ? new Date(selectedDate) : today
  );

  const firstDayThisMonth = new Date(showDate.getFullYear(), showDate.getMonth(), 1);
  const dayOfWeek = (firstDayThisMonth.getDay() + 6) % 7; // Adjust for Monday as first day
  const firstDayNextMonth = new Date(showDate.getFullYear(), showDate.getMonth() + 1, 1);

  const month = useMemo(() => {
    const m = [];
    for (let d = firstDayThisMonth; d < firstDayNextMonth; d.setDate(d.getDate() + 1)) {
      m.push(new Date(d));
    }
    return m;
  }, [showDate]);


  return (
    <div className="hl-followus">
      <div className="hl-month d-flex flex-wrap flex-row align-items-baseline justify-content-between px-3 pt-3 bg-primary text-light">
        {showDate.getFullYear()}
      </div>

      <div className="hl-month d-flex flex-wrap flex-row align-items-baseline justify-content-between px-3 pb-3 bg-primary text-white h2">
        {showDate.toLocaleString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
        })}
      </div>

      {/* Month navigation */}
      <div className="hl-month d-flex align-items-center justify-content-center">
        <Button
          onClick={() => setShowDate(new Date(showDate.setMonth(showDate.getMonth() - 1)))}
          className="hl-day-button rounded-circle p-0 hl-bc1 border-white mx-1"
          variant="light"
        >
          <i className="fas fa-chevron-left" style={{ fontSize: '1.5rem', color: '#007bff' }} />
        </Button>
        <div className="h5">
          {showDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <Button
          onClick={() => setShowDate(new Date(showDate.setMonth(showDate.getMonth() + 1)))}
          className="hl-day-button rounded-circle p-0 hl-bc0 border-0 mx-1"
          variant="light"
        >
          <i className="fas fa-chevron-right" style={{ fontSize: '1.5rem', color: '#007bff' }} />
        </Button>
      </div>

      {/* Weekdays */}
      <div className="hl-month d-flex flex-wrap flex-row">
        {weekDays.en.map((weekDay) => (
          <div key={weekDay} className="hl-day d-flex justify-content-center">
            <small className="fw-bold">{weekDay}</small>
          </div>
        ))}
      </div>

      {/* Days of the month */}
      <div className="hl-month d-flex flex-wrap flex-row">
        <div style={{ width: `${dayOfWeek * 14.28}%` }} />
        {month.map((day) => {
          const highlightSelectedDate =
            selectedDate &&
            selectedDate.getDate() === day.getDate() &&
            selectedDate.getMonth() === day.getMonth() &&
            selectedDate.getFullYear() === day.getFullYear();

          return (
            <div key={day} className="hl-day d-flex justify-content-center">
              <Button
                onClick={() => {
                  const selectedDay = new Date(day); 
                  selectedDay.setDate(selectedDay.getDate()); 
                  setShowDate(day); 
                  onChange(selectedDay); 
                }}
                className={`hl-day-button rounded-circle p-0 ${!highlightSelectedDate && 'hl-bc0 border-0'}`}
                variant={highlightSelectedDate ? 'primary' : 'light'}
              >
                <span style={{ fontSize: '1.5rem', color: highlightSelectedDate ? '#fff' : '#000' }}>
                  {day.getDate()}
                </span>
              </Button>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="hl-action-buttons d-flex justify-content-between mt-3 flex-wrap">
  <Button variant="success" onClick={() => navigate("/exercises")} className="m-1">Exercises</Button>
  <Button variant="info" onClick={() => navigate("/meals")} className="m-1">Meals</Button>
  <Button variant="warning" onClick={() => navigate("/routines")} className="m-1">Routines</Button>
</div>
    </div>
  );
};

export default DatePicker;
