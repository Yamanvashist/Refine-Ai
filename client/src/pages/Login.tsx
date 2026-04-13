import { User, Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")
  const [eyeOpen, setEyeOpen] = useState(false)

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    setError("");

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Form is valid", formData);
  };

  const navigate = useNavigate()


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-black via-purple-900 to-black px-4">

      <div className="mb-6 text-center">
        <h1 className="text-white text-3xl font-sans font-semibold tracking-wide">
          Refine AI
        </h1>
        <p className="text-white/60  text-sm">
          Refine your code. Upgrade your career.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white/10 backdrop-blur-lg border border-white/20 w-[420px] rounded-3xl p-8 shadow-2xl">

        <div>
          <h2 className="text-2xl font-semibold text-white">
            Login in your Account
          </h2>
          <p className="text-white/60 text-sm">
            Start analyzing your code & resume
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">

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
            <Mail className="absolute left-4 top-[38px] text-white/50 pointer-events-none" size={18} />
          </label>

          {/* Password */}
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
            <Lock className="absolute left-4 top-9.5 text-white/50 pointer-events-none" size={18} />
            {eyeOpen ? <Eye onClick={() => setEyeOpen(!eyeOpen)} className="absolute right-4 bottom-1/6 cursor-pointer text-white/50" /> :
              <EyeClosed onClick={() => setEyeOpen(!eyeOpen)} className="absolute right-4 bottom-1/6 cursor-pointer text-white/50" />}

          </label>

          {/* Confirm Password */}
          <label className="relative text-white text-sm">
            Confirm Password
            <input
              value={formData.confirmPassword}
              onChange={onChangeHandle}
              name="confirmPassword"
              type={`${eyeOpen ? "text" : "password"}`}
              placeholder="••••••••"
              className={`mt-1 w-full border rounded-xl pl-12 pr-4 py-3 bg-black/60 text-white placeholder-white/40 outline-none focus:ring-2 
  ${error ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:ring-purple-500"}`}
            />
            <Lock className="absolute left-4 top-[38px] text-white/50 pointer-events-none" size={18} />
          </label>

          {error && (
            <p className="text-red-400 text-xs mt-1">{error}</p>
          )}

        </div>

        {/* Button */}
        <button type="submit" className="mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg cursor-pointer transition active:scale-[0.97]">
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm">
          Already have an account?{" "}
          <span onClick={() => navigate("/register")} className="text-purple-400 cursor-pointer hover:underline">
            Register
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;