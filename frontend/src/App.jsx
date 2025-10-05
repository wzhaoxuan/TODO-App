import './App.css'
import { getTodos } from './api/todoApi.jsx'
import { useState, useEffect } from 'react'
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(()=> {
    const fetchTodos = async () =>{
      try{
        const response = await getTodos();
        setTodos(response.data);
      }catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div className = "app-container">
      <nav className = "app-nav">
        <h1>Task</h1>
        <div className = "nav-action"> 
          <button> Today </button>
        </div>
      </nav>
      <main className = "app-main">
        <h1>To Do List</h1>
          {
            todos.length > 0 ? (
              todos.map(todo => (
                <div className = "card">
                  <div className = "card-header"> 
                    <h2> {todo.title} </h2>
                    <button> {todo.is_completed ? "Complete" : "Incomplete"} </button>
                  </div>
                  <div className = "card-body">
                    <p> {todo.description ? todo.description : "No description available"} </p>
                  </div>
                </div>
              ))
            ) : (
              <p> No Tasks, Add a task to get started! </p>
            )
          }
      </main>
    </div>
  )
}

export default App
