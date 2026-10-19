import React from 'react';
import { Search, X, Filter, ArrowUpDown } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';

export default function TodoFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy
}) {
  return (
    <div className="filters-container">
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="clear-search-btn"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filters-toolbar">
        <div className="status-tabs">
          {['all', 'active', 'completed'].map((tab) => (
            <button
              key={tab}
              className={`status-tab ${statusFilter === tab ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="filter-dropdowns">
          <div className="select-wrapper">
            <Filter size={14} className="dropdown-icon" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <ArrowUpDown size={14} className="dropdown-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

