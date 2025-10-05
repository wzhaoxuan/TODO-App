import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodos, deleteTodo, updateTodo, deleteAllTodos } from '../../api/todoApi.jsx'
import './Home.css'

export default function Home() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

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

  const handleDeleteAll = async () => {
    try{
      await deleteAllTodos();
      setTodos([]);
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  }

  // navigate to an edit page 
  const handleEdit = (id) => {
    navigate(`/todos/${id}/edit`);
  }

  // toggle completion state
  const handleToggleComplete = async (id, current) => {
    try {
      const response = await updateTodo(id, { is_completed: !current });
      setTodos(prev => prev.map(t => t.id === id ? response.data : t));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  }

  return (
    <div>
      <header className="home-header">
        <h1>To Do List</h1>
        <button className="delete-all-btn" onClick={() => handleDeleteAll()}> Delete All </button>
      </header>
      <main className="card-container">
         {todos.length > 0 ? (
              todos.map(todo => (
                <div
                  key={todo.id}
                  className="card"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleEdit(todo.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleEdit(todo.id);
                    }
                  }}
                >
                  <div className = "card-header"> 
                    <h2> {todo.title} </h2>
                    <div className = "card-actions">
                      <button className='delete-btn' onClick={(e) => { e.stopPropagation(); handleDelete(todo.id); }}> Delete </button>
                      <button className='status-btn' onClick={(e) => { e.stopPropagation(); handleToggleComplete(todo.id, todo.is_completed); }}> {todo.is_completed ? "Complete" : "Incomplete"} </button>
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
      </main>
    </div>
  )
}
