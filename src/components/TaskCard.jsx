import React, { useState } from 'react';
import {
  Check,
  Calendar,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  ListTree,
} from 'lucide-react';

export default function TaskCard({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
  onToggleSubtask,
}) {
  const [expandedSubtasks, setExpandedSubtasks] = useState(false);

  const priorityStyles = {
    high: {
      badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      dot: 'bg-rose-500',
      label: 'High Priority',
    },
    medium: {
      badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      dot: 'bg-amber-500',
      label: 'Medium Priority',
    },
    low: {
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-500',
      label: 'Low Priority',
    },
  };

  const priorityConfig = priorityStyles[task.priority] || priorityStyles.low;

  // Due date formatting and state check
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate + 'T23:59:59').getTime() < Date.now();

  const isToday =
    task.dueDate &&
    task.dueDate === new Date().toISOString().split('T')[0];

  const subtasksTotal = task.subtasks ? task.subtasks.length : 0;
  const subtasksCompleted = task.subtasks
    ? task.subtasks.filter((s) => s.completed).length
    : 0;
  const subtaskProgress =
    subtasksTotal > 0 ? Math.round((subtasksCompleted / subtasksTotal) * 100) : 0;

  return (
    <div
      className={`group relative rounded-2xl border p-5 transition-all duration-300 ${
        task.completed
          ? 'bg-slate-900/40 border-slate-800/40 opacity-75'
          : 'bg-slate-900/80 backdrop-blur-md border-slate-800 hover:border-slate-700/80 hover:shadow-xl hover:shadow-indigo-950/20 hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Completion Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
          className={`mt-1 flex items-center justify-center w-6 h-6 rounded-lg border transition-all duration-200 cursor-pointer shrink-0 ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'border-slate-700 bg-slate-800/60 hover:border-indigo-500 hover:bg-slate-800 text-transparent'
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
            {/* Title */}
            <h3
              className={`text-base font-semibold leading-snug transition-all ${
                task.completed
                  ? 'line-through text-slate-400'
                  : 'text-slate-100 group-hover:text-white'
              }`}
            >
              {task.title}
            </h3>

            {/* Actions: Edit & Delete */}
            <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800/80 transition-colors cursor-pointer"
                title="Edit task"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors cursor-pointer"
                title="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p
              className={`text-xs leading-relaxed mb-3 ${
                task.completed ? 'text-slate-500 line-through' : 'text-slate-300'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Metadata badges row */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border ${priorityConfig.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig.dot}`} />
              {priorityConfig.label}
            </span>

            {/* Category Tag */}
            {task.category && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
                {task.category}
              </span>
            )}

            {/* Due Date Indicator */}
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                  isOverdue
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    : isToday
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-slate-800/60 text-slate-400 border-slate-800'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>
                  {isOverdue ? 'Overdue: ' : isToday ? 'Due Today: ' : 'Due: '}
                  {task.dueDate}
                </span>
              </span>
            )}

            {/* Subtasks summary trigger */}
            {subtasksTotal > 0 && (
              <button
                type="button"
                onClick={() => setExpandedSubtasks(!expandedSubtasks)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors cursor-pointer ml-auto"
              >
                <ListTree className="w-3 h-3" />
                <span>
                  {subtasksCompleted}/{subtasksTotal} subtasks
                </span>
                {expandedSubtasks ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            )}
          </div>

          {/* Subtasks Progress Bar & Checklist */}
          {subtasksTotal > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-800/60">
              <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${subtaskProgress}%` }}
                />
              </div>

              {expandedSubtasks && (
                <div className="mt-3 space-y-2 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                  {task.subtasks.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => onToggleSubtask(task.id, sub.id)}
                      className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none group/sub"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          sub.completed
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-700 bg-slate-900 group-hover/sub:border-indigo-400'
                        }`}
                      >
                        {sub.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={sub.completed ? 'line-through text-slate-500' : ''}>
                        {sub.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
