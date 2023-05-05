import React, { Component } from 'react';
import Cookies from 'js-cookie';

function Calendar() {
    const user = Cookies.get('session');

    return (
        <div>
            <h1>This is the calendar.</h1>
        </div>
    );
}

export default Calendar;