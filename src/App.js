import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiTrash2 } from 'react-icons/fi';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      const todo = {
        id: uuidv4(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const handleTodoDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleTodoToggle = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const getRemainingTasksCount = () => {
    return todos.filter((todo) => !todo.completed).length;
  };

  const getCompletedTasksCount = () => {
    return todos.filter((todo) => todo.completed).length;
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoToggle(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button onClick={() => handleTodoDelete(todo.id)}>
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>
      <p>Remaining Tasks: {getRemainingTasksCount()}</p>
      <p>Completed Tasks: {getCompletedTasksCount()}</p>
    </div>
  );
}

export default App;
