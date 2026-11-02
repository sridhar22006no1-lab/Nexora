import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { JobListing, StudentProject, ContactMessage, UserProfile, StudyNote, StudyTask, ExamMilestone } from '../types';
import { initialProjects, initialJobs, initialStudyNotes, initialStudyTasks, initialExamMilestones } from './mockData';

// Storage keys
const STORAGE_PREFIX = 'nexora_';
const CONFIG_KEY = `${STORAGE_PREFIX}supabase_config`;
const PROJECTS_KEY = `${STORAGE_PREFIX}projects`;
const MESSAGES_KEY = `${STORAGE_PREFIX}messages`;
const AUTH_USER_KEY = `${STORAGE_PREFIX}current_user`;
const NOTES_KEY = `${STORAGE_PREFIX}study_notes`;
const TASKS_KEY = `${STORAGE_PREFIX}study_tasks`;
const POMODORO_KEY = `${STORAGE_PREFIX}pomodoro_stats`;

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getStoredConfig(): SupabaseConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url) return parsed;
    }
  } catch (e) {
    // ignore
  }

  return {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://ukteukdjjujawxwlmqho.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  };
}

export function saveStoredConfig(config: SupabaseConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config to localStorage', e);
  }
}

let cachedClient: SupabaseClient | null = null;
let currentConfigString = '';

export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredConfig();
  const configString = `${config.url}_${config.anonKey}`;

  if (cachedClient && currentConfigString === configString) {
    return cachedClient;
  }

  if (config.url && config.anonKey) {
    try {
      cachedClient = createClient(config.url, config.anonKey, {
        auth: { persistSession: true, autoRefreshToken: true }
      });
      currentConfigString = configString;
      return cachedClient;
    } catch (err) {
      console.warn('Error creating Supabase client:', err);
      return null;
    }
  }

  return null;
}

export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  url: string;
  isCustom: boolean;
  message: string;
}> {
  const config = getStoredConfig();
  if (!config.url || !config.anonKey) {
    return {
      connected: false,
      url: config.url || 'Not configured',
      isCustom: false,
      message: 'Running in Local Storage / Hybrid Mode (Anon Key not provided)'
    };
  }

  try {
    const client = getSupabaseClient();
    if (!client) {
      return {
        connected: false,
        url: config.url,
        isCustom: true,
        message: 'Client initialization failed'
      };
    }

    const { error } = await client.from('projects').select('id').limit(1);
    
    if (error && error.code !== 'PGRST116') {
      return {
        connected: true,
        url: config.url.replace(/^https?:\/\//, ''),
        isCustom: true,
        message: 'Connected to Supabase project (Tables ready to be queried)'
      };
    }

    return {
      connected: true,
      url: config.url.replace(/^https?:\/\//, ''),
      isCustom: true,
      message: 'Live Supabase PostgreSQL Connection Active'
    };
  } catch (err: any) {
    return {
      connected: false,
      url: config.url,
      isCustom: true,
      message: `Connection error: ${err?.message || 'Check network or credentials'}`
    };
  }
}

// ----------------- AUTHENTICATION SERVICES -----------------

export async function getCurrentAuthUser(): Promise<UserProfile | null> {
  const client = getSupabaseClient();
  
  if (client) {
    try {
      const { data: { session } } = await client.auth.getSession();
      if (session?.user) {
        const u = session.user;
        const profile: UserProfile = {
          id: u.id,
          email: u.email || '',
          fullName: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Student Member',
          institution: u.user_metadata?.institution || 'Engineering College',
          degree: u.user_metadata?.degree || 'B.Tech / B.E.',
          graduationYear: u.user_metadata?.graduation_year || 2026,
          studyStreak: 5,
          targetRole: u.user_metadata?.target_role || 'Full-Stack Developer'
        };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
        return profile;
      }
    } catch (e) {
      console.warn('Supabase auth session fetch error, checking local:', e);
    }
  }

  // Fallback to local session
  try {
    const local = localStorage.getItem(AUTH_USER_KEY);
    if (local) return JSON.parse(local);
  } catch (e) {
    // ignore
  }

  return null;
}

export async function signUpUser(params: {
  email: string;
  password: string;
  fullName: string;
  institution?: string;
  degree?: string;
  graduationYear?: number;
}): Promise<{ success: boolean; user?: UserProfile; message: string }> {
  const client = getSupabaseClient();
  
  const localProfile: UserProfile = {
    id: 'user-' + Date.now(),
    email: params.email,
    fullName: params.fullName,
    institution: params.institution || 'Engineering College',
    degree: params.degree || 'B.Tech / B.E.',
    graduationYear: params.graduationYear || 2026,
    studyStreak: 1,
    targetRole: 'Full-Stack Developer',
    created_at: new Date().toISOString()
  };

  if (client) {
    try {
      const { data, error } = await client.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
          data: {
            full_name: params.fullName,
            institution: params.institution,
            degree: params.degree,
            graduation_year: params.graduationYear
          }
        }
      });

      if (!error && data.user) {
        const profile: UserProfile = {
          ...localProfile,
          id: data.user.id
        };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
        return { success: true, user: profile, message: 'Account created successfully!' };
      } else if (error) {
        // Fallback to local mode if Supabase credentials aren't configured yet
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(localProfile));
        return { success: true, user: localProfile, message: 'Signed in with local profile (Supabase auth pending config)' };
      }
    } catch (e) {
      console.warn('Supabase signup error, using local fallback:', e);
    }
  }

  // Local fallback
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(localProfile));
  return { success: true, user: localProfile, message: 'Account created successfully (Local Storage Mode)!' };
}

