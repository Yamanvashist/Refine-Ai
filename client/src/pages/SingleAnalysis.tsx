import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SingleAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const [data, setData] = useState<any>(null);
  const [type, setType] = useState<"code" | "resume" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/ai/analysis/${id}`,
          { withCredentials: true }
        );

        setData(res.data.data.result);
        setType(res.data.data.type);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOne();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-zinc-500">
        <div className="w-10 h-10 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin mb-4"></div>
        <p className="animate-pulse font-medium tracking-widest uppercase text-xs">Pulling Records...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center flex flex-col gap-4 items-center">
          <span className="text-4xl">💀</span>
          <p className="text-red-400 font-medium">Invalid data or record not found.</p>
          <button onClick={() => navigate(-1)} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-zinc-300 transition">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isCode = type === "code";
  const themeColor = isCode ? "purple" : "fuchsia";

  return (
    <div className={`min-h-screen bg-[#050505] text-zinc-200 px-6 py-10 font-sans selection:bg-${themeColor}-500/30`}>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        <button
          onClick={() => navigate(-1)}
          className="w-fit flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition group font-medium"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
        </button>

        <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                {isCode ? "💻 Code Analysis" : "📄 Resume Analysis"}
              </h1>
              <p className="text-zinc-500 mt-1 text-sm uppercase tracking-widest font-medium">
                Report ID: <span className="text-zinc-400">{id?.slice(-6) || "N/A"}</span>
              </p>
            </div>

            <div className={`bg-${themeColor}-500/10 border border-${themeColor}-500/20 px-6 py-4 rounded-2xl text-center min-w-30`}>
              <span className={`block text-xs uppercase tracking-wider text-${themeColor}-400/70 font-bold mb-1`}>Overall Score</span>
              <span className={`text-4xl font-black text-${themeColor}-400`}>
                {data.score}<span className={`text-xl text-${themeColor}-400/50`}>/10</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8">

            {isCode && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-widest text-red-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Issues Found
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {data.issues?.map((i: string, idx: number) => (
                      <li key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-zinc-300 leading-relaxed">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Suggestions
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {data.suggestions?.map((s: string, idx: number) => (
                      <li key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-zinc-300 leading-relaxed">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Improved Code
                  </h3>
                  <div className="relative group">
                    <pre className="max-h-100 overflow-auto bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl text-sm font-mono text-zinc-300 shadow-inner custom-scrollbar">
                      <code>{data.improvedCode}</code>
                    </pre>
                  </div>
                </div>
              </>
            )}

            {!isCode && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-widest text-red-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.missingSkills?.map((i: string, idx: number) => (
                      <span key={idx} className="bg-red-500/10 border border-red-500/20 text-red-300 px-3 py-1.5 rounded-full text-xs font-medium">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Improvements
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {data.improvements?.map((i: string, idx: number) => (
                      <li key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-zinc-300 leading-relaxed shadow-sm">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm uppercase tracking-widest text-fuchsia-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span> Executive Summary
                  </h3>
                  <div className="bg-black/60 border border-white/5 p-5 rounded-2xl shadow-inner">
                    <p className="text-zinc-300 leading-relaxed text-sm">
                      {data.summary}
                    </p>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAnalysis;