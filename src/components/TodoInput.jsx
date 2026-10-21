import React, { useState, useRef } from 'react';
import { Plus, Tag, Flag, Calendar, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setErrorMessage('Please type a task before clicking Add!');
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    setErrorMessage('');
    onAddTodo({
      text: trimmed,
      category,
      priority,
      dueDate: dueDate || null
    });

    setText('');
    setDueDate('');
    setShowOptions(false);

    // Keep focus for quick sequential additions
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <form className={`todo-input-form ${errorMessage ? 'has-error' : ''}`} onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          ref={inputRef}
          type="text"
          className="todo-main-input"
          placeholder="What do you need to get done?"
          value={text}
          onChange={handleTextChange}
          autoFocus
        />
        <button
          type="button"
          className={`options-toggle-btn ${showOptions ? 'active' : ''}`}
          onClick={() => setShowOptions(!showOptions)}
          title="Toggle extra options (Category, Priority, Date)"
        >
          {showOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <span className="btn-label-desktop">Details</span>
        </button>
        <button
          type="submit"
          className="add-task-btn"
          title="Add task to list"
        >
          <Plus size={18} />
          <span>Add</span>
        </button>
      </div>

      {errorMessage && (
        <div className="input-error-message">
          <AlertCircle size={15} />
          <span>{errorMessage}</span>
        </div>
      )}

      {showOptions && (
        <div className="input-options-drawer">
          <div className="option-field">
            <label>
              <Tag size={15} /> Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="option-select"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="option-field">
            <label>
              <Flag size={15} /> Priority:
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="option-select"
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label} Priority
                </option>
              ))}
            </select>
          </div>

          <div className="option-field">
            <label>
              <Calendar size={15} /> Due Date:
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="option-date-input"
            />
          </div>
        </div>
      )}
    </form>
  );
}