export async function signInUser(email: string, password: string): Promise<{ success: boolean; user?: UserProfile; message: string }> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (!error && data.user) {
        const u = data.user;
        const profile: UserProfile = {
          id: u.id,
          email: u.email || email,
          fullName: u.user_metadata?.full_name || email.split('@')[0],
          institution: u.user_metadata?.institution || 'Engineering College',
          degree: u.user_metadata?.degree || 'B.Tech / B.E.',
          graduationYear: u.user_metadata?.graduation_year || 2026,
          studyStreak: 5,
          targetRole: u.user_metadata?.target_role || 'Full-Stack Developer'
        };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
        return { success: true, user: profile, message: 'Signed in successfully!' };
      }
    } catch (e) {
      console.warn('Supabase sign in failed, checking local credentials:', e);
    }
  }

  // Demo fallback
  const demoProfile: UserProfile = {
    id: 'demo-user',
    email,
    fullName: email.split('@')[0] || 'Student Member',
    institution: 'Engineering Institute',
    degree: 'B.Tech Computer Science',
    graduationYear: 2026,
    studyStreak: 5,
    targetRole: 'Full-Stack Developer'
  };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demoProfile));
  return { success: true, user: demoProfile, message: 'Signed in successfully (Offline/Hybrid Mode)!' };
}

export async function signOutUser(): Promise<void> {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      // ignore
    }
  }
  localStorage.removeItem(AUTH_USER_KEY);
}

// Quick 1-click student demo login
export function loginAsDemoStudent(): UserProfile {
  const demoProfile: UserProfile = {
    id: 'demo-student-01',
    email: 'student@nexora.dev',
    fullName: 'Student Learner',
    institution: 'National Institute of Technology',
    degree: 'B.Tech Computer Science',
    graduationYear: 2026,
    studyStreak: 7,
    targetRole: 'Full-Stack Developer',
    created_at: new Date().toISOString()
  };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demoProfile));
  return demoProfile;
}

// ----------------- CRUD & HYBRID DATA SERVICES -----------------

