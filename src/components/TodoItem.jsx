import React, { useState, useRef, useEffect } from 'react';
import {
  Check,
  Circle,
  CheckCircle2,
  Trash2,
  Edit2,
  Calendar,
  Save,
  X,
  AlertTriangle
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(todo.id, {
        text: trimmed,
        category: editCategory,
        priority: editPriority,
        dueDate: editDueDate || null
      });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  // Helper to format due date and detect overdue
  const getDueDateStatus = (dueDateStr) => {
    if (!dueDateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = dueDateStr.split('-').map(Number);
    const due = new Date(year, month - 1, day);

    const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `Overdue (${Math.abs(diffDays)}d ago)`, isOverdue: true };
    } else if (diffDays === 0) {
      return { text: 'Due Today', isToday: true };
    } else if (diffDays === 1) {
      return { text: 'Due Tomorrow', isSoon: true };
    } else {
      return {
        text: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isNormal: true
      };
    }
  };

  const dueDateStatus = getDueDateStatus(todo.dueDate);
  const categoryObj = CATEGORIES.find((c) => c.id === todo.category) || {
    label: todo.category,
    color: '#6366f1'
  };
  const priorityObj = PRIORITIES.find((p) => p.id === todo.priority) || {
    label: todo.priority,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)'
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div className="todo-edit-mode">
          <input
            ref={inputRef}
            type="text"
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="todo-edit-controls">
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="mini-select"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="mini-select"
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="mini-date-input"
            />

            <div className="edit-btn-actions">
              <button onClick={handleSave} className="icon-action-btn save" title="Save">
                <Save size={16} />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditText(todo.text);
                }}
                className="icon-action-btn cancel"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => onToggle(todo.id)}
            className="todo-checkbox-btn"
            aria-label={todo.completed ? 'Mark incomplete' : 'Mark completed'}
          >
            {todo.completed ? (
              <CheckCircle2 className="check-icon completed" size={22} />
            ) : (
              <Circle className="check-icon incomplete" size={22} />
            )}
          </button>

          <div className="todo-content" onDoubleClick={() => setIsEditing(true)}>
            <p className="todo-text">{todo.text}</p>
            <div className="todo-badges">
              <span
                className="category-pill"
                style={{
                  borderColor: categoryObj.color,
                  color: categoryObj.color,
                  backgroundColor: `${categoryObj.color}18`
                }}
              >
                {categoryObj.label}
              </span>

              <span
                className="priority-pill"
                style={{
                  color: priorityObj.color,
                  backgroundColor: priorityObj.bg
                }}
              >
                {priorityObj.label}
              </span>

              {dueDateStatus && (
                <span
                  className={`date-pill ${
                    dueDateStatus.isOverdue && !todo.completed
                      ? 'overdue'
                      : dueDateStatus.isToday
                      ? 'today'
                      : ''
                  }`}
                >
                  {dueDateStatus.isOverdue && !todo.completed ? (
                    <AlertTriangle size={12} className="alert-inline" />
                  ) : (
                    <Calendar size={12} />
                  )}
                  {dueDateStatus.text}
                </span>
              )}
            </div>
          </div>

          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="action-btn edit-btn"
              title="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="action-btn delete-btn"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

