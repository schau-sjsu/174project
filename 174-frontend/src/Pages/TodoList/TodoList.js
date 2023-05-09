import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './todo.css';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';

function TodoList() {

    const user = Cookies.get('session');
    // const [desc, setDesc] = useState("");

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTask, setEditedTask] = useState(null);

    const completeTask = (e, description, duedate) => {
        e.preventDefault();

        const user = Cookies.get('session');
        console.log("A task has been completed!");

        // Create new task with the selected description and due date
        fetch('http://cos-cs106.science.sjsu.edu/~013879866/code/complete-task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: user, description: description, duedate: duedate })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('successfully added event');
                    window.location.href = "/";
                } else {
                    console.log(data.message);
                }
            })
            .catch(error => console.error(error));
    };

    const editModalTaskAssignment = (e, task) => {
        setEditedTask(task);
        setShowEditModal(true);
    };

    const closingEditedModal = (e) => {
        setEditedTask(null);
        setShowEditModal(false);
    }

    useEffect(() => {
        if (user) {
            fetch('http://cos-cs106.science.sjsu.edu/~014155765/code/todo.php', {
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
    let today = new Date();
    // let renderView = (task, index) => {
    //     console.log(task);
    //     if (today > new Date(task.duedate)) {
    //         return (
    //             <div key={task.tid} className="past-due">
    //                 <h2>PAST DUE DATE {task.description}</h2>
    //                 <p>{task.duedate}</p>
    //                 <button onClick={() => setShowEditModal(true)}>Edit</button>
    //                 <br />
    //                 <button onClick={(e) => completeTask(e, task.description, task.duedate)}>Complete</button>
    //                 {/* <EditTaskModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} task={task} /> */}
    //             </div>
    //         );
    //     }
    //     else {
    //         return (
    //             <div key={task.tid} className="not-due">
    //                 <h2>{task.description}</h2>
    //                 <p>{task.duedate}</p>
    //                 <button onClick={() => setShowEditModal(true)}>Edit</button>
    //                 <br />
    //                 <button onClick={(e) => completeTask(e, task.description, task.duedate)}>Complete</button>
    //                 {/* <EditTaskModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} task={task} /> */}
    //             </div>
    //         );
    //     }
    // };

    return (
        <div className='todo-ctn'>
            <div id="heading">
                <center><h1> {user}'s tasks </h1></center>
                <center>
                    <button onClick={() => setShowModal(true)}>Add Task</button>
                </center>
                
            </div>
            <div class="tasks">
                {data.map(task => {
                    let timelineClass = "";
                    if (today > new Date(task.duedate)) {
                        timelineClass = "past-due";
                    }
                    else {
                        timelineClass = "not-due";
                    }
                    return (
                        <div key={task.tid} className={timelineClass}>
                            <h2>{task.description}</h2>
                            <p>{task.duedate}</p>
                            <button onClick={(e) => editModalTaskAssignment(e, task)}>Edit</button>
                            <br />
                            <button onClick={(e) => completeTask(e, task.description, task.duedate)}>Complete</button>
                            <EditTaskModal isOpen={showEditModal} onClose={(e) => closingEditedModal()} task={editedTask} />
                        </div>
                    );
                })}
            </div>
            <AddTaskModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}

export default TodoList;
