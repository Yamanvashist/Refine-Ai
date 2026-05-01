  import { useState } from "react";
  import axios from "axios";
  import useAuthStore from "../store/AuthStore";
  import { useNavigate } from "react-router-dom";

  const API = import.meta.env.VITE_API_URL;


  const Dashboard = () => {
    const [code, setCode] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user, setUser } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async () => {
      if (!code.trim()) return;

      if ((user?.credits ?? 0) <= 0) {
        setError("No credits left. Upgrade your plan.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.post(
          `${API}/ai/analyze`,
          { code },
          { withCredentials: true },
        );

        setResult(data.data);

        if (user) {
          setUser({
            ...user,
            credits: data.credits,
          });
        }
      } catch (err: any) {
        console.log("something wrong", err);
        const message = err?.response?.data?.message || "Something went wrong";
        setError(message);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    const handleCopy = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        alert("Copied");
      } catch (err) {
        console.error("Copy failed", err);
      }
    };

    const noCredits = (user?.credits ?? 0) <= 0;

    return (
      <div className="min-h-screen bg-[#050505] text-zinc-200 p-6 md:p-10 font-sans selection:bg-purple-500/30">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Welcome back,{" "}
                <span className="bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {user?.name || "User"}
                </span>
              </h1>
              <p className="text-zinc-400 mt-2 text-sm md:text-base">
                Drop your messy code below and let the AI clean it up.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
              <span className="text-lg">💎</span>
              <span className="font-medium text-purple-300">
                {user?.credits ?? 0} Credits
              </span>
              {noCredits && (
                <button
                  onClick={() => navigate("/pricing")}
                  className="ml-2 text-xs font-bold uppercase tracking-wide bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full hover:bg-purple-500/30 transition"
                >
                  Upgrade
                </button>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5 bg-zinc-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  Raw Code
                </h2>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your spaghetti code here..."
                className="w-full h-125 bg-black/50 border border-white/5 rounded-2xl p-5 text-sm font-mono text-zinc-300 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none transition-all custom-scrollbar"
                spellCheck="false"
              />

              <button
                onClick={handleSubmit}
                disabled={loading || noCredits}
                className="w-full bg-linear-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-bold text-white tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading
                  ? "Analyzing Context..."
                  : noCredits
                    ? "Out of Credits"
                    : "Refine Code"}
              </button>
            </div>

            <div className="flex flex-col gap-5 bg-zinc-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl h-full min-h-150">
              <h2 className="text-xl font-semibold text-white">AI Output</h2>

              <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 overflow-y-auto custom-scrollbar relative">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-4 text-sm font-medium flex items-start gap-3">
                    <span className="text-lg">⚠️</span>
                    <p>{error}</p>
                  </div>
                )}

                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                    <div className="w-10 h-10 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                    <p className="animate-pulse font-medium tracking-widest uppercase text-xs">
                      Processing Code
                    </p>
                  </div>
                ) : result ? (
                  <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="bg-purple-500/10 border border-purple-500/30 px-5 py-3 rounded-2xl">
                        <span className="block text-xs uppercase tracking-wider text-purple-400/70 font-bold mb-1">
                          Quality Score
                        </span>
                        <span className="text-3xl font-black text-purple-400">
                          {result.score}
                          <span className="text-lg text-purple-400/50">/10</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm uppercase tracking-widest text-red-400 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>{" "}
                        Issues Found
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {result.issues.map((item: string, i: number) => (
                          <li
                            key={i}
                            className="bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-zinc-300 leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{" "}
                        Suggestions
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {result.suggestions.map((item: string, i: number) => (
                          <li
                            key={i}
                            className="bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-zinc-300 leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>{" "}
                        Refactored Code
                      </h3>
                      <div className="relative group">
                        <button
                          onClick={() => handleCopy(result.improvedCode)}
                          className="absolute top-3 right-3 text-xs bg-white/10 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                        >
                          Copy
                        </button>

                        <pre className="max-h-100 overflow-auto bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl text-sm font-mono text-zinc-300">
                          <code>{result.improvedCode}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-center px-4">
                    <div className="w-16 h-16 mb-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center rotate-12">
                      <span className="text-2xl">✨</span>
                    </div>
                    <p>Results will appear here once the AI finishes cooking.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;
