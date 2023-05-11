import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import Calendar from './Pages/Calendar/Calendar';
import TodoList from './Pages/TodoList/TodoList';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <header>
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </header>
        <Navigation />
        <Routes>
          <Route path="/" element={<TodoList />} exact />
          <Route path="/calendar" element={<Calendar />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
