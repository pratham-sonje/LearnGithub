import React from 'react';
import { CheckSquare, Moon, Sun, Sparkles } from 'lucide-react';

export default function Header({ theme, toggleTheme, completedCount, totalCount }) {
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="logo-group">
          <div className="logo-icon-wrapper">
            <CheckSquare className="logo-icon" size={28} />
          </div>
          <div>
            <h1 className="app-title">TaskFlow</h1>
            <p className="app-date">{today}</p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle Dark/Light Mode"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="header-tagline">
        <Sparkles size={16} className="sparkle-icon" />
        <span>
          {totalCount === 0
            ? 'Start your day by adding your first task!'
            : completedCount === totalCount
            ? 'All tasks completed! Amazing work! 🎉'
            : `You have completed ${completedCount} of ${totalCount} tasks today`}
        </span>
      </div>
    </header>
  );
}

