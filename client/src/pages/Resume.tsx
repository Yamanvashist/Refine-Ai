import { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/AuthStore";

const API = import.meta.env.VITE_API_URL;

const Resume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();

  const handleUpload = async () => {
    if (!file) {
      setError("Upload a resume first");
      return;
    }

    if ((user?.credits ?? 0) <= 0) {
      setError("No credits left");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await axios.post(
        `${API}/ai/resume`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(data.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 px-6 py-10 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        <div className="flex flex-col gap-3 border-b border-white/5 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Resume <span className="bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Analyzer</span>
          </h1>

          <div className="flex items-center gap-4 mt-2">
            <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-purple-300 text-sm font-medium backdrop-blur-md flex items-center gap-2">
              <span>💎</span> {user?.credits ?? 0} credits
            </span>
            <span className="text-zinc-500 text-sm font-medium uppercase tracking-widest">
              AI-powered feedback
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg transition hover:border-white/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">⚡</span> How it works
            </h2>
            <div className="text-sm text-zinc-400 flex flex-col gap-3 font-medium">
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span> Upload your resume</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span> AI scans your skills</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span> Get score & improvements</p>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg transition hover:border-white/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-400">🎯</span> What you get
            </h2>
            <ul className="text-sm text-zinc-400 flex flex-col gap-3 font-medium">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✔</span> ATS Score</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✔</span> Missing skills</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✔</span> Improvement tips</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✔</span> Clean summary</li>
            </ul>
          </div>

          <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition group-hover:bg-purple-500/20"></div>
            <h2 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2 relative z-10">
              💡 Pro Tip
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed relative z-10">
              Tailor your resume for each job. Generic resumes = instant rejection. Let the AI find your weak spots before recruiters do.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-white">Upload Docs</h2>

            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/10 bg-black/40 rounded-2xl p-6 cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-zinc-300 font-medium text-center">
                Drag & drop or click to upload
              </p>
              <p className="text-zinc-500 text-xs mt-2 uppercase tracking-wide">
                PDF or TXT only
              </p>

              {file && (
                <div className="mt-4 bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-full flex items-center gap-2 text-purple-300 text-sm font-semibold truncate max-w-[90%]">
                  <span>✅</span> {file.name}
                </div>
              )}
            </label>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-bold text-white tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Scanning Resume..." : "Analyze Resume"}
            </button>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col gap-6 h-full min-h-125">
            <h2 className="text-xl font-semibold text-white">AI Feedback</h2>

            <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 overflow-y-auto custom-scrollbar relative max-h-137.5">
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-4 text-sm font-medium flex items-center gap-3">
                  <span>⚠️</span> {error}
                </div>
              )}

              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                  <div className="w-10 h-10 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                  <p className="animate-pulse font-medium tracking-widest uppercase text-xs">Judging life decisions...</p>
                </div>
              ) : result ? (
                <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                  
                  <div className="flex items-center justify-between bg-purple-500/10 border border-purple-500/20 p-5 rounded-2xl">
                    <span className="text-purple-300 font-bold uppercase tracking-widest text-sm">ATS Match</span>
                    <span className="text-4xl font-black text-purple-400">
                      {result.score}<span className="text-xl text-purple-400/50">/10</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Missing Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map((item: string, i: number) => (
                        <span
                          key={i}
                          className="bg-red-500/10 border border-red-500/20 text-red-300 px-3 py-1.5 rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Improvements
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {result.improvements.map((item: string, i: number) => (
                        <li key={i} className="bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-zinc-300 leading-relaxed shadow-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Summary
                    </h3>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-2xl shadow-inner">
                      <p className="text-zinc-300 leading-relaxed text-sm">
                        {result.summary}
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-center px-4">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center rotate-6">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <p className="font-medium">Upload a resume to unlock AI feedback.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Resume;