import "./NewTask.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {createTodo} from '../../api/todoApi';

const NewTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
            e.preventDefault();
            if (!title.trim()) return;
            setLoading(true);
            try{
                await createTodo({ title: title.trim(), description: description.trim() });
                // Navigate back to the main page after successful creation
                navigate('/');
            }catch(err){
                console.error('Failed to create todo', err);
            }finally{
                setLoading(false);
            }
    }

    return (
        <div>
            <h1>Create New Task</h1>
            <form className="new-task-form" onSubmit={handleSubmit}>
                <div className="new-task-title">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="new-task-description">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Adding…' : 'Add Task'}</button>
                  <Link to="/"><button type="button" className="btn-secondary">Cancel</button></Link>
                </div>
            </form>
        </div>
    );
}

export default NewTask;