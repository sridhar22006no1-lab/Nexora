import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Plus, 
  Trash2, 
  Edit3, 
  AlertCircle, 
  Flame, 
  Target, 
  Check, 
  X, 
  Sparkles, 
  Bell, 
  Volume2, 
  VolumeX, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { StudyTask, ExamMilestone, UserProfile } from '../../types';
import { 
  fetchStudyTasks, 
  saveStudyTask, 
  toggleTaskStatus, 
  deleteStudyTask, 
  fetchPomodoroStats, 
  logPomodoroSession 
} from '../../lib/supabase';
import { initialExamMilestones } from '../../lib/mockData';

interface StudyPlannerViewProps {
  user: UserProfile | null;
  onOpenAuthModal?: () => void;
}

type PomodoroMode = 'focus' | 'short_break' | 'long_break';

const MODE_TIMES: Record<PomodoroMode, number> = {
  focus: 25 * 60,
  short_break: 5 * 60,
  long_break: 15 * 60
};

const COMMON_SUBJECTS = [
  'Data Structures & Algos',
  'Operating Systems',
  'Database Systems (DBMS)',
  'Computer Networks',
  'Full Stack Web Dev',
  'Cloud & DevOps',
  'Aptitude & Campus Prep'
];

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({ user }) => {
  // Task state
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'completed'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [exams, setExams] = useState<ExamMilestone[]>(initialExamMilestones);

  // New task form state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState(COMMON_SUBJECTS[0]);
  const [taskDueDate, setTaskDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [taskEstimatedMins, setTaskEstimatedMins] = useState(45);
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [isSavingTask, setIsSavingTask] = useState(false);

  // New exam milestone modal
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examTitle, setExamTitle] = useState('');
  const [examSubject, setExamSubject] = useState('Computer Science');
  const [examDate, setExamDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [examTarget, setExamTarget] = useState('Grade A+ / 90%+');

  // Pomodoro timer state
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(MODE_TIMES.focus);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [pomodoroStats, setPomodoroStats] = useState(() => fetchPomodoroStats());
  const timerRef = useRef<any>(null);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    setLoadingTasks(true);
    try {
      const data = await fetchStudyTasks(user?.id);
      setTasks(data);
    } catch (err) {
      console.error('Failed to load study tasks:', err);
    } finally {
      setLoadingTasks(false);
    }
  };

  // Timer tick effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, pomodoroMode]);

  // Handle timer session completion
  const handleTimerComplete = () => {
    setIsRunning(false);
    if (pomodoroMode === 'focus') {
      const updated = logPomodoroSession(25);
      setPomodoroStats(updated);
      alert('🎉 Awesome focus session! 25 minutes logged. Time for a quick break!');
      setPomodoroMode('short_break');
      setTimeLeft(MODE_TIMES.short_break);
    } else {
      alert('☕ Break is over! Ready for the next deep work session?');
      setPomodoroMode('focus');
      setTimeLeft(MODE_TIMES.focus);
    }
  };

  const switchMode = (mode: PomodoroMode) => {
    setIsRunning(false);
    setPomodoroMode(mode);
    setTimeLeft(MODE_TIMES[mode]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODE_TIMES[pomodoroMode]);
  };

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = MODE_TIMES[pomodoroMode];
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  // Task actions
  const handleToggleTask = async (taskId: string, currentStatus: StudyTask['status']) => {
    const nextStatus = currentStatus === 'completed' ? 'todo' : 'completed';
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus, completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined } : t));
    await toggleTaskStatus(taskId, nextStatus);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Delete this study task?')) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
      await deleteStudyTask(taskId);
    }
  };

  const handleOpenEditTask = (task: StudyTask) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskSubject(task.subject);
    setTaskDueDate(task.dueDate);
    setTaskEstimatedMins(task.estimatedMinutes);
    setTaskPriority(task.priority);
    setIsTaskModalOpen(true);
  };

  const handleOpenNewTask = () => {
    setEditingTaskId(null);
    setTaskTitle('');
    setTaskSubject(COMMON_SUBJECTS[0]);
    const d = new Date();
    d.setDate(d.getDate() + 2);
    setTaskDueDate(d.toISOString().split('T')[0]);
    setTaskEstimatedMins(45);
    setTaskPriority('medium');
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setIsSavingTask(true);
    try {
      const saved = await saveStudyTask(
        {
          userId: user?.id || 'guest',
          title: taskTitle.trim(),
          subject: taskSubject,
          dueDate: taskDueDate,
          estimatedMinutes: Number(taskEstimatedMins),
          priority: taskPriority,
          status: editingTaskId ? (tasks.find(t => t.id === editingTaskId)?.status || 'todo') : 'todo'
        },
        editingTaskId || undefined
      );

      if (editingTaskId) {
        setTasks(prev => prev.map(t => t.id === saved.id ? saved : t));
      } else {
        setTasks(prev => [saved, ...prev]);
      }
      setIsTaskModalOpen(false);
    } catch (err) {
      console.error('Error saving task:', err);
    } finally {
      setIsSavingTask(false);
    }
  };

  // Exam actions
  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim()) return;
    const newExam: ExamMilestone = {
      id: 'exam-' + Date.now(),
      title: examTitle.trim(),
      subject: examSubject,
      examDate: examDate,
      targetScore: examTarget.trim()
    };
    setExams(prev => [...prev, newExam]);
    setIsExamModalOpen(false);
    setExamTitle('');
  };

  const handleDeleteExam = (examId: string) => {
    setExams(prev => prev.filter(e => e.id !== examId));
  };

  const getDaysRemaining = (targetDateString: string) => {
    const target = new Date(targetDateString).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    if (activeFilter === 'todo' && t.status === 'completed') return false;
    if (activeFilter === 'completed' && t.status !== 'completed') return false;
    if (selectedSubject !== 'all' && t.subject !== selectedSubject) return false;
    return true;
  });

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.filter(t => t.status !== 'completed').length;

  return (
    <div className="space-y-7 py-2 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-6 sm:p-8 border border-indigo-900/40 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Focus Planner & Milestone Tracker
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Study Smarter with Pomodoro & Goals ⏱️
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track daily revision milestones, manage semester deadlines, and maintain maximum focus using the scientific Pomodoro technique.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleOpenNewTask}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" /> Add Study Task
            </button>
            <button
              onClick={() => setIsExamModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Target className="w-4 h-4 text-amber-400" /> Add Exam Date
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px] font-semibold">Today's Focus Time</div>
            <div className="text-lg font-black text-white mt-0.5">{pomodoroStats.todayMinutes} Mins</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px] font-semibold">Focus Sessions</div>
            <div className="text-lg font-black text-indigo-400 mt-0.5">{pomodoroStats.todaySessions} Completed</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px] font-semibold">Tasks Completed</div>
            <div className="text-lg font-black text-emerald-400 mt-0.5">{completedCount} / {tasks.length}</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px] font-semibold">Pending Milestones</div>
            <div className="text-lg font-black text-amber-400 mt-0.5">{pendingCount} Tasks</div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Pomodoro Focus Engine (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pomodoro Box */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl text-center space-y-6 relative overflow-hidden">
            {/* Glow accent */}
            <div className={`absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
              pomodoroMode === 'focus' ? 'bg-indigo-600/20' : 'bg-emerald-500/20'
            }`}></div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                Pomodoro Focus Timer
              </span>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute alert sounds' : 'Enable alert sounds'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
              <button
                onClick={() => switchMode('focus')}
                className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  pomodoroMode === 'focus'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Focus (25m)
              </button>
              <button
                onClick={() => switchMode('short_break')}
                className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  pomodoroMode === 'short_break'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Short (5m)
              </button>
              <button
                onClick={() => switchMode('long_break')}
                className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  pomodoroMode === 'long_break'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Long (15m)
              </button>
            </div>

            {/* Huge Timer Display with Progress Ring */}
            <div className="py-4">
              <div className="text-5xl sm:text-6xl font-black text-white tracking-wider font-mono">
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-2">
                {pomodoroMode === 'focus' ? 'Deep Work Session • Zero Distractions' : 'Rest your eyes & hydrate'}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 mt-5 overflow-hidden border border-slate-800">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    pomodoroMode === 'focus' ? 'bg-gradient-to-r from-indigo-500 to-violet-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" /> Start Session
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleTimerComplete}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="Skip to next session"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Exam Deadlines Countdown Widget */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                Upcoming Exams & Drives
              </h3>
              <button
                onClick={() => setIsExamModalOpen(true)}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                + Add Exam
              </button>
            </div>

            <div className="space-y-3">
              {exams.map(exam => {
                const daysLeft = getDaysRemaining(exam.examDate);
                const isUrgent = daysLeft <= 14;

                return (
                  <div
                    key={exam.id}
                    className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{exam.title}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>{exam.subject}</span>
                        <span>•</span>
                        <span>{new Date(exam.examDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      {exam.targetScore && (
                        <div className="text-[10px] text-indigo-400 font-semibold">Target: {exam.targetScore}</div>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block px-2.5 py-1 rounded-xl text-xs font-black ${
                        isUrgent 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {daysLeft > 0 ? `${daysLeft} Days` : daysLeft === 0 ? 'Today!' : 'Completed'}
                      </span>
                      <button
                        onClick={() => handleDeleteExam(exam.id)}
                        className="block mt-1 text-[10px] text-slate-400 hover:text-rose-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Task Management & Action Checklist (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Tasks Control Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Tasks ({tasks.length})
              </button>
              <button
                onClick={() => setActiveFilter('todo')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'todo' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'completed' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>

            {/* Subject Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-slate-950 text-slate-200 text-xs py-2 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Subjects</option>
                {COMMON_SUBJECTS.map(subj => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>

              <button
                onClick={handleOpenNewTask}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>
          </div>

          {/* Tasks List */}
          {loadingTasks ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-slate-900/60 border border-slate-800 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">No tasks in this view</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {activeFilter === 'completed'
                  ? 'No tasks completed yet. Check off a pending task when you complete a revision milestone!'
                  : 'Great job! You have cleared all pending study tasks. Click "+ Add Task" to set new study goals.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map(task => {
                const isDone = task.status === 'completed';

                return (
                  <div
                    key={task.id}
                    className={`group rounded-2xl bg-slate-900 border p-4 flex items-start justify-between gap-3 transition-all ${
                      isDone 
                        ? 'border-slate-800/60 opacity-60 bg-slate-950/40' 
                        : 'border-slate-800 hover:border-slate-700 hover:shadow-md'
                    }`}
                  >
                    {/* Checkbox & Details */}
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        onClick={() => handleToggleTask(task.id, task.status)}
                        className={`mt-0.5 shrink-0 transition-colors cursor-pointer ${
                          isDone ? 'text-emerald-400' : 'text-slate-400 hover:text-indigo-400'
                        }`}
                        title={isDone ? 'Mark as incomplete' : 'Mark task completed'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 fill-emerald-400/20 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="space-y-1 min-w-0">
                        <div className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                          {task.title}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                            {task.subject}
                          </span>

                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.estimatedMinutes} mins
                          </span>

                          <span>•</span>

                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            Due {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>

                          {/* Priority badge */}
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                            task.priority === 'high' 
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                              : task.priority === 'medium'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEditTask(task)}
                        className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit task"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Task Creation / Edit Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingTaskId ? 'Edit Study Task' : 'Add New Study Task'}
              </h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solve 5 Dynamic Programming Tree problems on LeetCode"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Subject Domain *
                  </label>
                  <select
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 px-3 py-2 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    {COMMON_SUBJECTS.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-slate-950 text-slate-100 px-3 py-2 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Estimated Time (Mins)
                  </label>
                  <select
                    value={taskEstimatedMins}
                    onChange={(e) => setTaskEstimatedMins(Number(e.target.value))}
                    className="w-full bg-slate-950 text-slate-200 px-3 py-2 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value={15}>15 Minutes (Quick)</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes (Standard)</option>
                    <option value={60}>60 Minutes (1 Hour)</option>
                    <option value={90}>90 Minutes (Deep Work)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full bg-slate-950 text-slate-200 px-3 py-2 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="high">🔥 High Priority</option>
                    <option value="medium">⚡ Medium Priority</option>
                    <option value="low">🌱 Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingTask}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {isSavingTask ? 'Saving...' : editingTaskId ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exam Deadline Modal */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" /> Add Exam / Campus Drive
              </h3>
              <button onClick={() => setIsExamModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExam} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Exam / Drive Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems End Semester Theory"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 px-3.5 py-2 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Core Computer Science"
                  value={examSubject}
                  onChange={(e) => setExamSubject(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 px-3.5 py-2 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Exam Date *
                </label>
                <input
                  type="date"
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 px-3.5 py-2 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Target Score / Goal (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clear with 85%+ or Zero Backlogs"
                  value={examTarget}
                  onChange={(e) => setExamTarget(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 px-3.5 py-2 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsExamModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
