import {
    ArrowRight,
    PenLine,
    FileText,
    Shield,
    Sparkles,
    Download,
    Edit3,
} from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
    const features = [
        {
            icon: <PenLine size={24} />,
            title: "Write Freely",
            desc: "Express your thoughts with a clean, distraction-free writing experience. Step-by-step guided form makes it effortless.",
            color: "from-violet-500 to-purple-600",
        },
        {
            icon: <FileText size={24} />,
            title: "Generate PDF Reports",
            desc: "Instantly convert your thoughts into beautifully formatted PDF documents. Download and share anytime.",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: <Edit3 size={24} />,
            title: "Edit & Update",
            desc: "Come back and refine your thoughts. Edit, update tags, change moods — your journal evolves with you.",
            color: "from-emerald-500 to-teal-500",
        },
        {
            icon: <Shield size={24} />,
            title: "Secure & Private",
            desc: "Your thoughts are protected with Firebase authentication. Only you can access your journal.",
            color: "from-amber-500 to-orange-500",
        },
        {
            icon: <Download size={24} />,
            title: "Download Anytime",
            desc: "Preview your thoughts in a clean format and download professional reports with a single click.",
            color: "from-pink-500 to-rose-500",
        },
        {
            icon: <Sparkles size={24} />,
            title: "Mood Tracking",
            desc: "Tag each thought with your current mood. Look back and see your emotional journey over time.",
            color: "from-indigo-500 to-violet-500",
        },
    ];
    const steps = [
        {
            step: "01",
            title: "Write",
            desc: "Open a new thought. Add a title, choose your mood, and start writing.",
        },
        {
            step: "02",
            title: "Preview",
            desc: "See your thought beautifully formatted. Review and refine before saving.",
        },
        {
            step: "03",
            title: "Download",
            desc: "Generate a professional PDF report and download it with a single click.",
        },
    ];
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
            {/* Tag */}
            <div className="flex justify-center mb-6">
                <span className="text-xs font-medium tracking-widest uppercase text-[#1a5a40] bg-white/40 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full">
                    Your Personal Thought Journal
                </span>
            </div>

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight text-[#0f3d2b] tracking-tight">
                    <span className="font-sans font-bold">Capture Your </span>
                    <span className="font-serif font-bold italic relative inline-block">
                        Thoughts
                        <span className="absolute bottom-1 left-0 w-full h-3 bg-[#6f7bf7]/25 -z-10 rounded"></span>
                    </span>
                    <span className="font-sans font-bold text-[#6f7bf7]">
                        , Beautifully
                    </span>
                </h1>
            </div>

            {/* Subtitle */}
            <p className="text-center text-[#2a4a3a] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed opacity-80">
                Write, organize, and download your thoughts as beautifully formatted PDF
                reports. Your personal space for reflection, creativity, and clarity.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
                <Link
                    to="/register"
                    className="btn btn-sm md:btn-md bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] gap-2 px-6 shadow-lg shadow-[#6f7bf7]/30"
                >
                    Start Writing <ArrowRight size={16} />
                </Link>
                <Link
                    to="/login"
                    className="btn btn-sm md:btn-md bg-black text-white border border-black hover:bg-[#6f7bf7] hover:border-[#6f7bf7] gap-2 px-6 transition-colors"
                >
                    Sign In
                </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-16">
                {[
                    { label: "Free to Use", value: "100%" },
                    { label: "PDF Export", value: "Instant" },
                    { label: "Your Data", value: "Private" },
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-2xl font-bold font-sans text-[#0f3d2b]">
                            {stat.value}
                        </div>
                        <div className="text-sm font-sans text-[#2a4a3a] opacity-70 mt-0.5">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
            {/* Features */}
            <div className="mt-24">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#0f3d2b] mb-4">
                        Everything You Need to{' '}
                        <span className="font-serif italic text-[#6f7bf7]">Journal</span>
                    </h2>
                    <p className="text-[#2a4a3a] opacity-70 text-base sm:text-lg leading-relaxed">
                        A simple yet powerful tool to capture your thoughts and turn them
                        into professional documents.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-6 hover:bg-white/70 hover:shadow-lg hover:shadow-[#6f7bf7]/10 transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="font-sans font-bold text-[#0f3d2b] text-lg mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[#2a4a3a] opacity-70 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div className="mt-24">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#0f3d2b] mb-4">
                        How It{' '}
                        <span className="font-serif italic text-[#6f7bf7]">Works</span>
                    </h2>
                    <p className="text-[#2a4a3a] opacity-70 text-base sm:text-lg">
                        Three simple steps to capture and share your thoughts
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                    {/* connector line — desktop only */}
                    <div className="hidden sm:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-[#6f7bf7]/30 z-0" />

                    {steps.map((item, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-white/60 backdrop-blur-sm border-2 border-[#6f7bf7]/40 flex flex-col items-center justify-center mb-4 shadow-md">
                                <span className="text-xs font-mono text-[#6f7bf7] font-bold tracking-widest leading-none">
                                    {item.step}
                                </span>
                            </div>
                            <h3 className="font-sans font-bold text-[#0f3d2b] text-xl mb-2">
                                {item.title}
                            </h3>
                            <p className="text-[#2a4a3a] opacity-70 text-sm leading-relaxed max-w-[200px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Final CTA */}
            <div className="mt-24">
                <div className="relative bg-[#247858] rounded-3xl overflow-hidden px-8 py-16 text-center">
                    {/* decorative blobs */}
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#6f7bf7]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#84e7c4]/20 rounded-full blur-3xl" />

                    <div className="relative z-10 max-w-xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white mb-4">
                            Ready to Start{' '}
                            <span className="font-serif italic text-white">Writing</span>?
                        </h2>
                        <p className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed">
                            Join ThinkFlow today. Your thoughts deserve a beautiful home.
                        </p>
                        <Link
                            to="/register"
                            className="btn btn-md bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] gap-2 px-8 shadow-lg shadow-[#6f7bf7]/40"
                        >
                            Create Free Account <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
