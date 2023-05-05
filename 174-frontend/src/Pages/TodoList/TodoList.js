import React, { useState, useEffect } from 'react';

function TodoList() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetch('http://cos-cs106.science.sjsu.edu/~013879866/code/currentuser.php')
        .then(response => response.json())
        .then(data => {setUser(data); console.log(data)})
        .catch(error => console.error(error));
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://cos-cs106.science.sjsu.edu/~013879866/code/todo.php')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    function handleLogout() {
        fetch('http://cos-cs106.science.sjsu.edu/~013879866/code/logout.php')
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        setUser(null);
        window.location.href = "/login";
    }

    if (user) {
        return (
            <div>
                <button onClick={handleLogout}>Logout</button>
            <h1>Upcoming Tasks</h1>
            <div>
                {data.map(item => (
                <div className='task-card'>
                    <h2>{item.description}</h2>
                    <p>{item.duedate}</p>
                </div>
                ))}
            </div>
            </div>
        );
    } else {
        return (
            <div>Not logged in</div>
        );
    }
}

export default TodoList;
