import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import ReactDOM from "react-dom/client";
import Home from './pages/home';

const App = () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root")
  );
  root.render(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/home" element={<Home/>} />
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;
