import { useState, useEffect } from 'react'
import { getTodos } from '../../api/todoApi.jsx'
import './Home.css'

export default function Home() {
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
    <div>
      <h1>To Do List</h1>
      <div className="card-container">
         {todos.length > 0 ? (
              todos.map(todo => (
                <div key={todo.id} className = "card">
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
      </div>
    </div>
  )
}