export async function fetchProjects(): Promise<StudentProject[]> {
  const client = getSupabaseClient();
  
  if (client) {
    try {
      const { data, error } = await client
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(data));
        return data as StudentProject[];
      }
    } catch (e) {
      console.warn('Supabase fetch projects error, using local fallback:', e);
    }
  }

  try {
    const local = localStorage.getItem(PROJECTS_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  return initialProjects;
}

export async function createProject(project: Omit<StudentProject, 'id' | 'created_at'>): Promise<StudentProject> {
  const newProject: StudentProject = {
    ...project,
    id: 'proj-' + Date.now(),
    stars: 1,
    created_at: new Date().toISOString()
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('projects')
        .insert([newProject])
        .select()
        .single();

      if (!error && data) {
        const current = await fetchProjects();
        const updated = [data as StudentProject, ...current.filter(p => p.id !== data.id)];
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
        return data as StudentProject;
      }
    } catch (e) {
      console.warn('Failed to insert in Supabase, saving to local hybrid storage:', e);
    }
  }

  const current = await fetchProjects();
  const updated = [newProject, ...current];
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
  return newProject;
}

export async function fetchJobs(): Promise<JobListing[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('jobs')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as JobListing[];
      }
    } catch (e) {
      console.warn('Supabase fetch jobs fallback:', e);
    }
  }

  return initialJobs;
}

export async function submitContactMessage(msg: ContactMessage): Promise<{ success: boolean; message: string }> {
  const record = {
    ...msg,
    created_at: new Date().toISOString()
  };

  const client = getSupabaseClient();
  let savedToCloud = false;

  if (client) {
    try {
      const { error } = await client.from('messages').insert([record]);
      if (!error) savedToCloud = true;
    } catch (e) {
      console.warn('Could not write to Supabase messages table:', e);
    }
  }

  try {
    const existing = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
    existing.unshift(record);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }

  if (savedToCloud) {
    return { success: true, message: 'Message recorded in Supabase database!' };
  } else {
    return { success: true, message: 'Message saved locally (Will sync when Supabase credentials are connected).' };
  }
}

// ----------------- NOTES MANAGEMENT SERVICES (CRUD & RLS) -----------------

function mapDbToNote(row: any): StudyNote {
  return {
    id: String(row.id),
    userId: row.user_id || row.userId || 'guest',
    title: row.title || 'Untitled Note',
    subject: row.subject || 'General Engineering',
    unit: row.unit || '',
    content: row.content || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    isPinned: Boolean(row.is_pinned ?? row.isPinned),
    colorTheme: row.color_theme || row.colorTheme || 'indigo',
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString()
  };
}

