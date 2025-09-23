import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
       if (!res.ok) {
        setMessage(data.message || "Login failed.");
        setLoading(false)
        return;
       }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setMessage("Login failed:", err);
    }
    setLoading(false);
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-[#0b0c0f] px-4">
      {/* subtle backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0f] via-[#0f1114]/60 to-[#0b0c0f] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-600">MovieVerse</h1>

        <div className="bg-gradient-to-b from-[#121316] to-[#0f1114] rounded-2xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Log In
          </h2>
          <p className="text-gray-500">Login to save your favorite movies 📌</p>
           </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#191b1e] border border-[#26282b] placeholder-gray-400 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-[#191b1e] border border-[#26282b] placeholder-gray-400 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
                autoComplete="new-password"
              />
            </div>


            {message && (
              <div className="text-sm text-red-400 bg-red-900/20 border border-red-800 p-2 rounded">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold cursor-pointer rounded-xl py-3 mt-2 shadow-lg transition-transform transform active:scale-95 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Loging up..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-300">
            Doesn't have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:underline">Sign Up</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
