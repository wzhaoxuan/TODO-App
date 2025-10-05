import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTodo, updateTodo } from '../../api/todoApi.jsx'
import './EditTask.css'

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await getTodo(id);
        setTitle(res.data.title || '');
        setDescription(res.data.description || '');
      } catch (e) {
        console.error('Error loading todo', e);
      }
    }
    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTodo(id, { title, description });
      navigate('/');
    } catch (err) {
      console.error('Error updating todo', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="edit-container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className='edit-task-title'>
            <label>
                Title
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
        </div>

        <div className='edit-task-description'>
            <label>
                Description
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
        </div>
    
        <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
