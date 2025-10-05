import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import AddTask from './pages/NewTask/NewTask'
import EditTask from './pages/EditTask/EditTask'

function App() {
  return (
    <div className="app-container">
      <nav className="app-nav">
        <h1>Task</h1>
        <div className="nav-action">
          <Link to="/add">
            <button> Add Task </button>
          </Link>
        </div>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/todos/:id/edit" element={<EditTask />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
