import React, { useState } from 'react';
import { Plus, Tag, Flag, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTodo({
      text: trimmed,
      category,
      priority,
      dueDate: dueDate || null
    });

    setText('');
    setDueDate('');
    setShowOptions(false);
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          className="todo-main-input"
          placeholder="What do you need to get done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
        <button type="submit" className="add-task-btn" disabled={!text.trim()}>
          <Plus size={18} />
          <span>Add</span>
        </button>
      </div>

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

