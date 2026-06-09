import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { db } from '../../Firebase/firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../Auth/AuthContext';
import DashboardNavbar from '../Dashboard/DashboardNavbar';

const moodOptions = [
    { emoji: '😄', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '🤔', label: 'Thoughtful' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '🔥', label: 'Motivated' },
    { emoji: '😴', label: 'Tired' },
];

const tagSuggestions = ['personal', 'work', 'gratitude', 'ideas', 'health', 'family', 'goals', 'reflection'];

export default function NewThoughts() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedMood, setSelectedMood] = useState(null);
    const [tags, setTags] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleTag = (tag) => {
        setTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const addCustomTag = (e) => {
        if (e.key === 'Enter' && customTag.trim()) {
            const newTag = customTag.trim().toLowerCase().replace(/\s+/g, '-');
            if (!tags.includes(newTag)) setTags(prev => [...prev, newTag]);
            setCustomTag('');
        }
    };

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) return;
        setLoading(true);
        setError('');
        try {
            await addDoc(collection(db, 'thoughts'), {
                userId: user.uid,
                title: title.trim(),
                content: content.trim(),
                mood: selectedMood,
                tags: tags,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Save হয়নি। আবার try করো।');
            setLoading(false);
        }
    };

    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0fdf8] via-[#e8f4fd] to-[#dce8f5]">
            <DashboardNavbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-sm text-[#2a4a3a]/60 hover:text-[#0f3d2b] transition-colors"
                    >
                        <ArrowLeft size={16} /> Back
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[#2a4a3a]/40">{wordCount} words</span>
                        <button
                            onClick={handleSave}
                            disabled={!title.trim() || !content.trim() || loading}
                            className="btn btn-sm bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] gap-2 shadow-md shadow-[#6f7bf7]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? <span className="loading loading-spinner loading-xs" />
                                : <><Save size={14} /> Save</>
                            }
                        </button>
                    </div>
                </div>

                {/* Main card */}
                <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-3xl p-6 sm:p-8 mb-5">
                    <input
                        type="text"
                        placeholder="Give your thought a title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent text-2xl font-bold font-sans text-[#0f3d2b] placeholder:text-[#2a4a3a]/25 outline-none border-none mb-6"
                    />
                    <div className="w-full h-px bg-[#0f3d2b]/8 mb-6" />
                    <textarea
                        placeholder="What's on your mind? Write freely..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        className="w-full bg-transparent text-sm text-[#2a4a3a] placeholder:text-[#2a4a3a]/30 outline-none border-none resize-none leading-relaxed font-sans"
                    />
                </div>

                {/* Mood selector */}
                <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-5 mb-4">
                    <p className="text-sm font-medium text-[#0f3d2b] mb-3">
                        How are you feeling?
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {moodOptions.map((mood) => (
                            <button
                                key={mood.label}
                                onClick={() => setSelectedMood(mood.label)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                                    selectedMood === mood.label
                                        ? 'bg-[#6f7bf7]/15 border-[#6f7bf7]/40 text-[#6f7bf7] scale-105'
                                        : 'bg-white/50 border-white/80 text-[#2a4a3a]/50 hover:border-[#6f7bf7]/30 hover:text-[#2a4a3a]'
                                }`}
                            >
                                <span>{mood.emoji}</span> {mood.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-5 mb-6">
                    <p className="text-sm font-medium text-[#0f3d2b] mb-3">Add tags</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tagSuggestions.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                                    tags.includes(tag)
                                        ? 'bg-[#6f7bf7] text-white border-[#6f7bf7]'
                                        : 'bg-white/50 border-white/80 text-[#2a4a3a]/50 hover:border-[#6f7bf7]/30'
                                }`}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Custom tag — press Enter"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyDown={addCustomTag}
                        className="w-full bg-white/60 border border-white/80 focus:border-[#6f7bf7] focus:outline-none focus:ring-2 focus:ring-[#6f7bf7]/20 rounded-xl px-4 py-2.5 text-xs text-[#0f3d2b] placeholder:text-[#2a4a3a]/40 transition-all"
                    />
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 bg-[#6f7bf7]/10 text-[#6f7bf7] text-xs px-2.5 py-1 rounded-full"
                                >
                                    #{tag}
                                    <button
                                        onClick={() => toggleTag(tag)}
                                        className="hover:text-red-400 transition-colors ml-0.5"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 px-4 py-3 bg-red-50/80 border border-red-200/60 rounded-xl text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Save bottom */}
                <button
                    onClick={handleSave}
                    disabled={!title.trim() || !content.trim() || loading}
                    className="btn w-full bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] shadow-lg shadow-[#6f7bf7]/30 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading
                        ? <span className="loading loading-spinner loading-sm" />
                        : <><Sparkles size={16} /> Save Thought</>
                    }
                </button>

            </div>
        </div>
    );
}