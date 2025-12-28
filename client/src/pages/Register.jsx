import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...payload } = formData;
      await api.post("/auth/register", payload);
      navigate("/verify", { state: { email: formData.email } });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
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
      <div className="relative z-10 w-full max-w-xs md:max-w-sm px-4">
        {/* HEADER */}
        <div className="text-center mb-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs text-teal-600 hover:text-teal-700 font-medium mb-3 transition-colors"
          >
            <svg
              className="w-3 h-3"
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

          <h1 className="text-2xl md:text-3xl font-bold text-teal-800">
            Join the Adventure
          </h1>

          <p className="text-xs md:text-sm text-teal-600 mt-1">
            Create your angler account
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/85 backdrop-blur-md border border-teal-200/50 rounded-2xl p-4 md:p-5 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 flex gap-2">
                <span className="text-red-500 text-sm">❌</span>
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* USERNAME */}
            <div>
              <label className="block text-teal-700 font-semibold mb-1 text-xs">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9_]+"
                className="w-full px-3 py-2 rounded-xl border border-teal-200 focus:border-teal-400 focus:outline-none bg-white/60 text-xs"
                placeholder="angler_123"
              />
              <p className="text-xs text-teal-600 mt-0.5">
                3–20 characters, letters, numbers, underscore
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-teal-700 font-semibold mb-1 text-xs">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-xl border border-teal-200 focus:border-teal-400 focus:outline-none bg-white/60 text-xs"
                placeholder="your@email.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-teal-700 font-semibold mb-1 text-xs">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-3 py-2 rounded-xl border border-teal-200 focus:border-teal-400 focus:outline-none bg-white/60 text-xs"
                placeholder="••••••••"
              />
              <p className="text-xs text-teal-600 mt-0.5">Minimum 8 characters</p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-teal-700 font-semibold mb-1 text-xs">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-xl border border-teal-200 focus:border-teal-400 focus:outline-none bg-white/60 text-xs"
                placeholder="••••••••"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full font-semibold text-xs md:text-sm py-2.5 rounded-xl transition-all shadow
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 hover:shadow-lg"
                }
                text-white
              `}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-teal-200" />
            <span className="text-xs text-teal-500">or</span>
            <div className="flex-1 h-px bg-teal-200" />
          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-xs text-teal-700">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-teal-600 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-teal-600 mt-3">
          🌊 Start your fishing journey today
        </p>
      </div>
    </div>
  );
}
