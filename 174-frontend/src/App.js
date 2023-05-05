import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import Calendar from './Pages/Calendar/Calendar';
import TodoList from './Pages/TodoList/TodoList';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path="/" element={<TodoList />} exact />
          <Route path="/calendar" element={<Calendar />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
