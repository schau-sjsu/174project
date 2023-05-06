import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function TodoList() {

    const user = Cookies.get('session');

    const [data, setData] = useState([]);

    useEffect(() => {
        if (user) {
            fetch('http://cos-cs106.science.sjsu.edu/~013879866/code/todo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: user })
            })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
        }
    }, []);

    if (user) {

        return (
            <div>
            <h1>Upcoming Tasks</h1>
            <div>
                {data.map(item => (
                <div key={item.tid} className='task-card'>
                    <h2>{item.description}</h2>
                    <p>{item.duedate}</p>
                </div>
                ))}
            </div>
            </div>
        );
    } else {
        return (
            <div>
                <p>Insert pretty landing page</p>
            </div>
        );
    }
}

export default TodoList;
