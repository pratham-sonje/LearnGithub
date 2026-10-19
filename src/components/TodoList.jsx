import React from 'react';
import TodoItem from './TodoItem';
import { CheckCheck, Trash, ClipboardList, SearchX } from 'lucide-react';

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onToggleAll,
  onClearCompleted,
  hasCompleted,
  totalUnfiltered
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        {totalUnfiltered === 0 ? (
          <>
            <div className="empty-icon-wrapper">
              <ClipboardList size={48} className="empty-icon" />
            </div>
            <h3>No tasks yet</h3>
            <p>Add your first task above to start organizing your day!</p>
          </>
        ) : (
          <>
            <div className="empty-icon-wrapper">
              <SearchX size={48} className="empty-icon" />
            </div>
            <h3>No matching tasks found</h3>
            <p>Try adjusting your search query or filters to find what you're looking for.</p>
          </>
        )}
      </div>
    );
  }

  const allCompleted = todos.every((t) => t.completed);

  return (
    <div className="todo-list-wrapper">
      <div className="list-toolbar">
        <span className="task-count-text">
          Showing <strong>{todos.length}</strong> {todos.length === 1 ? 'task' : 'tasks'}
        </span>

        <div className="list-bulk-actions">
          <button
            onClick={onToggleAll}
            className="bulk-btn"
            title={allCompleted ? 'Mark all incomplete' : 'Mark all completed'}
          >
            <CheckCheck size={16} />
            <span>{allCompleted ? 'Uncheck All' : 'Check All'}</span>
          </button>

          {hasCompleted && (
            <button
              onClick={onClearCompleted}
              className="bulk-btn danger"
              title="Delete completed tasks"
            >
              <Trash size={16} />
              <span>Clear Completed</span>
            </button>
          )}
        </div>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

