import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        fetch('login.php', { // this fetch link will probably have to change
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Login successful, redirect to home page
                    window.location.href = 'home.php'; // have to redirect this somewhere else
                } else {
                    // Login failed, show error message
                    this.setState({ error: data.message });
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ margin: "15px" }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div style={{ margin: "15px" }}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
