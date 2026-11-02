import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Pin, 
  PinOff, 
  Trash2, 
  Edit3, 
  Copy, 
  Check, 
  Tag, 
  Folder, 
  Calendar, 
  Sparkles, 
  Code2, 
  FileText, 
  CheckCircle2, 
  ListOrdered, 
  List, 
  Heading, 
  Bold, 
  Italic, 
  Eye, 
  Filter,
  X,
  AlertCircle
} from 'lucide-react';
import { StudyNote, UserProfile } from '../../types';
import { fetchUserNotes, saveUserNote, deleteUserNote, togglePinNote } from '../../lib/supabase';

interface NotesManagerViewProps {
  user: UserProfile | null;
  onOpenAuthModal?: () => void;
}

const COLOR_THEMES = [
  { id: 'indigo', name: 'Indigo Nebula', border: 'border-indigo-500', bg: 'bg-indigo-500/10', text: 'text-indigo-400', ring: 'ring-indigo-500', badge: 'bg-indigo-500/20 text-indigo-300' },
  { id: 'purple', name: 'Purple Void', border: 'border-violet-500', bg: 'bg-violet-500/10', text: 'text-violet-400', ring: 'ring-violet-500', badge: 'bg-violet-500/20 text-violet-300' },
  { id: 'blue', name: 'Ocean Cyan', border: 'border-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-400', ring: 'ring-cyan-500', badge: 'bg-cyan-500/20 text-cyan-300' },
  { id: 'emerald', name: 'Emerald Forest', border: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400', ring: 'ring-emerald-500', badge: 'bg-emerald-500/20 text-emerald-300' },
  { id: 'amber', name: 'Golden Sun', border: 'border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-400', ring: 'ring-amber-500', badge: 'bg-amber-500/20 text-amber-300' },
  { id: 'rose', name: 'Rose Red', border: 'border-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-400', ring: 'ring-rose-500', badge: 'bg-rose-500/20 text-rose-300' },
] as const;

const COMMON_SUBJECTS = [
  'All Subjects',
  'Data Structures & Algos',
  'Operating Systems',
  'Database Systems (DBMS)',
  'Computer Networks',
  'Full Stack Web Dev',
  'Cloud & DevOps',
  'Artificial Intelligence'
];

export const NotesManagerView: React.FC<NotesManagerViewProps> = ({ user, onOpenAuthModal }) => {
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'updated' | 'title' | 'pinned'>('pinned');

  // Modal editor states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorSubject, setEditorSubject] = useState('Data Structures & Algos');
  const [editorCustomSubject, setEditorCustomSubject] = useState('');
  const [editorUnit, setEditorUnit] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorTags, setEditorTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [editorColor, setEditorColor] = useState<'indigo' | 'purple' | 'blue' | 'emerald' | 'amber' | 'rose'>('indigo');
  const [editorIsPinned, setEditorIsPinned] = useState(false);
  const [editorPreviewMode, setEditorPreviewMode] = useState<'write' | 'preview'>('write');
  const [isSaving, setIsSaving] = useState(false);
  const [copyFeedbackId, setCopyFeedbackId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, [user]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchUserNotes(user?.id);
      setNotes(data);
    } catch (err) {
      console.error('Failed to load study notes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Open editor for new note
  const handleOpenNewNote = () => {
    setEditingNoteId(null);
    setEditorTitle('');
    setEditorSubject('Data Structures & Algos');
    setEditorCustomSubject('');
    setEditorUnit('');
    setEditorContent('');
    setEditorTags(['Exam Prep']);
    setEditorColor('indigo');
    setEditorIsPinned(false);
    setEditorPreviewMode('write');
    setIsEditorOpen(true);
  };

  // Open editor for editing existing note
  const handleOpenEditNote = (note: StudyNote) => {
    setEditingNoteId(note.id);
    setEditorTitle(note.title);
    if (COMMON_SUBJECTS.includes(note.subject)) {
      setEditorSubject(note.subject);
      setEditorCustomSubject('');
    } else {
      setEditorSubject('Other');
      setEditorCustomSubject(note.subject);
    }
    setEditorUnit(note.unit || '');
    setEditorContent(note.content);
    setEditorTags(note.tags);
    setEditorColor(note.colorTheme);
    setEditorIsPinned(note.isPinned);
    setEditorPreviewMode('write');
    setIsEditorOpen(true);
  };

  // Tag addition
  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');
    if (trimmed && !editorTags.includes(trimmed)) {
      setEditorTags([...editorTags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditorTags(editorTags.filter(t => t !== tagToRemove));
  };

  // Markdown helper buttons
  const insertMarkdown = (syntaxStart: string, syntaxEnd = '') => {
    const textarea = document.getElementById('note-content-area') as HTMLTextAreaElement | null;
    if (!textarea) {
      setEditorContent(prev => prev + syntaxStart + syntaxEnd);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editorContent.substring(start, end);
    const beforeText = editorContent.substring(0, start);
    const afterText = editorContent.substring(end);

    const replacement = syntaxStart + (selectedText || 'text') + syntaxEnd;
    setEditorContent(beforeText + replacement + afterText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + syntaxStart.length,
        start + syntaxStart.length + (selectedText ? selectedText.length : 4)
      );
    }, 10);
  };

  // Save note action
  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorTitle.trim() || !editorContent.trim()) return;

    setIsSaving(true);
    const resolvedSubject = editorSubject === 'Other' && editorCustomSubject.trim() 
      ? editorCustomSubject.trim() 
      : editorSubject;

    try {
      const saved = await saveUserNote(
        {
          userId: user?.id || 'guest-student',
          title: editorTitle.trim(),
          subject: resolvedSubject,
          unit: editorUnit.trim(),
          content: editorContent.trim(),
          tags: editorTags,
          colorTheme: editorColor,
          isPinned: editorIsPinned
        },
        editingNoteId || undefined
      );

      if (editingNoteId) {
        setNotes(prev => prev.map(n => n.id === saved.id ? saved : n));
      } else {
        setNotes(prev => [saved, ...prev]);
      }
      setIsEditorOpen(false);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle Pin
  const handleTogglePin = async (noteId: string, currentPinned: boolean) => {
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isPinned: !currentPinned } : n));
    await togglePinNote(noteId, currentPinned);
  };

  // Delete Note
  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this study note?')) {
      setDeletingId(noteId);
      try {
        await deleteUserNote(noteId);
        setNotes(prev => prev.filter(n => n.id !== noteId));
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Copy Note Content
  const handleCopyNote = (note: StudyNote) => {
    const textToCopy = `# ${note.title}\nSubject: ${note.subject} ${note.unit ? `(${note.unit})` : ''}\n\n${note.content}`;
    navigator.clipboard.writeText(textToCopy);
    setCopyFeedbackId(note.id);
    setTimeout(() => setCopyFeedbackId(null), 2000);
  };

  // Filter & Sort Logic
  const filteredNotes = notes.filter(n => {
    const matchesSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSubject = selectedSubject === 'All Subjects' || n.subject === selectedSubject;
    const matchesTag = !selectedTag || n.tags.includes(selectedTag);

    return matchesSearch && matchesSubject && matchesTag;
  }).sort((a, b) => {
    if (sortBy === 'pinned') {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  // Calculate unique subjects & tags for quick filters
  const allSubjects = Array.from(new Set(notes.map(n => n.subject)));
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));
  const pinnedCount = notes.filter(n => n.isPinned).length;

  return (
    <div className="space-y-7 py-2 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-6 sm:p-8 border border-indigo-900/40 shadow-xl">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Student Notes & Revision Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Organized Notes, Maximum Retention 📚
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Create unit-wise revision cheat sheets, code snippets, and exam summaries with live Markdown preview and instant tag search.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleOpenNewNote}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" /> New Study Note
            </button>
          </div>
        </div>

        {/* Quick Stats Pill Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-slate-300">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Total Notes: <strong className="text-white font-bold">{notes.length}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-slate-300">
            <Folder className="w-3.5 h-3.5 text-violet-400" />
            <span>Subjects: <strong className="text-white font-bold">{allSubjects.length}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-slate-300">
            <Pin className="w-3.5 h-3.5 text-amber-400" />
            <span>Pinned for Revision: <strong className="text-white font-bold">{pinnedCount}</strong></span>
          </div>
          {selectedTag && (
            <div className="flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-xl border border-indigo-500/40 text-xs">
              <span>Filter: #{selectedTag}</span>
              <button onClick={() => setSelectedTag(null)} className="hover:text-white cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by topic, unit, formula, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 dark:bg-slate-900 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Subject Dropdown & Sort */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs py-2.5 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {COMMON_SUBJECTS.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
            {allSubjects.filter(s => !COMMON_SUBJECTS.includes(s)).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 text-slate-200 text-xs py-2.5 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="pinned">Pinned First</option>
            <option value="updated">Latest Updated</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Tag Filter Chips Bar */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
          <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1 shrink-0 mr-1">
            <Tag className="w-3 h-3 text-indigo-400" /> Tags:
          </span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
              !selectedTag ? 'bg-indigo-600 text-white' : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                selectedTag === tag 
                  ? 'bg-indigo-600 text-white font-bold' 
                  : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-5 w-24 bg-slate-800 rounded-lg"></div>
                <div className="h-4 w-4 bg-slate-800 rounded-full"></div>
              </div>
              <div className="h-6 w-3/4 bg-slate-800 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-800/70 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-800/70 rounded"></div>
                <div className="h-4 w-2/3 bg-slate-800/70 rounded"></div>
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-5 w-16 bg-slate-800 rounded-md"></div>
                <div className="h-5 w-16 bg-slate-800 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredNotes.length === 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No study notes found</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              {searchQuery || selectedSubject !== 'All Subjects' || selectedTag
                ? 'No notes match your active search filters. Try clearing filters or creating a new revision card.'
                : 'Your study hub is currently empty. Click "New Study Note" to create your first unit summary or coding cheat sheet!'}
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            {(searchQuery || selectedSubject !== 'All Subjects' || selectedTag) && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedSubject('All Subjects'); setSelectedTag(null); }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={handleOpenNewNote}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" /> Create Note
            </button>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {!loading && filteredNotes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map(note => {
            const themeConfig = COLOR_THEMES.find(t => t.id === note.colorTheme) || COLOR_THEMES[0];
            const isCopying = copyFeedbackId === note.id;

            return (
              <div
                key={note.id}
                className={`group relative rounded-2xl bg-slate-900/90 dark:bg-slate-900 border ${
                  note.isPinned ? `${themeConfig.border} shadow-lg shadow-indigo-950/30` : 'border-slate-800 hover:border-slate-700'
                } p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1`}
              >
                {/* Note Top Bar */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${themeConfig.badge}`}>
                        {note.subject}
                      </span>
                      {note.unit && (
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/60 truncate max-w-[130px]" title={note.unit}>
                          {note.unit}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePin(note.id, note.isPinned)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          note.isPinned 
                            ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title={note.isPinned ? 'Unpin note' : 'Pin to top for revision'}
                      >
                        {note.isPinned ? <Pin className="w-3.5 h-3.5 fill-amber-400" /> : <Pin className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleOpenEditNote(note)}
                        className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit note"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        disabled={deletingId === note.id}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2">
                    {note.title}
                  </h3>

                  {/* Content Preview */}
                  <div className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-4 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] whitespace-pre-line mb-3">
                    {note.content.replace(/[#*`>]/g, '')}
                  </div>

                  {/* Tags */}
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="text-[10px] font-medium text-slate-400 hover:text-indigo-300 bg-slate-800/60 hover:bg-slate-800 px-2 py-0.5 rounded transition-colors cursor-pointer"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Strip */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{new Date(note.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>

                  <button
                    onClick={() => handleCopyNote(note)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                      isCopying
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750'
                    }`}
                  >
                    {isCopying ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Markdown
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Note Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {editingNoteId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {editingNoteId ? 'Edit Study Note' : 'Create New Study Note'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Supports formatted Markdown, formulas, code snippets & subject tagging
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveNote} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {/* Note Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems: Process vs Thread & Deadlock Conditions"
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 placeholder-slate-400 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs font-semibold"
                />
              </div>

              {/* Subject & Unit Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Subject Domain *
                  </label>
                  <select
                    value={editorSubject}
                    onChange={(e) => setEditorSubject(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs cursor-pointer"
                  >
                    {COMMON_SUBJECTS.filter(s => s !== 'All Subjects').map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                    <option value="Other">+ Custom Subject...</option>
                  </select>
                  {editorSubject === 'Other' && (
                    <input
                      type="text"
                      placeholder="Enter custom subject name..."
                      value={editorCustomSubject}
                      onChange={(e) => setEditorCustomSubject(e.target.value)}
                      className="mt-2 w-full bg-slate-950 text-slate-100 px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Unit / Module Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unit 3: Synchronization & Concurrency"
                    value={editorUnit}
                    onChange={(e) => setEditorUnit(e.target.value)}
                    className="w-full bg-slate-950 text-slate-100 placeholder-slate-400 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                  />
                </div>
              </div>

              {/* Theme & Pin Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Card Accent:</span>
                  <div className="flex items-center gap-1.5">
                    {COLOR_THEMES.map(theme => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setEditorColor(theme.id as any)}
                        className={`w-6 h-6 rounded-full ${theme.bg} ${theme.border} border-2 flex items-center justify-center transition-all cursor-pointer ${
                          editorColor === theme.id ? 'scale-125 ring-2 ring-white/60' : 'opacity-70 hover:opacity-100'
                        }`}
                        title={theme.name}
                      >
                        {editorColor === theme.id && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={editorIsPinned}
                    onChange={(e) => setEditorIsPinned(e.target.checked)}
                    className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900 w-4 h-4 cursor-pointer"
                  />
                  <Pin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pin to top for quick exam revision</span>
                </label>
              </div>

              {/* Tags Manager */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Tags & Keywords
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add tag (e.g. Deadlocks, DP, Gate2026) and press Add"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-400 px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Add Tag
                  </button>
                </div>

                {editorTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {editorTags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-[11px] font-medium border border-indigo-500/20"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-rose-400 cursor-pointer ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Markdown Content Area with Toolbar & Tab Switcher */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditorPreviewMode('write')}
                      className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                        editorPreviewMode === 'write' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Write Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorPreviewMode('preview')}
                      className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                        editorPreviewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview Markdown
                    </button>
                  </div>

                  {/* Toolbar shortcuts */}
                  {editorPreviewMode === 'write' && (
                    <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs">
                      <button
                        type="button"
                        onClick={() => insertMarkdown('### ')}
                        className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Heading"
                      >
                        <Heading className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('**', '**')}
                        className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('*', '*')}
                        className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('- ')}
                        className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Bullet List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown('```\n', '\n```')}
                        className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Code Block"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {editorPreviewMode === 'write' ? (
                  <textarea
                    id="note-content-area"
                    required
                    rows={10}
                    placeholder="Write detailed notes, formulas, bullet summaries or code snippets using standard Markdown..."
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    className="w-full bg-slate-950 text-slate-100 placeholder-slate-400 p-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 font-mono text-xs leading-relaxed"
                  />
                ) : (
                  <div className="w-full min-h-[220px] max-h-[350px] overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans space-y-2">
                    {editorContent.trim() ? (
                      <div className="whitespace-pre-line leading-relaxed">
                        {editorContent}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">No note content to preview yet.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {editingNoteId ? 'Update Study Note' : 'Save Study Note'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
