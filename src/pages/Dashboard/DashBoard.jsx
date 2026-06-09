import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { PenLine, Flame, TrendingUp, Lightbulb, ChevronRight, BookOpen, Calendar } from 'lucide-react';
import { useAuth } from '../../Auth/AuthContext';
import DashboardNavbar from './DashboardNavbar';
import { db } from '../../Firebase/firebase.config';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import {
    AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const checkInItems = [
    {
        key: 'mood',
        label: 'Overall Mood',
        icon: '🌤',
        options: ['Very Low', 'Low', 'Okay', 'Good', 'Great'],
        colors: ['bg-red-100 text-red-600', 'bg-orange-100 text-orange-600', 'bg-yellow-100 text-yellow-700', 'bg-emerald-100 text-emerald-700', 'bg-green-100 text-green-700'],
    },
    {
        key: 'anxiety',
        label: 'Anxiety Level',
        icon: '💭',
        options: ['None', 'Mild', 'Moderate', 'High', 'Intense'],
        colors: ['bg-green-100 text-green-700', 'bg-emerald-100 text-emerald-700', 'bg-yellow-100 text-yellow-700', 'bg-orange-100 text-orange-600', 'bg-red-100 text-red-600'],
    },
    {
        key: 'stress',
        label: 'Stress Level',
        icon: '🧠',
        options: ['None', 'Mild', 'Moderate', 'High', 'Overwhelmed'],
        colors: ['bg-green-100 text-green-700', 'bg-emerald-100 text-emerald-700', 'bg-yellow-100 text-yellow-700', 'bg-orange-100 text-orange-600', 'bg-red-100 text-red-600'],
    },
    {
        key: 'sleep',
        label: 'Sleep Quality',
        icon: '🌙',
        options: ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'],
        colors: ['bg-red-100 text-red-600', 'bg-orange-100 text-orange-600', 'bg-yellow-100 text-yellow-700', 'bg-emerald-100 text-emerald-700', 'bg-green-100 text-green-700'],
    },
    {
        key: 'energy',
        label: 'Energy',
        icon: '⚡',
        options: ['Drained', 'Tired', 'Neutral', 'Energetic', 'Pumped'],
        colors: ['bg-red-100 text-red-600', 'bg-orange-100 text-orange-600', 'bg-yellow-100 text-yellow-700', 'bg-emerald-100 text-emerald-700', 'bg-green-100 text-green-700'],
    },
    {
        key: 'gratitude',
        label: 'Gratitude',
        icon: '💛',
        options: ['None', 'A little', 'Some', 'Grateful', 'Abundant'],
        colors: ['bg-gray-100 text-gray-500', 'bg-yellow-50 text-yellow-600', 'bg-yellow-100 text-yellow-700', 'bg-amber-100 text-amber-700', 'bg-orange-100 text-orange-600'],
    },
];

const suggestions = [
    { emoji: '🌱', prompt: "What's one small thing that made you smile today?" },
    { emoji: '💭', prompt: "Describe a moment you felt truly at peace this week." },
    { emoji: '🔥', prompt: "What challenge did you overcome recently?" },
    { emoji: '🌊', prompt: "What's something you're ready to let go of?" },
    { emoji: '✨', prompt: "Write 3 things you're genuinely grateful for right now." },
];

export default function Dashboard() {
    const { user } = useAuth();
    const firstName = user?.displayName?.split(' ')[0] || 'there';
    const [checkIn, setCheckIn] = useState({});
    const [thoughts, setThoughts] = useState([]);
    const [loadingThoughts, setLoadingThoughts] = useState(true);

    const allChecked = Object.keys(checkIn).length === checkInItems.length;

    // Firestore real-time fetch
    useEffect(() => {
        if (!user) return;
        const q = query(
            collection(db, 'thoughts'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setThoughts(data);
            setLoadingThoughts(false);
        });
        return () => unsubscribe();
    }, [user]);

    // Chart data — last 14 days থেকে entries count
    const chartData = (() => {
        const days = [];
        for (let i = 13; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const dateStr = d.toISOString().split('T')[0];
            const count = thoughts.filter(t => {
                if (!t.createdAt) return false;
                const tDate = t.createdAt.toDate().toISOString().split('T')[0];
                return tDate === dateStr;
            }).length;
            days.push({ day: label, entries: count });
        }
        return days;
    })();

    // This month count
    const thisMonthCount = thoughts.filter(t => {
        if (!t.createdAt) return false;
        const d = t.createdAt.toDate();
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    // Streak calculation
    const currentStreak = (() => {
        if (!thoughts.length) return 0;
        const dates = thoughts
            .filter(t => t.createdAt)
            .map(t => t.createdAt.toDate().toISOString().split('T')[0]);
        const unique = [...new Set(dates)].sort().reverse();
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        for (let i = 0; i < unique.length; i++) {
            const expected = new Date();
            expected.setDate(expected.getDate() - i);
            const expectedStr = expected.toISOString().split('T')[0];
            if (unique[i] === expectedStr || (i === 0 && unique[0] === today)) {
                streak++;
            } else break;
        }
        return streak;
    })();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0fdf8] via-[#e8f4fd] to-[#dce8f5]">
            <DashboardNavbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">

                {/* Greeting */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl text-[#0f3d2b]">
                        <span className="font-sans font-bold">Hey, </span>
                        <span className="font-serif font-bold italic">{firstName} 👋</span>
                    </h1>
                    <p className="text-sm text-[#2a4a3a]/70 mt-1">
                        How are you feeling today?
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { icon: <BookOpen size={18} />, label: 'Total Entries', value: thoughts.length },
                        { icon: <Calendar size={18} />, label: 'This Month', value: thisMonthCount },
                        { icon: <Flame size={18} />, label: 'Day Streak', value: currentStreak },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-4 text-center">
                            <div className="flex justify-center text-[#6f7bf7] mb-2">{stat.icon}</div>
                            <div className="text-xl font-bold font-sans text-[#0f3d2b]">{stat.value}</div>
                            <div className="text-xs text-[#2a4a3a] opacity-60 mt-0.5">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Streak + Start Writing */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                    {/* Streak card */}
                    <div className="bg-[#0f3d2b] rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#84e7c4]/20 rounded-full blur-xl" />
                        <div className="flex items-center gap-2 mb-1 relative z-10">
                            <Flame size={16} className="text-orange-400" />
                            <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                                Current Streak
                            </span>
                        </div>
                        <div className="text-5xl font-bold text-white relative z-10 leading-none my-2">
                            {currentStreak}
                        </div>
                        <div className="text-[#84e7c4] text-sm relative z-10">
                            days in a row 🎉
                        </div>
                        <p className="text-white/40 text-xs mt-2 relative z-10 leading-relaxed">
                            Keep going — you're building something real.
                        </p>
                    </div>

                    {/* Start Writing CTA */}
                    <div className="sm:col-span-2 bg-gradient-to-br from-[#6f7bf7] to-[#5a67e8] rounded-2xl p-6 flex items-center justify-between relative overflow-hidden">
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <PenLine size={22} className="text-white/80 mb-2" />
                            <h3 className="font-bold text-white text-lg leading-tight">
                                Start Writing
                            </h3>
                            <p className="text-white/60 text-xs mt-1 max-w-[200px] leading-relaxed">
                                Capture your thoughts, feelings, and reflections.
                            </p>
                        </div>
                        <Link
                            to="/dashboard/new"
                            className="btn btn-sm bg-white text-[#6f7bf7] border-0 hover:bg-white/90 font-semibold relative z-10 shrink-0"
                        >
                            Write Now
                        </Link>
                    </div>
                </div>

                {/* Recent Thoughts */}
                <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-5 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-[#0f3d2b] text-base">Recent Thoughts</h2>
                        <Link to="/dashboard/thoughts" className="text-xs text-[#6f7bf7] hover:text-[#5a67e8] transition-colors">
                            View all
                        </Link>
                    </div>

                    {loadingThoughts ? (
                        <div className="flex justify-center py-8">
                            <span className="loading loading-spinner loading-md text-[#6f7bf7]" />
                        </div>
                    ) : thoughts.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-2xl mb-2">📝</p>
                            <p className="text-sm text-[#2a4a3a]/50">No thoughts yet. Write your first one!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {thoughts.slice(0, 3).map((thought) => (
                                <div
                                    key={thought.id}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/60 transition-colors group"
                                >
                                    <span className="text-xl shrink-0 mt-0.5">
                                        {thought.mood
                                            ? { Happy: '😄', Calm: '😌', Thoughtful: '🤔', Frustrated: '😤', Sad: '😢', Anxious: '😰', Motivated: '🔥', Tired: '😴' }[thought.mood] || '💭'
                                            : '💭'
                                        }
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-sm text-[#0f3d2b] truncate">
                                            {thought.title}
                                        </h3>
                                        <p className="text-xs text-[#2a4a3a]/50 mt-0.5 line-clamp-1">
                                            {thought.content}
                                        </p>
                                    </div>
                                    <span className="text-xs text-[#2a4a3a]/30 shrink-0">
                                        {thought.createdAt
                                            ? thought.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                            : ''
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Today's Check-in */}
                <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-5 mb-6">
                    <h2 className="font-bold text-[#0f3d2b] text-base mb-1">
                        Today's Check-in
                    </h2>
                    <p className="text-xs text-[#2a4a3a]/50 mb-5">
                        Take a moment to check in with yourself.
                    </p>

                    <div className="flex flex-col gap-5">
                        {checkInItems.map((item) => (
                            <div key={item.key}>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <span className="text-base">{item.icon}</span>
                                    <span className="text-sm font-medium text-[#0f3d2b]">
                                        {item.label}
                                    </span>
                                    {checkIn[item.key] !== undefined && (
                                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${item.colors[checkIn[item.key]]}`}>
                                            {item.options[checkIn[item.key]]}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-1.5 flex-wrap">
                                    {item.options.map((option, i) => (
                                        <button
                                            key={i}
                                            onClick={() =>
                                                setCheckIn(prev => ({ ...prev, [item.key]: i }))
                                            }
                                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                                                checkIn[item.key] === i
                                                    ? `${item.colors[i]} border-transparent shadow-sm scale-105`
                                                    : 'bg-white/50 border-white/80 text-[#2a4a3a]/50 hover:border-[#6f7bf7]/40 hover:text-[#2a4a3a]'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                        <div className="flex-1 bg-[#0f3d2b]/10 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="h-full bg-[#6f7bf7] rounded-full transition-all duration-500"
                                style={{ width: `${(Object.keys(checkIn).length / checkInItems.length) * 100}%` }}
                            />
                        </div>
                        <span className="text-xs text-[#2a4a3a]/50 shrink-0">
                            {Object.keys(checkIn).length}/{checkInItems.length}
                        </span>
                    </div>

                    {allChecked && (
                        <button className="mt-4 btn btn-sm bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] gap-2">
                            Save Check-in ✓
                        </button>
                    )}
                </div>

                {/* Writing Activity Chart */}
                <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={16} className="text-[#6f7bf7]" />
                        <h2 className="font-bold text-[#0f3d2b] text-base">
                            Writing Activity
                        </h2>
                        <span className="text-xs text-[#2a4a3a]/40 ml-auto">
                            Last 14 days
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={160}>
                        <AreaChart
                            data={chartData}
                            margin={{ top: 5, right: 10, left: -30, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6f7bf7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6f7bf7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0f3d2b10" />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 10, fill: '#2a4a3a80' }}
                                tickLine={false}
                                axisLine={false}
                                interval={2}
                            />
                            <YAxis
                                tick={{ fontSize: 10, fill: '#2a4a3a80' }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    fontSize: '12px',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="entries"
                                stroke="#6f7bf7"
                                strokeWidth={2}
                                fill="url(#areaGradient)"
                                dot={{ fill: '#6f7bf7', r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Writing Prompts */}
                <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb size={16} className="text-[#f7a76f]" />
                        <h2 className="font-bold text-[#0f3d2b] text-base">
                            Writing Prompts
                        </h2>
                    </div>
                    <div className="flex flex-col gap-1">
                        {suggestions.map((s, i) => (
                            <Link
                                key={i}
                                to="/dashboard/new"
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#6f7bf7]/5 group transition-colors"
                            >
                                <span className="text-xl shrink-0">{s.emoji}</span>
                                <span className="text-sm text-[#2a4a3a]/70 flex-1 leading-relaxed">
                                    {s.prompt}
                                </span>
                                <ChevronRight
                                    size={14}
                                    className="text-[#6f7bf7] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}