# TaskFlow - Modern React Todo App 📝

A feature-rich, responsive Todo application built with **React 19**, **Vite**, and **Lucide Icons**.

---

## ✨ Features

- **Task Management**: Add, complete, inline-edit, and delete tasks.
- **Categorization**: Organize by category (*Work, Personal, Study, Health, Finance*).
- **Priority Levels**: Flag tasks with *Low, Medium, or High* priority badges.
- **Due Dates & Overdue Alerts**: Set due dates with visual badges showing *Due Today*, *Due Tomorrow*, or *Overdue*.
- **Productivity Dashboard**: Real-time task metrics (Total, In Progress, Completed, Productivity %) with dynamic progress bar.
- **Search & Filter**: Real-time keyword search, status tabs (*All, Active, Completed*), category filter, and priority filter.
- **Smart Sorting**: Sort by *Newest First*, *Oldest First*, *Priority (High to Low)*, or *Due Date*.
- **Bulk Actions**: One-click bulk complete/uncomplete and clear completed tasks.
- **Dark / Light Mode**: Seamless theme toggling with theme persistence.
- **Local Persistence**: Automatically saves your tasks and theme preference in `localStorage`.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Header with theme toggle & date display
│   │   ├── TodoStats.jsx    # Metrics cards & progress bar
│   │   ├── TodoInput.jsx    # Add task form with options drawer
│   │   ├── TodoFilters.jsx  # Search, filter tabs & sort controls
│   │   ├── TodoList.jsx     # Task list container & bulk actions
│   │   └── TodoItem.jsx     # Individual task with inline editing
│   ├── App.jsx              # Main state orchestration & local storage
│   ├── App.css              # Application styling & layout
│   ├── constants.js         # Categories, priorities & initial demo data
│   ├── index.css            # CSS variables & light/dark design tokens
│   └── main.jsx             # React entry point
├── index.html           # HTML template
├── package.json         # Scripts and dependencies
└── vite.config.js       # Vite configuration
```

---

## ⌨️ Helpful Shortcuts
- **Enter**: Save new task or save edited task
- **Escape**: Cancel inline task editing
- **Double-click**: Double-click any task title to edit it inline
