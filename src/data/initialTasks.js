export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Design high-converting landing page in Figma',
    description: 'Create wireframes and interactive prototypes for the new SaaS marketing page with dark mode accents.',
    priority: 'high',
    category: 'Design',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    completed: false,
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: 'sub-1', text: 'Define color hierarchy & typography', completed: true },
      { id: 'sub-2', text: 'Create hero section variants', completed: true },
      { id: 'sub-3', text: 'Design responsive tablet & mobile views', completed: false },
    ],
  },
  {
    id: 'task-2',
    title: 'Implement Tailwind CSS v4 styling architecture',
    description: 'Set up CSS-first theme configuration, custom utilities, and test performance with Vite HMR.',
    priority: 'high',
    category: 'Development',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    subtasks: [
      { id: 'sub-4', text: 'Install @tailwindcss/vite plugin', completed: true },
      { id: 'sub-5', text: 'Configure theme tokens in index.css', completed: true },
    ],
  },
  {
    id: 'task-3',
    title: 'Review quarterly product roadmap with stakeholders',
    description: 'Align key engineering milestones with the Q3 business objectives and marketing launches.',
    priority: 'medium',
    category: 'Work',
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    subtasks: [
      { id: 'sub-6', text: 'Gather metrics from sprint retrospective', completed: false },
      { id: 'sub-7', text: 'Prepare presentation deck', completed: false },
    ],
  },
  {
    id: 'task-4',
    title: 'Evening gym workout & 5km cardio run',
    description: 'Upper body hypertrophy training followed by Zone 2 cardiovascular endurance pacing.',
    priority: 'low',
    category: 'Personal',
    dueDate: new Date().toISOString().split('T')[0], // Today
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    subtasks: [],
  },
  {
    id: 'task-5',
    title: 'Optimize API response latency for dashboard queries',
    description: 'Add edge caching and Redis memoization to reduce p99 response times below 80ms.',
    priority: 'medium',
    category: 'Development',
    dueDate: new Date(Date.now() + 432000000).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    subtasks: [
      { id: 'sub-8', text: 'Analyze slow query logs', completed: true },
      { id: 'sub-9', text: 'Implement Redis caching layer', completed: false },
    ],
  },
];

export const CATEGORIES = ['All', 'Work', 'Development', 'Design', 'Personal'];
export const PRIORITIES = ['all', 'high', 'medium', 'low'];
