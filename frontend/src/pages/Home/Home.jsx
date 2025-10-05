import { useState, useEffect } from 'react'
import { getTodos, deleteTodo } from '../../api/todoApi.jsx'
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

  const handleDelete = async (id) => {
    try{
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div>
      <h1>To Do List</h1>
      <div className="card-container">
         {todos.length > 0 ? (
              todos.map(todo => (
                <div key={todo.id} className = "card">
                  <div className = "card-header"> 
                    <h2> {todo.title} </h2>
                    <div className = "card-actions">
                      <button className='delete-btn' onClick={() => handleDelete(todo.id)}> Delete </button>
                      <button className='status-btn'> {todo.is_completed ? "Complete" : "Incomplete"} </button>
                    </div>
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
