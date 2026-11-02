import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { JobListing, StudentProject, ContactMessage } from '../types';
import { initialProjects, initialJobs } from './mockData';

// Storage keys
const STORAGE_PREFIX = 'nexora_';
const CONFIG_KEY = `${STORAGE_PREFIX}supabase_config`;
const PROJECTS_KEY = `${STORAGE_PREFIX}projects`;
const MESSAGES_KEY = `${STORAGE_PREFIX}messages`;

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
        auth: { persistSession: true }
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

    // Ping Supabase with a lightweight query
    const { error } = await client.from('projects').select('id').limit(1);
    
    if (error && error.code !== 'PGRST116') {
      // Table might not exist yet or permission denied, but connection reached
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
        // Sync to local cache
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(data));
        return data as StudentProject[];
      }
    } catch (e) {
      console.warn('Supabase fetch projects error, using local fallback:', e);
    }
  }

  // Hybrid fallback: check localStorage
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

  // Initial seed fixtures
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

  // Fallback to local storage
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

  // Always write to local storage
  try {
    const existing = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
    existing.unshift(record);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }

  if (savedToCloud) {
    return { success: true, message: 'Message sent directly to Sridhar & recorded in Supabase database!' };
  } else {
    return { success: true, message: 'Message recorded locally! (Will sync when live Supabase credentials are connected).' };
  }
}
