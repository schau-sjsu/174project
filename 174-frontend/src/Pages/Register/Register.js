import React, { useState } from 'react';
import Cookies from 'js-cookie';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://cos-cs106.science.sjsu.edu/~013879866/code/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.success) {
              console.log('successfully created user');
              Cookies.set('session', username, { path: '/' });
              window.location.href = "/";
            } else {
              setErrorMessage(data.message);
            }
          })
          .catch(error => console.error(error));
      }

    return (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit">Register</button>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      );
}

export default Register;