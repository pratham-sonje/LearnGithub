export const CATEGORIES = [
  { id: 'all', label: 'All Categories', color: '#6366f1' },
  { id: 'work', label: 'Work', color: '#3b82f6' },
  { id: 'personal', label: 'Personal', color: '#ec4899' },
  { id: 'study', label: 'Study', color: '#8b5cf6' },
  { id: 'health', label: 'Health', color: '#10b981' },
  { id: 'finance', label: 'Finance', color: '#f59e0b' }
];

export const PRIORITIES = [
  { id: 'low', label: 'Low', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  { id: 'medium', label: 'Medium', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  { id: 'high', label: 'High', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' }
];

export const INITIAL_TODOS = [
  {
    id: '1',
    text: 'Explore TaskFlow React Todo App 🚀',
    completed: true,
    category: 'study',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: '2',
    text: 'Review pull requests and code architecture',
    completed: false,
    category: 'work',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: '3',
    text: 'Go for a 30-minute evening run 🏃‍♂️',
    completed: false,
    category: 'health',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '4',
    text: 'Plan budget for upcoming weekend trip',
    completed: false,
    category: 'finance',
    priority: 'low',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  }
];

