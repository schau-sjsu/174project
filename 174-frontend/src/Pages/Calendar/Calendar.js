import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import CreateEventModal from './CreateEventModal';
import './Calendar.css'

function Calendar() {
    const user = Cookies.get('session');

    const [events, setEvents] = useState([]);

    const [view, setView] = useState("dayGridMonth");

    // calendar view
    const handleViewChange = (newView) => {
        setView(newView);
    };

    const viewButtons = {
        month: {
        text: "Month",
        click: () => handleViewChange("dayGridMonth"),
        },
        week: {
        text: "Week",
        click: () => handleViewChange("timeGridWeek"),
        },
        list: {
        text: "List",
        click: () => handleViewChange("listMonth"),
        },
    };


    // call server to get all events

    useEffect(() => {
        if (user) {
            fetch('http://cos-cs106.science.sjsu.edu/~013879866/code/events.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: user })
            })
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error(error));
        };
      }, []);

    return (
        <div className='parent'>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
                initialView={view}
                headerToolbar={{
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,listMonth",
                  }}
                eventBackgroundColor='#2c3e50'
                eventBorderColor='#2c3e50'
                events={events}
            />
        </div>
    );
}

export default Calendar;