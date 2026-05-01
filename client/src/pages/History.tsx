import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAIStore from "../store/AiStore";

const History = () => {
  const navigate = useNavigate();

  const { history, getHistory, loading, deleteAnalysis } = useAIStore();

  useEffect(() => {
    getHistory();
  }, [getHistory]); 

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this analysis?");
    if (!confirmDelete) return;
    await deleteAnalysis(id);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">History</h1>

        <p className="text-white/50 text-sm">
          All your previous AI analyses in one place
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-52 text-zinc-500 gap-4">
          <div className="w-10 h-10 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin"></div>

          <p className="text-sm uppercase tracking-widest animate-pulse">
            Fetching your history...
          </p>
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition">
            <span className="text-2xl">📂</span>
          </div>

          <div>
            <p className="text-lg text-white/70 font-medium">
              No history yet
            </p>
            <p className="text-sm text-white/40 mt-1">
              Your past analyses will appear here
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => {
            const score = item.score ?? 0; 
            const type = item.type ?? "code";

            return (
              <div
                key={item._id}
                onClick={() => navigate(`/analysis/${item._id}`)}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 backdrop-blur-xl transition hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    {type === "resume"
                      ? "Resume Analysis"
                      : "Code Analysis"}
                  </h2>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      score >= 8
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : score >= 5
                        ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {item.score ?? "N/A"}
                  </span>
                </div>

                <p className="text-white/50 text-xs">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-sm text-white/60 group-hover:text-white transition">
                    View Details →
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                    className="text-red-400 text-xs opacity-70 hover:opacity-100 hover:text-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;