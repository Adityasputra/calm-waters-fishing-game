import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/api";

export default function ConvertToUser({ currentUser, onClose }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/convert-guest", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      login(res.data.token);

      navigate("/verify", {
        state: {
          email: res.data.email,
          fromConversion: true,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to convert account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl border border-teal-200">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="text-center mb-4">
          <div className="text-4xl mb-1">🎣</div>
          <h2 className="text-xl font-bold text-teal-800">
            Save Your Progress
          </h2>
          <p className="text-xs text-teal-600">Convert your guest account</p>
        </div>

        {/* PROGRESS (COMPACT) */}
        {currentUser && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
            <p className="text-xs font-semibold text-amber-800 mb-2">
              Your progress
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div>💰</div>
                <div className="font-bold">{currentUser.gold}</div>
                <div className="text-amber-700">Gold</div>
              </div>
              <div>
                <div>⭐</div>
                <div className="font-bold">{currentUser.points}</div>
                <div className="text-amber-700">Points</div>
              </div>
              <div>
                <div>🎣</div>
                <div className="font-bold">{currentUser.rodLevel}</div>
                <div className="text-amber-700">Rod</div>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-red-700">
              {error}
            </div>
          )}

          {/* USERNAME */}
          <div>
            <label className="font-medium text-teal-700">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-2.5 py-2 rounded-lg border border-teal-200 focus:border-teal-400 outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-medium text-teal-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-2.5 py-2 rounded-lg border border-teal-200 focus:border-teal-400 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="font-medium text-teal-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-2.5 py-2 rounded-lg border border-teal-200 focus:border-teal-400 outline-none"
            />
          </div>

          {/* CONFIRM */}
          <div>
            <label className="font-medium text-teal-700">Confirm</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-2.5 py-2 rounded-lg border border-teal-200 focus:border-teal-400 outline-none"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-3 py-2.5 rounded-lg font-semibold text-white transition
              ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400"
              }`}
          >
            {loading ? "Converting..." : "Convert Account"}
          </button>
        </form>

        <p className="text-center text-[10px] text-teal-600 mt-3">
          Verification email will be sent
        </p>
      </div>
    </div>
  );
}
