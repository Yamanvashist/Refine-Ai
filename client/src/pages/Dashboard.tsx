import { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import {
  Gem, Sparkles, Code2, Wand2, Copy, Check, AlertTriangle,
  Loader2, Lightbulb, ShieldAlert, FileCode2, Zap, ArrowUpRight,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
        { withCredentials: true }
      );
      setResult(data.data);
      if (user) setUser({ ...user, credits: data.credits });
    } catch (err: any) {
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
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const noCredits = (user?.credits ?? 0) <= 0;
  const charCount = code.length;
  const lineCount = code ? code.split("\n").length : 0;

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-200 font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-125 h-125 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-xs text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              AI Workspace
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                {user?.name || "User"}
              </span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl">
              Drop your messy code below and let the AI refactor, score and clean it up in seconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-purple-500/30 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center">
                <Gem className="w-4 h-4 text-purple-300" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Balance</div>
                <div className="font-semibold text-purple-300">{user?.credits ?? 0} Credits</div>
              </div>
            </div>
            {noCredits && (
              <button
                onClick={() => navigate("/pricing")}
                className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide bg-linear-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 transition"
              >
                Upgrade
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* INPUT PANEL */}
          <div className="relative group">
            <div className="absolute -inset-px bg-linear-to-br from-purple-500/30 via-transparent to-indigo-500/20 rounded-3xl opacity-60 blur-sm group-hover:opacity-100 transition" />
            <div className="relative flex flex-col gap-5 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                    <Code2 className="w-4.5 h-4.5 text-purple-300" />
                  </span>
                  Raw Code
                </h2>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>{lineCount} lines</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span>{charCount} chars</span>
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste your spaghetti code here..."
                  className="w-full h-120 bg-black/60 border border-white/5 rounded-2xl p-5 text-sm font-mono text-zinc-300 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
                  spellCheck="false"
                />
                {!code && (
                  <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-zinc-600">
                    Tip: paste a full file
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || noCredits}
                className="group/btn relative w-full overflow-hidden bg-linear-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-semibold text-white tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing context...
                  </>
                ) : noCredits ? (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    Out of Credits
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Refine Code
                    <Zap className="w-4 h-4 opacity-70" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* OUTPUT PANEL */}
          <div className="relative">
            <div className="absolute -inset-px bg-linear-to-br from-indigo-500/20 via-transparent to-purple-500/20 rounded-3xl opacity-60 blur-sm" />
            <div className="relative flex flex-col gap-5 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl h-full min-h-150">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                    <Sparkles className="w-4.5 h-4.5 text-indigo-300" />
                  </span>
                  AI Output
                </h2>
                {result && (
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Ready
                  </span>
                )}
              </div>

              <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 overflow-y-auto relative">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl mb-4 text-sm font-medium flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                    <div className="relative mb-5">
                      <div className="w-14 h-14 border-4 border-white/5 border-t-purple-500 rounded-full animate-spin" />
                      <Sparkles className="w-5 h-5 text-purple-400 absolute inset-0 m-auto" />
                    </div>
                    <p className="animate-pulse font-medium tracking-[0.3em] uppercase text-xs">
                      Processing Code
                    </p>
                  </div>
                ) : result ? (
                  <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* SCORE */}
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="relative bg-linear-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/30 px-6 py-4 rounded-2xl overflow-hidden">
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-500/30 rounded-full blur-2xl" />
                        <span className="relative block text-[10px] uppercase tracking-widest text-purple-300/70 font-bold mb-1">
                          Quality Score
                        </span>
                        <span className="relative text-4xl font-black bg-linear-to-br from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                          {result.score}
                          <span className="text-lg text-purple-400/40">/10</span>
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
                            style={{ width: `${(result.score / 10) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-zinc-500 mt-2">
                          Based on readability, structure & best practices
                        </p>
                      </div>
                    </div>

                    {/* ISSUES */}
                    <Section
                      title="Issues Found"
                      color="red"
                      icon={<ShieldAlert className="w-3.5 h-3.5" />}
                      items={result.issues}
                    />

                    {/* SUGGESTIONS */}
                    <Section
                      title="Suggestions"
                      color="emerald"
                      icon={<Lightbulb className="w-3.5 h-3.5" />}
                      items={result.suggestions}
                    />

                    {/* REFACTORED CODE */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-widest text-indigo-300 font-bold flex items-center gap-2">
                        <FileCode2 className="w-3.5 h-3.5" />
                        Refactored Code
                      </h3>
                      <div className="relative group/code">
                        <button
                          onClick={() => handleCopy(result.improvedCode)}
                          className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-1.5 rounded-lg opacity-0 group-hover/code:opacity-100 transition"
                        >
                          {copied ? (
                            <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> Copy</>
                          )}
                        </button>
                        <pre className="max-h-100 overflow-auto bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl text-sm font-mono text-zinc-300 leading-relaxed">
                          <code>{result.improvedCode}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-center px-4">
                    <div className="relative w-20 h-20 mb-5">
                      <div className="absolute inset-0 bg-purple-500/10 rounded-3xl rotate-6" />
                      <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl -rotate-6" />
                      <div className="relative w-full h-full rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-purple-400/60" />
                      </div>
                    </div>
                    <p className="text-zinc-500 max-w-xs">
                      Your refined code & insights will appear here once the AI finishes cooking.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const colorMap = {
  red: "text-red-300 bg-red-400",
  emerald: "text-emerald-300 bg-emerald-400",
} as const;

function Section({
  title, color, icon, items,
}: {
  title: string;
  color: keyof typeof colorMap;
  icon: React.ReactNode;
  items: string[];
}) {
  const [text, dot] = colorMap[color].split(" ");
  return (
    <div className="space-y-3">
      <h3 className={`text-xs uppercase tracking-widest font-bold flex items-center gap-2 ${text}`}>
        {icon} {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items?.map((item, i) => (
          <li
            key={i}
            className="group/item flex items-start gap-3 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-xl p-3.5 text-sm text-zinc-300 leading-relaxed transition"
          >
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