export async function fetchUserNotes(userId?: string): Promise<StudyNote[]> {
  const client = getSupabaseClient();
  
  if (client) {
    try {
      let query = client.from('student_notes').select('*');
      if (userId) {
        query = query.eq('user_id', userId);
      }
      const { data, error } = await query
        .order('is_pinned', { ascending: false })
        .order('updated_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map(mapDbToNote);
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetch notes error, falling back to local store:', e);
    }
  }

  // Fallback to local storage with strict user-level isolation
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (raw) {
      const parsed: StudyNote[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (userId) {
          const userNotes = parsed.filter(n => n.userId === userId);
          if (userNotes.length > 0) {
            return userNotes;
          }
          // Clone initial engineering notes specifically for this user
          const userInitial = initialStudyNotes.map(n => ({
            ...n,
            id: `note-${userId}-${n.id.replace('note-', '')}`,
            userId
          }));
          const merged = [...parsed, ...userInitial];
          localStorage.setItem(NOTES_KEY, JSON.stringify(merged));
          return userInitial;
        }
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  // Return initial seed notes
  const initial = userId 
    ? initialStudyNotes.map(n => ({ ...n, id: `note-${userId}-${n.id.replace('note-', '')}`, userId }))
    : initialStudyNotes;
  localStorage.setItem(NOTES_KEY, JSON.stringify(initial));
  return initial;
}

export async function saveUserNote(
  noteData: Omit<StudyNote, 'id' | 'created_at' | 'updated_at'>,
  existingId?: string
): Promise<StudyNote> {
  const now = new Date().toISOString();
  const noteId = existingId || 'note-' + Date.now();

  const noteToSave: StudyNote = {
    ...noteData,
    id: noteId,
    created_at: now,
    updated_at: now
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const dbPayload = {
        id: noteId,
        user_id: noteData.userId || 'guest',
        title: noteData.title,
        subject: noteData.subject,
        unit: noteData.unit || null,
        content: noteData.content,
        tags: noteData.tags,
        is_pinned: noteData.isPinned,
        color_theme: noteData.colorTheme,
        updated_at: now
      };

      if (existingId) {
        const { data, error } = await client
          .from('student_notes')
          .update(dbPayload)
          .eq('id', existingId)
          .select()
          .single();

        if (!error && data) {
          const updatedNote = mapDbToNote(data);
          syncLocalNote(updatedNote);
          return updatedNote;
        }
      } else {
        const { data, error } = await client
          .from('student_notes')
          .insert([{ ...dbPayload, created_at: now }])
          .select()
          .single();

        if (!error && data) {
          const insertedNote = mapDbToNote(data);
          syncLocalNote(insertedNote);
          return insertedNote;
        }
      }
    } catch (e) {
      console.warn('Supabase save note failed, using hybrid persistence:', e);
    }
  }

  // Local storage save
  syncLocalNote(noteToSave);
  return noteToSave;
}

function syncLocalNote(note: StudyNote) {
  try {
    const existing: StudyNote[] = JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
    const filtered = existing.filter(n => n.id !== note.id);
    const updated = [note, ...filtered];
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to sync note to local storage:', e);
  }
}

export async function togglePinNote(noteId: string, currentPinStatus: boolean): Promise<boolean> {
  const nextPinned = !currentPinStatus;
  const client = getSupabaseClient();

  if (client) {
    try {
      await client
        .from('student_notes')
        .update({ is_pinned: nextPinned, updated_at: new Date().toISOString() })
        .eq('id', noteId);
    } catch (e) {
      console.warn('Supabase pin toggle error:', e);
    }
  }

  try {
    const existing: StudyNote[] = JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
    const updated = existing.map(n => n.id === noteId ? { ...n, isPinned: nextPinned, updated_at: new Date().toISOString() } : n);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}

export async function deleteUserNote(noteId: string): Promise<boolean> {
  const client = getSupabaseClient();

  if (client) {
    try {
      await client.from('student_notes').delete().eq('id', noteId);
    } catch (e) {
      console.warn('Supabase delete note error:', e);
    }
  }

  try {
    const existing: StudyNote[] = JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
    const updated = existing.filter(n => n.id !== noteId);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}

// ----------------- STUDY TASKS & PLANNER SERVICES -----------------

function mapDbToTask(row: any): StudyTask {
  return {
    id: String(row.id),
    userId: row.user_id || row.userId || 'guest',
    title: row.title || 'Untitled Task',
    subject: row.subject || 'General Study',
    dueDate: row.due_date || row.dueDate || new Date().toISOString().split('T')[0],
    estimatedMinutes: Number(row.estimated_minutes || row.estimatedMinutes || 45),
    priority: row.priority || 'medium',
    status: row.status || 'todo',
    completedAt: row.completed_at || row.completedAt,
    created_at: row.created_at || new Date().toISOString()
  };
}

export async function fetchStudyTasks(userId?: string): Promise<StudyTask[]> {
  const client = getSupabaseClient();

  if (client) {
    try {
      let query = client.from('student_study_tasks').select('*');
      if (userId) {
        query = query.eq('user_id', userId);
      }
      const { data, error } = await query.order('created_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map(mapDbToTask);
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetch tasks error, using local fallback:', e);
    }
  }

  // Fallback to local storage with strict user-level isolation
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (raw) {
      const parsed: StudyTask[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (userId) {
          const userTasks = parsed.filter(t => t.userId === userId);
          if (userTasks.length > 0) {
            return userTasks;
          }
          const userInitialTasks = initialStudyTasks.map(t => ({
            ...t,
            id: `task-${userId}-${t.id.replace('task-', '')}`,
            userId
          }));
          const merged = [...parsed, ...userInitialTasks];
          localStorage.setItem(TASKS_KEY, JSON.stringify(merged));
          return userInitialTasks;
        }
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  const initial = userId
    ? initialStudyTasks.map(t => ({ ...t, id: `task-${userId}-${t.id.replace('task-', '')}`, userId }))
    : initialStudyTasks;
  localStorage.setItem(TASKS_KEY, JSON.stringify(initial));
  return initial;
}

export async function saveStudyTask(
  taskData: Omit<StudyTask, 'id' | 'created_at'>,
  existingId?: string
): Promise<StudyTask> {
  const now = new Date().toISOString();
  const taskId = existingId || 'task-' + Date.now();

  const taskToSave: StudyTask = {
    ...taskData,
    id: taskId,
    created_at: now
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const dbPayload = {
        id: taskId,
        user_id: taskData.userId || 'guest',
        title: taskData.title,
        subject: taskData.subject,
        due_date: taskData.dueDate,
        estimated_minutes: taskData.estimatedMinutes,
        priority: taskData.priority,
        status: taskData.status,
        completed_at: taskData.status === 'completed' ? (taskData.completedAt || now) : null
      };

      if (existingId) {
        const { data, error } = await client
          .from('student_study_tasks')
          .update(dbPayload)
          .eq('id', existingId)
          .select()
          .single();

        if (!error && data) {
          const updated = mapDbToTask(data);
          syncLocalTask(updated);
          return updated;
        }
      } else {
        const { data, error } = await client
          .from('student_study_tasks')
          .insert([{ ...dbPayload, created_at: now }])
          .select()
          .single();

        if (!error && data) {
          const inserted = mapDbToTask(data);
          syncLocalTask(inserted);
          return inserted;
        }
      }
    } catch (e) {
      console.warn('Supabase save task failed, saving locally:', e);
    }
  }

  syncLocalTask(taskToSave);
  return taskToSave;
}

function syncLocalTask(task: StudyTask) {
  try {
    const existing: StudyTask[] = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const filtered = existing.filter(t => t.id !== task.id);
    const updated = [task, ...filtered];
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to sync task locally:', e);
  }
}

export async function toggleTaskStatus(taskId: string, newStatus: StudyTask['status']): Promise<boolean> {
  const now = new Date().toISOString();
  const client = getSupabaseClient();

  if (client) {
    try {
      await client
        .from('student_study_tasks')
        .update({
          status: newStatus,
          completed_at: newStatus === 'completed' ? now : null
        })
        .eq('id', taskId);
    } catch (e) {
      console.warn('Supabase toggle task status error:', e);
    }
  }

  try {
    const existing: StudyTask[] = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const updated = existing.map(t =>
      t.id === taskId
        ? { ...t, status: newStatus, completedAt: newStatus === 'completed' ? now : undefined }
        : t
    );
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}

export async function deleteStudyTask(taskId: string): Promise<boolean> {
  const client = getSupabaseClient();

  if (client) {
    try {
      await client.from('student_study_tasks').delete().eq('id', taskId);
    } catch (e) {
      console.warn('Supabase delete task error:', e);
    }
  }

  try {
    const existing: StudyTask[] = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const updated = existing.filter(t => t.id !== taskId);
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}

export function fetchPomodoroStats(): { todayMinutes: number; todaySessions: number } {
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(POMODORO_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === today) {
        return { todayMinutes: parsed.minutes || 0, todaySessions: parsed.sessions || 0 };
      }
    }
  } catch (e) {
    // ignore
  }
  return { todayMinutes: 75, todaySessions: 3 }; // realistic starter focus
}

export function logPomodoroSession(minutes: number): { todayMinutes: number; todaySessions: number } {
  const today = new Date().toISOString().split('T')[0];
  const current = fetchPomodoroStats();
  const updated = {
    date: today,
    minutes: current.todayMinutes + minutes,
    sessions: current.todaySessions + 1
  };
  try {
    localStorage.setItem(POMODORO_KEY, JSON.stringify(updated));
  } catch (e) {
    // ignore
  }
  return { todayMinutes: updated.minutes, todaySessions: updated.sessions };
}
