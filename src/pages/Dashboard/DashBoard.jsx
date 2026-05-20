import { useState } from 'react';
import { Link } from 'react-router';
import {
  PenLine, FileText, Smile, LogOut, Plus,
  MoreHorizontal, Download, Trash2, Edit3,
  TrendingUp, BookOpen, Calendar
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import { useAuth } from '../../Auth/AuthContext';
import { useNavigate } from 'react-router';

// Mock data — Firebase connect করার পর replace হবে
const mockEntries = [
  { id: 1, title: "Morning Reflections", content: "Today I woke up feeling grateful for the small things in life...", mood: "😊", date: "2025-05-20", tags: ["morning", "gratitude"] },
  { id: 2, title: "Project Ideas", content: "I've been thinking about building a new side project that combines...", mood: "🤔", date: "2025-05-19", tags: ["work", "ideas"] },
  { id: 3, title: "Evening Walk", content: "Took a long walk today and cleared my head. Sometimes the best...", mood: "😌", date: "2025-05-18", tags: ["personal", "peace"] },
  { id: 4, title: "Frustrating Day", content: "Nothing went according to plan today. But I learned that...", mood: "😤", date: "2025-05-17", tags: ["work", "lessons"] },
  { id: 5, title: "Weekend Plans", content: "Planning to visit family this weekend. It's been a while since...", mood: "😄", date: "2025-05-16", tags: ["family", "weekend"] },
];

const moodStats = [
  { mood: "😊", label: "Happy", count: 8 },
  { mood: "😌", label: "Calm", count: 5 },
  { mood: "🤔", label: "Thoughtful", count: 6 },
  { mood: "😤", label: "Frustrated", count: 2 },
  { mood: "😄", label: "Excited", count: 4 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const firstName = user?.displayName?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#84e7c4] via-[#b8d4e8] to-[#B5C6E0]">

      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            <Link to="/" className="text-sm font-medium tracking-widest uppercase text-[#1a5a40]">
              ThinkFlow
            </Link>

            <div className="flex items-center gap-3">
              {/* User avatar + name */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#6f7bf7] flex items-center justify-center text-white text-sm font-bold">
                  {user?.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-[#0f3d2b]">{user?.displayName}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-[#2a4a3a] opacity-60 hover:opacity-100 hover:text-red-500 transition-all"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl text-[#0f3d2b]">
            <span className="font-sans font-bold">Hey, </span>
            <span className="font-serif font-bold italic">{firstName} 👋</span>
          </h1>
          <p className="text-sm text-[#2a4a3a] opacity-70 mt-1">
            What's on your mind today?
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <BookOpen size={18} />, label: 'Total Entries', value: mockEntries.length },
            { icon: <Calendar size={18} />, label: 'This Month', value: 12 },
            { icon: <TrendingUp size={18} />, label: 'Day Streak', value: 5 },
          ].map((stat, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-4 text-center">
              <div className="flex justify-center text-[#6f7bf7] mb-2">{stat.icon}</div>
              <div className="text-xl font-bold font-sans text-[#0f3d2b]">{stat.value}</div>
              <div className="text-xs text-[#2a4a3a] opacity-60 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Entries list — takes 2/3 */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans font-bold text-[#0f3d2b] text-lg">My Thoughts</h2>
              <Link
                to="/dashboard/new"
                className="btn btn-sm bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] gap-1.5 shadow-md shadow-[#6f7bf7]/30"
              >
                <Plus size={15} /> New Thought
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {mockEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-5 hover:bg-white/70 hover:shadow-md hover:shadow-[#6f7bf7]/10 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-2xl mt-0.5 shrink-0">{entry.mood}</span>
                      <div className="min-w-0">
                        <h3 className="font-sans font-bold text-[#0f3d2b] text-sm truncate">
                          {entry.title}
                        </h3>
                        <p className="text-xs text-[#2a4a3a] opacity-60 mt-1 line-clamp-2 leading-relaxed">
                          {entry.content}
                        </p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {entry.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-[#6f7bf7]/10 text-[#6f7bf7] px-2 py-0.5 rounded-full">
                              #{tag}
                            </span>
                          ))}
                          <span className="text-xs text-[#2a4a3a] opacity-40 ml-auto">{entry.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action menu */}
                    <div className="relative shrink-0">
                      <button
                        onClick={() => setActiveMenu(activeMenu === entry.id ? null : entry.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/60 text-[#2a4a3a] transition-all"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {activeMenu === entry.id && (
                        <div className="absolute right-0 top-8 bg-white/90 backdrop-blur-sm border border-white/80 rounded-xl shadow-lg p-1 z-10 w-36">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#0f3d2b] hover:bg-[#6f7bf7]/10 rounded-lg transition-colors">
                            <Edit3 size={13} /> Edit
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#0f3d2b] hover:bg-[#6f7bf7]/10 rounded-lg transition-colors">
                            <Download size={13} /> Download PDF
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar — 1/3 */}
          <div className="flex flex-col gap-5">

            {/* New thought CTA */}
            <div className="bg-[#0f3d2b] rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#6f7bf7]/20 rounded-full blur-2xl" />
              <PenLine size={24} className="text-[#84e7c4] mb-3 relative z-10" />
              <h3 className="font-sans font-bold text-white text-base mb-1 relative z-10">
                Write a Thought
              </h3>
              <p className="text-white/60 text-xs mb-4 relative z-10 leading-relaxed">
                Capture what's on your mind right now.
              </p>
              <Link
                to="/dashboard/new"
                className="btn btn-sm bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] gap-1.5 relative z-10"
              >
                <Plus size={14} /> Start Writing
              </Link>
            </div>

            {/* Mood stats */}
            <div className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Smile size={16} className="text-[#6f7bf7]" />
                <h3 className="font-sans font-bold text-[#0f3d2b] text-sm">Mood Overview</h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {moodStats.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-lg w-6 text-center">{m.mood}</span>
                    <div className="flex-1 bg-[#0f3d2b]/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-[#6f7bf7] rounded-full"
                        style={{ width: `${(m.count / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#2a4a3a] opacity-50 w-4 text-right">{m.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF export hint */}
            <div className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-[#6f7bf7]" />
                <h3 className="font-sans font-bold text-[#0f3d2b] text-sm">PDF Export</h3>
              </div>
              <p className="text-xs text-[#2a4a3a] opacity-60 leading-relaxed mb-3">
                Download any thought as a beautifully formatted PDF report.
              </p>
              <button className="btn btn-sm w-full bg-white/60 border border-white/80 text-[#0f3d2b] hover:bg-white/80 gap-1.5 text-xs">
                <Download size={13} /> Export All
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}