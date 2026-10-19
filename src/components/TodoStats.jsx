import React from 'react';
import { ListTodo, CheckCircle2, Clock, Award } from 'lucide-react';

export default function TodoStats({ total, completed, pending }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats-container">
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <ListTodo size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper amber">
            <Clock size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{pending}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <Award size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{percentage}%</span>
            <span className="stat-label">Productivity</span>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Overall Progress</span>
          <span className="progress-percentage">{percentage}%</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

