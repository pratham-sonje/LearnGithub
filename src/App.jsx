import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TodoStats from './components/TodoStats';
import TodoInput from './components/TodoInput';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import { INITIAL_TODOS } from './constants';
import './App.css';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('taskflow_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // Todos state
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_todos');
      return saved ? JSON.parse(saved) : INITIAL_TODOS;
    } catch {
      return INITIAL_TODOS;
    }
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sync theme to root html element and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskflow_theme', theme);
  }, [theme]);

  // Sync todos to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow_todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Add todo
  const handleAddTodo = ({ text, category, priority, dueDate }) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      category,
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // Toggle single todo
  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete single todo
  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Edit todo
  const handleEditTodo = (id, updatedFields) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  // Bulk toggle all
  const handleToggleAll = () => {
    const allCompleted = todos.every((t) => t.completed);
    setTodos((prev) => prev.map((t) => ({ ...t, completed: !allCompleted })));
  };

  // Clear completed
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  // Computed statistics
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  // Filtered and sorted todos
  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        // Status filter
        if (statusFilter === 'active' && todo.completed) return false;
        if (statusFilter === 'completed' && !todo.completed) return false;

        // Category filter
        if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;

        // Priority filter
        if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          return todo.text.toLowerCase().includes(query);
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        if (sortBy === 'priority') {
          const priorityWeights = { high: 3, medium: 2, low: 1 };
          return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
        }
        if (sortBy === 'dueDate') {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return 0;
      });
  }, [todos, searchQuery, statusFilter, categoryFilter, priorityFilter, sortBy]);

  return (
    <div className="app-container">
      <div className="app-card">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          completedCount={completedCount}
          totalCount={totalCount}
        />

        <TodoStats
          total={totalCount}
          completed={completedCount}
          pending={pendingCount}
        />

        <main className="app-main-content">
          <TodoInput onAddTodo={handleAddTodo} />

          <TodoFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            onToggleAll={handleToggleAll}
            onClearCompleted={handleClearCompleted}
            hasCompleted={completedCount > 0}
            totalUnfiltered={totalCount}
          />
        </main>

        <footer className="app-footer">
          <p>
            TaskFlow React Todo App • Double-click any task to edit inline • Press{' '}
            <kbd>Enter</kbd> to save
          </p>
        </footer>
      </div>
    </div>
  );
}
