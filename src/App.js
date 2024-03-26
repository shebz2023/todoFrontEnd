import React from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom"; 
import Todo from "./pages/Todo";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import NoPage from './pages/NoPage'
import "./App.css";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
