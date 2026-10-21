import React from 'react';
import { ClipboardCheck, Plus, Sparkles } from 'lucide-react';

export default function EmptyState({ onOpenNewTaskModal, isFiltered }) {
  return (
    <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800/80 backdrop-blur-sm">
      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
        <ClipboardCheck className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <Sparkles className="w-3 h-3 text-indigo-300" />
        </span>
      </div>

      <h3 className="text-lg font-bold text-white mb-1">
        {isFiltered ? 'No matching tasks found' : 'No tasks on your board'}
      </h3>

      <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
        {isFiltered
          ? 'Try adjusting your search criteria or clear some filters to view your tasks.'
          : 'Stay ahead of your goals by organizing projects, work, and personal tasks in one place.'}
      </p>

      <button
        id="empty-create-task-btn"
        type="button"
        onClick={onOpenNewTaskModal}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Create your first task</span>
      </button>
    </div>
  );
}
