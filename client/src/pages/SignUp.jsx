import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const validateForm = () => {
    if (!form.username || !form.email || !form.password) {
      setMessage("All fields are required.");
      return false;
    }
    if (form.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (err) {
      setMessage("Signup failed:", err);
    }
    setLoading(false);
  };

  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0c0f] px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0f] via-[#0f1114]/60 to-[#0b0c0f] pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-600">MovieVerse</h1>
        
        <div className="bg-gradient-to-b from-[#121316] to-[#0f1114] rounded-2xl shadow-2xl p-8 sm:p-10">
           <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Sign Up
          </h2>
          <p className="text-gray-500">Signup to save your favorite movies 📌</p>
           </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-[#191b1e] border border-[#26282b] placeholder-gray-400 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Username"
                autoComplete="username"
              />
            </div>

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
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold rounded-xl py-3 mt-2 shadow-lg transition-transform transform active:scale-95 cursor-pointer"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">Log In</Link>
          </p>
        </div>

        {/* soft outer card glow */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <small>By signing up you agree to the Terms & Privacy</small>
        </div>
      </div>
    </div>
  );
}
