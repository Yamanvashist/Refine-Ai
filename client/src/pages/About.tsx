import {
  Sparkles, Code2, FileText, Zap, ArrowRight,
} from "lucide-react";

const About = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-125 h-125 rounded-full bg-fuchsia-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-100 h-100 rounded-full bg-indigo-600/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium text-white/70">About RefineAI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Smarter coding.
            <br />
            <span className="bg-linear-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Sharper resumes.
            </span>
          </h1>
          <p className="text-white/60 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            RefineAI is your AI co-pilot built for developers and students who
            want real, actionable feedback — not generic answers.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { v: "10K+", l: "Analyses run" },
              { v: "98%", l: "Accuracy" },
              { v: "<3s", l: "Avg response" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-5"
              >
                <div className="text-2xl md:text-3xl font-bold bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-xs text-white/50 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-24">
          {[
            {
              icon: Code2,
              title: "Code Analysis",
              desc: "Advanced AI scores your code, identifies issues, and suggests optimized improvements — so you ship better code, faster.",
              tag: "AI Powered",
            },
            {
              icon: FileText,
              title: "Resume Analysis",
              desc: "ATS scores, skill gap detection, and concrete suggestions designed to help you stand out and get hired faster.",
              tag: "ATS Ready",
            },
            {
              icon: Zap,
              title: "Credits System",
              desc: "Free credits on signup. Upgrade anytime. Payments securely handled via Razorpay with instant top-ups.",
              tag: "Flexible",
            },
            {
              icon: Sparkles,
              title: "Why RefineAI?",
              desc: "Built for developers and students who want real feedback — fast, clean, and actually useful. No fluff, just signal.",
              tag: "For Builders",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group relative rounded-3xl p-px bg-linear-to-br from-white/15 via-white/5 to-transparent hover:from-purple-500/40 hover:via-fuchsia-500/20 transition-all duration-500"
            >
              <div className="relative h-full rounded-3xl bg-zinc-950/80 backdrop-blur-xl p-7 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-purple-600/0 group-hover:bg-purple-600/20 blur-3xl transition-all duration-500" />
                <div className="relative flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500/20 to-fuchsia-500/10 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <f.icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                    {f.tag}
                  </span>
                </div>
                <h2 className="relative text-xl font-semibold mb-2">{f.title}</h2>
                <p className="relative text-white/60 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-linear-to-br from-purple-600/20 via-fuchsia-600/10 to-transparent backdrop-blur-xl p-10 md:p-14 text-center">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.4), transparent 50%), radial-gradient(circle at 70% 80%, rgba(236,72,153,0.3), transparent 50%)",
          }} />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Built for people who want to improve
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Whether you're prepping for interviews, sharpening your code, or
              polishing your resume — RefineAI helps you level up.
            </p>
            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition">
              Get started free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
