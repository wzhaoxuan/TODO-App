import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Completed from './pages/Completed/Completed'
import AddTask from './pages/NewTask/NewTask'
import EditTask from './pages/EditTask/EditTask'

function App() {
  return (
    <div className="app-container">
      <h1 className="app-header">TODO App</h1>
      <nav className="app-nav">
          <Link to="/" className="nav-section uncompleted" aria-label="Uncompleted tasks">
            <span className="nav-btn">Uncompleted tasks</span>
          </Link>

          <Link to="/add" className="nav-section tasks" aria-label="Add Task">
            <span className="nav-btn">Add Task</span>
          </Link>

        <Link to="/completed" className="nav-section nav-footer completed" aria-label="View completed tasks">
          <span className="nav-btn">View Completed</span>
        </Link>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/todos/:id/edit" element={<EditTask />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
