import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.token);
      navigate("/game");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-sky-200 via-teal-100 to-amber-50 flex items-center justify-center relative overflow-hidden">
      {/* ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-300/15 via-transparent to-sky-200/25" />
      <div className="absolute top-24 left-24 w-28 h-28 bg-teal-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-24 right-24 w-32 h-32 bg-sky-300/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-sm md:max-w-md xl:max-w-lg px-4">
        {/* HEADER */}
        <div className="text-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium mb-4 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>

          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-teal-800">
            Welcome Back
          </h1>

          <p className="text-sm md:text-base xl:text-lg text-teal-600 mt-1">
            Sign in to continue fishing
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/85 backdrop-blur-md border border-teal-200/50 rounded-2xl p-5 md:p-6 xl:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex gap-3">
                <span className="text-red-500">❌</span>
                <p className="text-xs md:text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-teal-700 font-semibold mb-1 text-xs md:text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-teal-200 focus:border-teal-400 focus:outline-none bg-white/60 text-sm"
                placeholder="your@email.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-teal-700 font-semibold mb-1 text-xs md:text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-teal-200 focus:border-teal-400 focus:outline-none bg-white/60 text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full font-semibold text-sm md:text-base py-3 rounded-xl transition-all shadow
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 hover:shadow-lg"
                }
                text-white
              `}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-teal-200" />
            <span className="text-xs text-teal-500">or</span>
            <div className="flex-1 h-px bg-teal-200" />
          </div>

          {/* REGISTER */}
          <p className="text-center text-xs md:text-sm text-teal-700">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold text-teal-600 hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-teal-600 mt-4">
          🌊 Your fishing adventure awaits
        </p>
      </div>
    </div>
  );
}
