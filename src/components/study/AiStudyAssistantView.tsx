import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Code2, 
  BookOpen, 
  HelpCircle, 
  Zap, 
  Send, 
  Check, 
  Copy, 
  BookmarkPlus, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Layers, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { AiQuizQuestion, AiStudyInteraction, UserProfile } from '../../types';
import { saveUserNote } from '../../lib/supabase';

interface AiStudyAssistantViewProps {
  user: UserProfile | null;
  onNavigateToNotes?: () => void;
}

type StudyMode = 'concept' | 'code' | 'quiz' | 'formula';

const PROMPT_SUGGESTIONS: Record<StudyMode, { title: string; prompt: string; subject: string }[]> = {
  concept: [
    { title: 'Virtual Memory Paging', prompt: 'Explain Virtual Memory, Paging, and Page Faults using an everyday library analogy.', subject: 'Operating Systems' },
    { title: 'B-Trees vs B+ Trees', prompt: 'Why do databases like MySQL and PostgreSQL use B+ Trees instead of B-Trees or Binary Search Trees for indexes?', subject: 'Database Systems (DBMS)' },
    { title: 'CAP Theorem', prompt: 'Break down the CAP Theorem (Consistency, Availability, Partition Tolerance) with real-world examples (Cassandra vs MongoDB).', subject: 'System Design' },
    { title: 'Dijkstra vs Bellman-Ford', prompt: 'Compare Dijkstra algorithm and Bellman-Ford algorithm. Why does Dijkstra fail on negative weight cycles?', subject: 'Data Structures & Algos' }
  ],
  code: [
    { title: 'Two Sum (Hash Map)', prompt: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []', subject: 'Data Structures & Algos' },
    { title: 'Binary Search (Iterative)', prompt: 'int binarySearch(int arr[], int n, int target) {\n    int left = 0, right = n - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}', subject: 'Data Structures & Algos' },
    { title: 'Debounce in JavaScript', prompt: 'function debounce(fn, delay) {\n    let timer;\n    return function(...args) {\n        clearTimeout(timer);\n        timer = setTimeout(() => fn.apply(this, args), delay);\n    };\n}', subject: 'Full Stack Web Dev' }
  ],
  quiz: [
    { title: 'Operating Systems Concurrency', prompt: 'Generate 3 exam-level MCQs on Mutex, Semaphores, and Deadlock Coffman conditions.', subject: 'Operating Systems' },
    { title: 'Relational Database SQL', prompt: 'Generate 3 tricky MCQs on SQL Joins (LEFT vs INNER), Indexes, and ACID transactions.', subject: 'Database Systems (DBMS)' },
    { title: 'Computer Networks TCP/IP', prompt: 'Generate 3 MCQs on TCP 3-Way Handshake, UDP vs TCP, and DNS resolution.', subject: 'Computer Networks' }
  ],
  formula: [
    { title: 'Master Theorem Cheat Sheet', prompt: 'Summarize the 3 cases of the Master Theorem with Big-O notations and textbook examples.', subject: 'Data Structures & Algos' },
    { title: 'Database Normalization Rules', prompt: 'List crisp definitions, dependency rules, and violations for 1NF, 2NF, 3NF, and BCNF.', subject: 'Database Systems (DBMS)' },
    { title: 'Process Scheduling Formulas', prompt: 'Provide formulas for Turnaround Time, Waiting Time, and Response Time with FCFS, SJF, and Round Robin.', subject: 'Operating Systems' }
  ]
};

// Built-in High Precision Student Knowledge Matrix
const MOCK_KNOWLEDGE_BASE: Record<string, { response: string; quiz?: AiQuizQuestion[] }> = {
  'virtual memory': {
    response: `### 🧠 Virtual Memory & Paging: The Library Analogy

Imagine you are studying in a library with a **small desk** (Physical RAM, say 8 GB) but you have access to a **massive warehouse of books** (Hard Drive / SSD, say 512 GB).

#### 1. Why do we need Virtual Memory?
- Your program might require 16 GB, but your physical RAM is only 8 GB.
- Virtual memory gives each process the illusion of having a continuous, private, address space from \`0\` to \`2^64 - 1\`.

#### 2. Key Components:
- **Pages**: Fixed-size blocks of virtual memory (typically 4 KB).
- **Page Frames**: Corresponding fixed-size slots in Physical RAM.
- **Page Table**: The library index card catalog that maps Virtual Page Numbers (VPN) to Physical Frame Numbers (PFN).
- **MMU (Memory Management Unit)**: Hardware chip in the CPU that translates addresses in nanoseconds.

#### 3. What is a Page Fault?
When the CPU tries to read an address on Page #7, and the Page Table marks its **Valid bit = 0** (meaning it's not currently sitting on your desk), a **Page Fault Exception** is triggered:
1. CPU traps to the OS kernel.
2. OS pauses the process.
3. OS locates Page #7 on disk swap space.
4. OS finds a free RAM frame (or evicts an existing page using **LRU - Least Recently Used**).
5. OS transfers the 4 KB page into RAM.
6. OS updates the Page Table (Valid bit = 1).
7. CPU resumes the instruction as if nothing happened!

> **Exam Tip**: Excessive page faults cause **Thrashing**, where the OS spends 90%+ of its CPU cycles swapping pages between disk and RAM rather than executing user code.`
  },
  'two sum': {
    response: `### 💻 Two Sum Algorithm Deep Dive

\`\`\`python
def two_sum(nums, target):
    seen = {} # Maps value -> index
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
\`\`\`

#### 1. Complexity Analysis:
- **Time Complexity**: $\\mathcal{O}(N)$ — We traverse the array exactly once. Hash table lookups (\`diff in seen\`) take $\\mathcal{O}(1)$ average time.
- **Space Complexity**: $\\mathcal{O}(N)$ — In the worst case (when the two target numbers are the last elements), the dictionary stores up to $N$ entries.

#### 2. Key Insights & Edge Cases:
- **Single Pass vs Two Pass**: A single pass avoids duplicate indexing without needing to check \`seen[diff] != i\`.
- **Duplicate Elements**: If \`nums = [3, 3]\` and \`target = 6\`, when the loop is at the second 3, the first 3 is already stored in \`seen\`, returning \`[0, 1]\` correctly.
- **No Solution**: Returns \`[]\` safely instead of raising a \`KeyError\`.`
  },
  'quiz': {
    response: `Here are 3 exam-tested MCQs to test your grasp on Concurrency & Synchronization:`,
    quiz: [
      {
        question: 'Which of the following is NOT one of the 4 Coffman conditions required for a Deadlock to occur?',
        options: [
          'Mutual Exclusion',
          'Hold and Wait',
          'Preemptive Resource Scheduling',
          'Circular Wait'
        ],
        correctIndex: 2,
        explanation: 'Deadlock requires NO Preemption (resources cannot be forcibly taken). Preemptive scheduling actually prevents or breaks deadlocks.'
      },
      {
        question: 'What is the fundamental difference between a Binary Semaphore and a Mutex Lock?',
        options: [
          'A Mutex has an ownership concept (only the locking thread can unlock it), while a Semaphore can be signaled by any thread.',
          'Semaphores only work on multi-core processors.',
          'Mutex locks can count up to infinity.',
          'Binary semaphores are slower than spinlocks.'
        ],
        correctIndex: 0,
        explanation: 'Ownership is the key distinction: a Mutex is strictly owned by the thread that acquired it. A semaphore is a signaling mechanism where Thread A can wait and Thread B can signal.'
      },
      {
        question: 'In the Banker\'s Algorithm for Deadlock Avoidance, a state is considered "Safe" if:',
        options: [
          'There are zero processes waiting for resources.',
          'There exists at least one sequence of process execution that allows all processes to finish without deadlock.',
          'All available resources exceed total system requests.',
          'The CPU utilization is above 95%.'
        ],
        correctIndex: 1,
        explanation: 'A safe state guarantees that a "Safe Sequence" exists where every process can acquire its maximum need, finish execution, and release all resources.'
      }
    ]
  }
};

export const AiStudyAssistantView: React.FC<AiStudyAssistantViewProps> = ({ user, onNavigateToNotes }) => {
  const [activeMode, setActiveMode] = useState<StudyMode>('concept');
  const [promptInput, setPromptInput] = useState('');
  const [depthOption, setDepthOption] = useState<'analogy' | 'exam' | 'deep'>('analogy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResult, setCurrentResult] = useState<AiStudyInteraction | null>(null);
  const [history, setHistory] = useState<AiStudyInteraction[]>([]);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [savedNoteFeedback, setSavedNoteFeedback] = useState(false);
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  const handleSelectSuggestion = (s: { prompt: string }) => {
    setPromptInput(s.prompt);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setSavedNoteFeedback(false);
    setCopiedFeedback(false);

    // Realistic synthesis delay
    setTimeout(() => {
      const lower = promptInput.toLowerCase();
      let matchedData = MOCK_KNOWLEDGE_BASE['virtual memory'];

      if (activeMode === 'quiz' || lower.includes('quiz') || lower.includes('mcq')) {
        matchedData = MOCK_KNOWLEDGE_BASE['quiz'];
      } else if (activeMode === 'code' || lower.includes('code') || lower.includes('def') || lower.includes('int ')) {
        matchedData = MOCK_KNOWLEDGE_BASE['two sum'];
      } else {
        // High quality general response
        matchedData = {
          response: `### 🎓 Deep Dive: ${promptInput.trim()}

#### 1. Core Overview
Understanding **${promptInput.trim()}** requires isolating the foundational principles and looking at how hardware and operating systems negotiate resources:

- **Key Objective**: Maximize throughput, minimize latency, and prevent race conditions or memory leaks.
- **Real-World Application**: Used extensively in distributed architectures, database engines, and modern browser engines (V8, Chromium).

#### 2. Key Architecture & Mechanisms:
1. **Abstraction Layer**: Decouples physical hardware constraints from logical execution threads.
2. **Deterministic Guarantees**: Ensures thread safety and strict serialization orders where required.
3. **Corner Cases**: Watch out for boundary conditions, buffer overflow traps, and thread starvation under heavy lock contention.

\`\`\`typescript
// Concept Implementation Pattern
interface SystemProtocol {
  id: string;
  timestamp: number;
  execute(): Promise<void>;
}
\`\`\`

> **Exam Checklist**: Always remember to state both Time Complexity $\\mathcal{O}(N)$ and Space Complexity $\\mathcal{O}(1)$ during campus technical interviews!`
        };
      }

      const interaction: AiStudyInteraction = {
        id: 'ai-' + Date.now(),
        mode: activeMode,
        prompt: promptInput.trim(),
        response: matchedData.response,
        quiz: matchedData.quiz,
        created_at: new Date().toISOString()
      };

      setCurrentResult(interaction);
      setHistory(prev => [interaction, ...prev.slice(0, 4)]);
      setIsGenerating(false);
    }, 750);
  };

  const handleAnswerOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSaveToNotes = async () => {
    if (!currentResult) return;
    try {
      await saveUserNote({
        userId: user?.id || 'guest',
        title: `AI Revision: ${currentResult.prompt.slice(0, 50)}...`,
        subject: activeMode === 'code' ? 'Data Structures & Algos' : 'Operating Systems',
        unit: 'AI Generated Revision',
        content: currentResult.response,
        tags: ['AI Tutor', activeMode.toUpperCase(), 'Revision'],
        isPinned: false,
        colorTheme: activeMode === 'code' ? 'blue' : 'purple'
      });
      setSavedNoteFeedback(true);
      setTimeout(() => setSavedNoteFeedback(false), 3000);
    } catch (e) {
      console.error('Failed to save note:', e);
    }
  };

  const handleCopy = () => {
    if (!currentResult) return;
    navigator.clipboard.writeText(currentResult.response);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  // Calculate Quiz Score
  const calculateScore = () => {
    if (!currentResult?.quiz) return { correct: 0, total: 0 };
    let correct = 0;
    currentResult.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) correct++;
    });
    return { correct, total: currentResult.quiz.length };
  };

  return (
    <div className="space-y-7 py-2 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950/60 to-slate-900 p-6 sm:p-8 border border-violet-900/40 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold border border-violet-500/20">
              <Bot className="w-3.5 h-3.5 text-violet-400" />
              AI Study Companion & Tutor
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Master Tough Concepts & Code in Seconds ⚡
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Ask for intuitive analogies, analyze algorithm code complexity, generate interactive practice quizzes, and save directly to your Notes Hub.
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button
            onClick={() => setActiveMode('concept')}
            className={`p-3 rounded-2xl flex items-center gap-2.5 font-bold transition-all cursor-pointer ${
              activeMode === 'concept'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Concept Explainer</span>
          </button>

          <button
            onClick={() => setActiveMode('code')}
            className={`p-3 rounded-2xl flex items-center gap-2.5 font-bold transition-all cursor-pointer ${
              activeMode === 'code'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Code & Complexity</span>
          </button>

          <button
            onClick={() => setActiveMode('quiz')}
            className={`p-3 rounded-2xl flex items-center gap-2.5 font-bold transition-all cursor-pointer ${
              activeMode === 'quiz'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Practice Quiz</span>
          </button>

          <button
            onClick={() => setActiveMode('formula')}
            className={`p-3 rounded-2xl flex items-center gap-2.5 font-bold transition-all cursor-pointer ${
              activeMode === 'formula'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Formula Sheet</span>
          </button>
        </div>
      </div>

      {/* Main Study Assistant Interaction Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Input Panel & Starter Pills (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              {activeMode === 'concept' && 'Ask Concept Question'}
              {activeMode === 'code' && 'Paste Code Snippet'}
              {activeMode === 'quiz' && 'Topic for Quiz Generation'}
              {activeMode === 'formula' && 'Subject Formula Target'}
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <textarea
                rows={activeMode === 'code' ? 8 : 4}
                required
                placeholder={
                  activeMode === 'concept'
                    ? 'e.g. Explain Virtual Memory & Page Faults with an analogy...'
                    : activeMode === 'code'
                    ? 'Paste your Python, C++, Java or JavaScript code here...'
                    : activeMode === 'quiz'
                    ? 'e.g. Concurrency, Mutex, Semaphores & Deadlock Coffman conditions'
                    : 'e.g. Master Theorem recurrence formulas & Big-O rules'
                }
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 placeholder-slate-400 p-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-violet-500 font-mono text-xs leading-relaxed"
              />

              {/* Depth Selector for Concept */}
              {activeMode === 'concept' && (
                <div className="flex items-center justify-between text-xs bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-medium pl-2">Detail Level:</span>
                  <div className="flex items-center gap-1 font-semibold">
                    <button
                      type="button"
                      onClick={() => setDepthOption('analogy')}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        depthOption === 'analogy' ? 'bg-violet-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Analogy (ELI5)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepthOption('exam')}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        depthOption === 'exam' ? 'bg-violet-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Exam Theory
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepthOption('deep')}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        depthOption === 'deep' ? 'bg-violet-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Deep Dive
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating || !promptInput.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Synthesizing Answer...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Explanation</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Starter Pills */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Suggested Exam Topics:
            </h4>

            <div className="space-y-2">
              {PROMPT_SUGGESTIONS[activeMode].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSuggestion(s)}
                  className="w-full text-left p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-violet-300 flex items-center justify-between">
                    <span>{s.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-400 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{s.subject}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Output & Interactive Quiz (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {!currentResult && !isGenerating && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                <Bot className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">AI Study Tutor is Ready</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  Select a suggested topic on the left or type your own engineering question to get structured explanations, code breakdowns, or an instant practice test.
                </p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 animate-pulse">
              <div className="h-6 w-1/3 bg-slate-800 rounded-lg"></div>
              <div className="space-y-2.5">
                <div className="h-4 w-full bg-slate-800/80 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-800/80 rounded"></div>
                <div className="h-4 w-4/6 bg-slate-800/80 rounded"></div>
              </div>
              <div className="h-32 bg-slate-950 rounded-2xl border border-slate-800"></div>
            </div>
          )}

          {currentResult && !isGenerating && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
              {/* Header Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase">
                    {currentResult.mode.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400">
                    Generated by Nexora AI
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedFeedback ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Text
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSaveToNotes}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                  >
                    {savedNoteFeedback ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" /> Saved to Notes!
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-3.5 h-3.5" /> Save as Note
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Response Markdown Viewer */}
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 font-sans whitespace-pre-line">
                {currentResult.response}
              </div>

              {/* Interactive Quiz Renderer */}
              {currentResult.quiz && currentResult.quiz.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-800 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-400" />
                      Interactive Practice Test ({currentResult.quiz.length} Questions)
                    </h4>

                    {quizSubmitted && (
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Score: {calculateScore().correct} / {calculateScore().total}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {currentResult.quiz.map((q, qIdx) => {
                      const selectedOption = quizAnswers[qIdx];
                      const isCorrect = selectedOption === q.correctIndex;

                      return (
                        <div key={qIdx} className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
                          <div className="text-xs sm:text-sm font-bold text-white">
                            {qIdx + 1}. {q.question}
                          </div>

                          <div className="space-y-2">
                            {q.options.map((opt, optIdx) => {
                              const isThisSelected = selectedOption === optIdx;
                              const isThisCorrect = q.correctIndex === optIdx;

                              let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                              if (quizSubmitted) {
                                if (isThisCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold';
                                else if (isThisSelected && !isThisCorrect) btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                              } else if (isThisSelected) {
                                btnStyle = 'bg-violet-600/30 border-violet-500 text-violet-200 font-bold';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => handleAnswerOption(qIdx, optIdx)}
                                  className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between gap-3 transition-colors cursor-pointer ${btnStyle}`}
                                >
                                  <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                                  {quizSubmitted && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                                  {quizSubmitted && isThisSelected && !isThisCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation */}
                          {quizSubmitted && (
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                              <strong className="text-indigo-400 font-semibold">Explanation: </strong>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      disabled={Object.keys(quizAnswers).length < currentResult.quiz.length}
                      className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-40"
                    >
                      Submit Quiz & Check Answers
                    </button>
                  ) : (
                    <button
                      onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                      className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake Practice Test
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
