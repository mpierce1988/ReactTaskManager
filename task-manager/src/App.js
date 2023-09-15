import './App.css';
import { Home } from './containers/Home';
import { Header } from './components/Header';
import { Login } from './containers/Login';
import { Register } from './containers/Register';
import { TaskList } from './containers/TaskList';
import { About } from './containers/About';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </UserProvider>
    </div>
  );
}

export default App;
