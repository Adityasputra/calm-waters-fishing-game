import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/api";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const email = location.state?.email;

  useEffect(() => {
    if (!email) navigate("/register");
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      login(res.data.token);
      navigate("/game");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResending(true);

    try {
      await api.post("/auth/resend-otp", { email });
      alert("OTP sent! Check your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-teal-100 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* HEADER */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-teal-800">Verify Email</h1>
          <p className="text-xs text-teal-600 mt-1">Code sent to</p>
          <p className="text-xs font-semibold text-teal-700 truncate">
            {email}
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/85 backdrop-blur border border-teal-200 rounded-2xl p-5 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* OTP */}
            <div>
              <label className="block text-xs font-medium text-teal-700 mb-1 text-center">
                Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full py-2.5 rounded-lg border border-teal-200 focus:border-teal-400 outline-none text-center text-lg font-bold tracking-widest"
                placeholder="000000"
              />
              <p className="text-[11px] text-teal-600 mt-1 text-center">
                Enter the 6-digit code
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-semibold text-sm text-white transition
                ${
                  loading
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400"
                }`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          {/* RESEND */}
          <div className="text-center mt-4">
            <p className="text-xs text-teal-700 mb-1">Didn’t receive it?</p>
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-teal-600 mt-4">
          🌊 One step away from fishing
        </p>
      </div>
    </div>
  );
}
