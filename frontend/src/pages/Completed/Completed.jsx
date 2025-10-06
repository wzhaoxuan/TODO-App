import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos, updateTodo, deleteTodo } from '../../api/todoApi';
import './Completed.css';

export default function Completed() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const response = await getTodos();
        setTodos(response.data.filter(t => t.is_completed));
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, []);

  const handleUncomplete = async (id, current) => {
    try {
      const response = await updateTodo(id, { is_completed: !current });
      // remove from this list since it's now incomplete
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="completed-page">
      <h2>Completed Tasks</h2>
      <main className="card-container">
        {todos.length === 0 ? (
          <p>No completed tasks yet.</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="card">
              <div className="card-header">
                <h3>{todo.title}</h3>
                <div className="card-actions">
                  <button onClick={() => handleUncomplete(todo.id, todo.is_completed)} className="status-btn">Mark Incomplete</button>
                  <button onClick={() => handleDelete(todo.id)} className="delete-btn">Delete</button>
                </div>
              </div>
              <div className="card-body">
                <p>{todo.description}</p>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
