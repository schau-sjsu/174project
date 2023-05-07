import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './todo.css'

function TodoList() {

    const user = Cookies.get('session');
    // const [desc, setDesc] = useState("");

    const [data, setData] = useState([]);

    useEffect(() => {
        if (user) {
            fetch('http://cos-cs106.science.sjsu.edu/~014155765/code/todo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: user})
            })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
        }
    }, []);
    let today = new Date();
    let renderView = (task, index) => {
        if (today > new Date(task.duedate)) {
            return (
                <div key={task.tid} className="past-due">
                    <h2>PAST DUE DATE {task.description}</h2>
                    <p>{task.duedate}</p>
                </div>
                );
        }
        else {
            return (
                <div key={task.tid} className="not-due">
                    <h2>{task.description}</h2>
                    <p>{task.duedate}</p>
                </div>
            );
        }
    };
    
    return (
        <>
            <div id="heading">
                <center><h1> Tasks for User: {user} </h1></center>
            </div>
            <div class="tasks">
                {data.map(task => renderView(task))}
            </div>
        </>
    );
}

export default TodoList;
