import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar() {
    const user = Cookies.get('session');

    const [events, setEvents] = useState([]);

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
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    );
}

export default Calendar;