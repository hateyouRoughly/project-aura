'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ChatMessage, { Message } from '@/components/ChatMessage';

interface Job {
  _id: string;
  userGoal: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
}

type Step = { id: string; description: string; status: 'pending' | 'completed' };

export default function DashboardPage() {
  const { session, loading, signOut, getToken } = useAuth();
  const router = useRouter();
  
  const [steps, setSteps] = useState<Step[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [jobHistory, setJobHistory] = useState<Job[]>([]);

  const fetchJobHistory = useCallback(async () => {
    const token = await getToken();
    if (!token) return;
    const response = await fetch('/api/tasks', { headers: { 'Authorization': `Bearer ${token}` } });
    if (response.ok) setJobHistory(await response.json());
  }, [getToken]);

  useEffect(() => {
    if (!loading && !session) router.push('/login');
    if (session) fetchJobHistory();
  }, [session, loading, router, fetchJobHistory]);

  useEffect(() => {
    if (!currentJobId) return;
    const connectSocket = async () => {
      await fetch('/api/socket');
      const ws = new WebSocket(`ws://${window.location.host}`);
      ws.onopen = () => {
        setMessages(prev => [...prev, { type: 'log', content: 'Connection established. Subscribing...' }]);
        ws.send(JSON.stringify({ action: 'subscribe', jobId: currentJobId }));
      };
      ws.onmessage = (event) => {
        try {
          setMessages(prev => [...prev, JSON.parse(event.data)]);
        } catch (e) {
          setMessages(prev => [...prev, { type: 'log', content: event.data }]);
        }
      };
      ws.onerror = () => setMessages(prev => [...prev, { type: 'error', content: 'WebSocket connection error.' }]);
      ws.onclose = () => {
        setMessages(prev => [...prev, { type: 'log', content: 'Connection closed.' }]);
        fetchJobHistory();
      };
      return () => ws.close();
    };
    connectSocket();
  }, [currentJobId, fetchJobHistory]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !session) return;

    const userMessage: Message = { type: 'log', content: `You: ${chatInput}` };
    setMessages(prev => [...prev, userMessage]);

    // If a job is already running, this is a follow-up message
    if (currentJobId) {
      setMessages(prev => [...prev, { type: 'log', content: "Follow-up logic not yet implemented." }]);
      setChatInput('');
      return;
    }

    // The user's raw input is the goal.
    const goal = chatInput;
    // The AI will determine the starting URL. We can use a placeholder or a generic start page.
    const url = 'https://google.com'; // Placeholder URL
    setChatInput('');

    const token = await getToken();
    if (!token) return;

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ goal, url }),
    });

    if (response.ok) {
      const job = await response.json();
      setCurrentJobId(job.id);
    } else {
      const errorData = await response.json();
      setMessages(prev => [...prev, { type: 'error', content: `Failed to start job: ${errorData.message || 'Unknown error'}` }]);
    }
  };

  if (loading || !session) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <aside className="w-1/4 bg-gray-800 p-4 overflow-y-auto flex flex-col">
        <h2 className="text-xl font-bold mb-4 flex-shrink-0">Job History</h2>
        <ul className="flex-grow overflow-y-auto">
          {jobHistory.map((job) => (
            <li key={job._id} className="mb-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer">
              <p className="font-semibold truncate">{job.userGoal}</p>
              <p className={`text-sm ${job.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>{job.status}</p>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 flex flex-col p-4 h-screen">
        <header className="flex justify-between items-center mb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold">Aura Co-Pilot</h1>
          <button onClick={signOut} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            Sign Out
          </button>
        </header>
        <div ref={chatContainerRef} className="flex-1 bg-black/30 rounded-lg p-4 overflow-y-auto mb-4">
          {messages.length === 0 && <div className="text-center text-gray-400">Start by typing a command below...</div>}
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>
        <div className="flex-shrink-0 flex">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="w-full bg-gray-700 border-gray-600 rounded-l-lg px-4 py-3 focus:outline-none"
            placeholder="Enter your goal, including a URL... (e.g., 'Log in to twitter.com as...')"
          />
          <button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-r-lg">
            Send
          </button>
        </div>
      </main>

      <aside className="w-1/4 bg-gray-800 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Steps</h2>
        <div className="flex-grow overflow-y-auto">
          {steps.length === 0 ? (
            <p className="text-gray-400 text-sm">AI-generated steps will appear here once a job is running.</p>
          ) : (
            <ul>
              {steps.map((step) => (
                <li key={step.id} className="text-sm mb-2">{step.description}</li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
