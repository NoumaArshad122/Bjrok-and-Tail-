import React from 'react';
import { CheckCircle, Clock, AlertTriangle, ListTodo, TrendingUp } from 'lucide-react';

export default function StatsOverview({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const highPriorityPending = tasks.filter((t) => !t.completed && t.priority === 'high').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      subtext: `${pending} remaining`,
      icon: ListTodo,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
      iconBg: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'In Progress',
      value: pending,
      subtext: 'Active workload',
      icon: Clock,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      iconBg: 'bg-amber-500/10 text-amber-400',
    },
    {
      label: 'Completed',
      value: completed,
      subtext: `${completionRate}% overall rate`,
      icon: CheckCircle,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      label: 'High Priority',
      value: highPriorityPending,
      subtext: highPriorityPending > 0 ? 'Requires attention' : 'All clear',
      icon: AlertTriangle,
      color: 'from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30',
      iconBg: 'bg-rose-500/10 text-rose-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="relative overflow-hidden p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 group hover:-translate-y-0.5 shadow-lg shadow-black/20"
          >
            {/* Background accent glow */}
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity`} />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wide uppercase text-slate-400">
                {stat.label}
              </span>
              <div className={`p-2.5 rounded-xl ${stat.iconBg} ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
            </div>

            <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-slate-500" />
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
