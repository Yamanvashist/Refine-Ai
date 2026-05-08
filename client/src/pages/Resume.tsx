import { useState, useRef } from "react";
import axios from "axios";
import useAuthStore from "../store/AuthStore";
import {
  Gem, Zap, Target, Lightbulb, FileText, UploadCloud, CheckCircle2,
  Sparkles, Loader2, AlertTriangle, ScanLine, X, FileCheck2, TrendingUp,
  ArrowRight, Bot,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const Resume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuthStore();
  const noCredits = (user?.credits ?? 0) <= 0;

  const handleUpload = async () => {
    if (!file) return setError("Upload a resume first");
    if (noCredits) return setError("No credits left");

    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await axios.post(`${API}/ai/resume`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(data.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  const formatSize = (b: number) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-200 font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* ambient bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-125 h-125 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10">
        {/* HEADER */}
        <header className="flex flex-col gap-4 border-b border-white/5 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-xs text-zinc-400 w-fit">
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            AI-powered feedback
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Resume{" "}
              <span className="bg-linear-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                Analyzer
              </span>
            </h1>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-purple-500/30 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center">
                <Gem className="w-4 h-4 text-purple-300" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-widest text-zinc-500">Balance</div>
                <div className="font-semibold text-purple-300">{user?.credits ?? 0} Credits</div>
              </div>
            </div>
          </div>
        </header>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<Zap className="w-4 h-4" />}
            title="How it works"
            tone="purple"
            items={[
              { icon: <UploadCloud className="w-3.5 h-3.5" />, text: "Upload your resume" },
              { icon: <ScanLine className="w-3.5 h-3.5" />, text: "AI scans your skills" },
              { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Get score & improvements" },
            ]}
          />
          <InfoCard
            icon={<Target className="w-4 h-4" />}
            title="What you get"
            tone="indigo"
            items={[
              { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />, text: "ATS Score" },
              { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />, text: "Missing skills" },
              { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />, text: "Improvement tips" },
              { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />, text: "Clean summary" },
            ]}
          />
          <div className="relative bg-linear-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-lg overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-purple-300" />
                </span>
                <h2 className="text-lg font-bold text-purple-300">Pro Tip</h2>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Tailor your resume for each job. Generic resumes = instant rejection. Let the AI find your weak spots before recruiters do.
              </p>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* UPLOAD */}
          <div className="relative group">
            <div className="absolute -inset-px bg-linear-to-br from-purple-500/30 via-transparent to-indigo-500/20 rounded-3xl opacity-60 blur-sm group-hover:opacity-100 transition" />
            <div className="relative flex flex-col gap-6 bg-zinc-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                    <UploadCloud className="w-4.5 h-4.5 text-purple-300" />
                  </span>
                  Upload Document
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">PDF · TXT</span>
              </div>

              <label
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`relative flex flex-col items-center justify-center h-72 border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all overflow-hidden ${
                  dragOver
                    ? "border-purple-500/60 bg-purple-500/10"
                    : "border-white/10 bg-black/40 hover:border-purple-500/40 hover:bg-purple-500/5"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.txt"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />

                {file ? (
                  <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-500/30 to-indigo-500/20 border border-purple-500/40 flex items-center justify-center">
                        <FileCheck2 className="w-9 h-9 text-purple-300" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-4 border-zinc-900 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-zinc-100 font-semibold truncate max-w-xs">{file.name}</p>
                      <p className="text-zinc-500 text-xs mt-1">{formatSize(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setFile(null); if (inputRef.current) inputRef.current.value = ""; }}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/10 px-3 py-1.5 rounded-lg transition"
                    >
                      <X className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="relative w-20 h-20 mb-4">
                      <div className="absolute inset-0 bg-purple-500/10 rounded-2xl rotate-6" />
                      <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl -rotate-6" />
                      <div className="relative w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <UploadCloud className="w-8 h-8 text-purple-300" />
                      </div>
                    </div>
                    <p className="text-zinc-200 font-medium text-center">
                      Drag & drop or <span className="text-purple-400">browse</span>
                    </p>
                    <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest">
                      PDF or TXT only
                    </p>
                  </>
                )}
              </label>

              <button
                onClick={handleUpload}
                disabled={loading || noCredits || !file}
                className="group/btn relative w-full overflow-hidden bg-linear-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-semibold text-white tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Scanning Resume...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Analyze Resume <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>

          {/* FEEDBACK */}
          <div className="relative">
            <div className="absolute -inset-px bg-linear-to-br from-indigo-500/20 via-transparent to-purple-500/20 rounded-3xl opacity-60 blur-sm" />
            <div className="relative flex flex-col gap-6 bg-zinc-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl h-full min-h-150">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                    <Sparkles className="w-4.5 h-4.5 text-indigo-300" />
                  </span>
                  AI Feedback
                </h2>
                {result && (
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Ready
                  </span>
                )}
              </div>

              <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 overflow-y-auto relative max-h-140">
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
                      <ScanLine className="w-5 h-5 text-purple-400 absolute inset-0 m-auto" />
                    </div>
                    <p className="animate-pulse font-medium tracking-[0.3em] uppercase text-xs">
                      Judging life decisions...
                    </p>
                  </div>
                ) : result ? (
                  <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* SCORE */}
                    <div className="relative flex items-center justify-between bg-linear-to-br from-purple-500/15 to-indigo-500/5 border border-purple-500/20 p-5 rounded-2xl overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                      <div className="relative">
                        <span className="block text-[10px] uppercase tracking-widest text-purple-300/70 font-bold mb-1">
                          ATS Match
                        </span>
                        <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full bg-linear-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
                            style={{ width: `${(result.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="relative text-4xl font-black bg-linear-to-br from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                        {result.score}
                        <span className="text-xl text-purple-400/40">/10</span>
                      </span>
                    </div>

                    {/* MISSING SKILLS */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-widest text-red-300 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Missing Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.missingSkills.map((item: string, i: number) => (
                          <span
                            key={i}
                            className="bg-red-500/10 border border-red-500/20 text-red-300 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-500/15 transition"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* IMPROVEMENTS */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-widest text-emerald-300 font-bold flex items-center gap-2">
                        <Lightbulb className="w-3.5 h-3.5" /> Improvements
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {result.improvements.map((item: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-xl p-3.5 text-sm text-zinc-300 leading-relaxed transition"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SUMMARY */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-widest text-indigo-300 font-bold flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" /> Summary
                      </h3>
                      <div className="relative bg-linear-to-br from-indigo-500/5 to-transparent border border-white/5 p-5 rounded-2xl">
                        <div className="absolute top-3 left-3 text-4xl text-indigo-400/20 font-serif leading-none">"</div>
                        <p className="text-zinc-300 leading-relaxed text-sm pl-6">
                          {result.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-center px-4">
                    <div className="relative w-20 h-20 mb-5">
                      <div className="absolute inset-0 bg-purple-500/10 rounded-3xl rotate-6" />
                      <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl -rotate-6" />
                      <div className="relative w-full h-full rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Bot className="w-7 h-7 text-purple-400/60" />
                      </div>
                    </div>
                    <p className="text-zinc-500 max-w-xs">
                      Upload a resume to unlock AI feedback, ATS scoring & smart suggestions.
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

function InfoCard({
  icon, title, items, tone,
}: {
  icon: React.ReactNode;
  title: string;
  tone: "purple" | "indigo";
  items: { icon: React.ReactNode; text: string }[];
}) {
  const toneClass = tone === "purple"
    ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
    : "bg-indigo-500/15 border-indigo-500/30 text-indigo-300";
  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg transition hover:border-white/20 hover:-translate-y-0.5">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
        <span className={`w-8 h-8 rounded-xl border flex items-center justify-center ${toneClass}`}>
          {icon}
        </span>
        {title}
      </h2>
      <ul className="text-sm text-zinc-400 flex flex-col gap-2.5 font-medium">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="text-zinc-500">{it.icon}</span>
            {it.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resume;
