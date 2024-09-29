import  { useState } from 'react';
import DayComponent from "./Day";
import { Header } from "./Header";
import DatePicker from './DatePicker';
import './Home.css';

export function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <>
            <Header className="header" /> 
            <div className="HomeContainer">
                <div className="Dia">
                    
                    <DayComponent date={selectedDate.toISOString().slice(0, 10)} /> 
                </div>
                <div className="Date">
                    <DatePicker selectedDate={selectedDate} onChange={handleDateChange} />
                </div>
            </div>
        </>
    );
}
