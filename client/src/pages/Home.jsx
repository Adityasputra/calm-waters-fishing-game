import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [showGuestWarning, setShowGuestWarning] = useState(false);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-sky-200 via-teal-100 to-amber-50 flex items-center justify-center relative overflow-hidden">

            {/* soft water overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal-300/15 via-transparent to-sky-200/25" />

            {/* ambient blur */}
            <div className="absolute top-24 left-24 w-28 h-28 bg-teal-300/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-24 right-24 w-32 h-32 bg-sky-300/20 rounded-full blur-3xl animate-pulse delay-700" />

            {/* CONTENT */}
            <div className="relative z-10 w-full max-w-sm md:max-w-md xl:max-w-lg px-4">

                {/* TITLE */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="text-5xl md:text-6xl xl:text-7xl">🎣</div>
                    </div>

                    <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-teal-800 drop-shadow">
                        Calm Waters
                    </h1>

                    <p className="text-sm md:text-base xl:text-lg text-teal-600 mt-1">
                        A Peaceful Fishing Journey
                    </p>

                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-3" />
                </div>

                {/* CARD */}
                <div className="bg-white/85 backdrop-blur-md border border-teal-200/50 rounded-2xl p-5 md:p-6 xl:p-8 shadow-xl">

                    <h2 className="text-lg md:text-xl font-semibold text-teal-800 text-center mb-6">
                        Welcome Back, Angler
                    </h2>

                    {/* EMAIL LOGIN */}
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold text-sm md:text-base py-3 rounded-xl transition-all hover:shadow-lg mb-4"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Sign In with Email</span>
                        </div>
                    </button>

                    {/* DIVIDER */}
                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-teal-200" />
                        <span className="text-xs text-teal-500">or</span>
                        <div className="flex-1 h-px bg-teal-200" />
                    </div>

                    {/* GUEST INFO */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                        <p className="text-xs text-amber-700 leading-relaxed">
                            Guest mode does not save progress.
                        </p>
                    </div>

                    {/* GUEST LOGIN */}
                    <button
                        onClick={() => setShowGuestWarning(true)}
                        className="w-full bg-teal-100 hover:bg-teal-200 text-teal-700 font-semibold text-sm md:text-base py-3 rounded-xl border border-teal-200 transition-all"
                    >
                        Cast as Guest
                    </button>
                </div>

                {/* FOOTER */}
                <p className="text-center text-xs text-teal-600 mt-5">
                    🌊 Calm waters, calm mind
                </p>
            </div>

            {/* MODAL */}
            {showGuestWarning && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full border-2 border-amber-400 shadow-2xl">

                        <div className="text-center mb-4">
                            <div className="text-5xl mb-2">⚠️</div>
                            <h3 className="text-lg font-bold text-amber-800">
                                Guest Mode
                            </h3>
                        </div>

                        <ul className="text-sm text-amber-900 space-y-2 mb-5">
                            <li>❌ Progress not saved</li>
                            <li>✅ Create account anytime</li>
                        </ul>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowGuestWarning(false)}
                                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => navigate('/guest')}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-lg"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
