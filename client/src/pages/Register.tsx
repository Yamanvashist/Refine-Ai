import { User, Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);

  const { register, loading, error } = useAuthStore();

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErr("");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    try {
      await register(formData);
      const { error } = useAuthStore.getState();
      if (!error) return navigate("/");
    } catch (err) {
      console.log(err, "Register error");
    }

    setErr("");
    console.log("Form is valid", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-black via-purple-900 to-black px-4">
      <div className="mb-6 text-center">
        <h1 className="text-white text-3xl font-semibold tracking-wide">
          Refine AI
        </h1>
        <p className="text-white/60 text-sm">
          Refine your code. Upgrade your career.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white/10 backdrop-blur-lg border border-white/20 w-105 rounded-3xl p-8 shadow-2xl"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white">Create Account</h2>
          <p className="text-white/60 text-sm">
            Start analyzing your code & resume
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="relative text-white text-sm">
            Full Name
            <input
              value={formData.name}
              onChange={onChangeHandle}
              name="name"
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full border border-white/10 rounded-xl pl-12 pr-4 py-3 bg-black/60 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <User
              className="absolute left-4 top-9.5 text-white/50 pointer-events-none"
              size={18}
            />
          </label>

          {/* Email */}
          <label className="relative text-white text-sm">
            Email
            <input
              value={formData.email}
              name="email"
              onChange={onChangeHandle}
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full border border-white/10 rounded-xl pl-12 pr-4 py-3 bg-black/60 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Mail
              className="absolute left-4 top-9.5 text-white/50 pointer-events-none"
              size={18}
            />
          </label>

          <label className="relative text-white text-sm">
            Password
            <input
              value={formData.password}
              onChange={onChangeHandle}
              name="password"
              type={`${eyeOpen ? "text" : "password"}`}
              placeholder="••••••••"
              className="mt-1 w-full border border-white/10 rounded-xl pl-12 pr-12 py-3 bg-black/60 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Lock
              className="absolute left-4 top-9.5 text-white/50 pointer-events-none"
              size={18}
            />
            {eyeOpen ? (
              <Eye
                onClick={() => setEyeOpen(!eyeOpen)}
                className="absolute right-4 bottom-1/6 cursor-pointer text-white/50"
              />
            ) : (
              <EyeClosed
                onClick={() => setEyeOpen(!eyeOpen)}
                className="absolute right-4 bottom-1/6 cursor-pointer text-white/50"
              />
            )}
          </label>

          <label className="relative text-white text-sm">
            Confirm Password
            <input
              value={formData.confirmPassword}
              onChange={onChangeHandle}
              name="confirmPassword"
              type={`${eyeOpen ? "text" : "password"}`}
              placeholder="••••••••"
              className={`mt-1 w-full border rounded-xl pl-12 pr-4 py-3 bg-black/60 text-white placeholder-white/40 outline-none focus:ring-2 
  ${err ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-purple-500"}`}
            />
            <Lock
              className="absolute left-4 top-9.5 text-white/50 pointer-events-none"
              size={18}
            />
          </label>

          {err && <p className="text-red-400 text-xs mt-1">{err}</p>}

          {error && (
            <p className="text-white text-center bg-red-500/80 shadow-2xl  py-4 rounded text-xs mt-1 hover:bg-red-500 transition-all duration-300">
              {error}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-2 bg-linear-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg transition active:scale-[0.97]"
        >
          Create Account
        </button>

        <p className="text-center text-white/60 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
