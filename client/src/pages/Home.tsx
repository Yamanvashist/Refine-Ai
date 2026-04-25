import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: "AI-Powered Flow",
      desc: "Let AI help you structure your work automatically.",
    },
    {
      title: "Lightning Fast",
      desc: "No lag, no delay — just instant interaction.",
    },
    {
      title: "Minimal Design",
      desc: "Zero clutter UI so your brain doesn't suffer.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Paste Your Content",
      desc: "Drop in your code snippet or upload your resume PDF — no formatting required.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "AI Analyzes & Refines",
      desc: "Our model scans for bugs, weak spots, and missed opportunities — then rewrites with precision.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Get Actionable Output",
      desc: "Receive improved code or a scored resume with specific, targeted suggestions you can act on immediately.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
  ];

  const tools = [
    {
      label: "Code Refiner",
      tag: "Dev Tool",
      tagColor: "from-violet-500 to-fuchsia-500",
      border: "hover:border-violet-400/40 hover:shadow-violet-500/10",
      accent: "text-violet-400",
      description:
        "Paste any code — JavaScript, Python, TypeScript, and more. Refine AI rewrites it to be cleaner, faster, and production-ready.",
      points: ["Bug detection & auto-fix", "Performance optimization", "Best-practice rewrites", "Multi-language support"],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
      ),
    },
    {
      label: "Resume Analyzer",
      tag: "Career Tool",
      tagColor: "from-cyan-500 to-blue-500",
      border: "hover:border-cyan-400/40 hover:shadow-cyan-500/10",
      accent: "text-cyan-400",
      description:
        "Upload your resume and get an ATS score, tone analysis, and line-by-line feedback to stand out in any applicant pool.",
      points: ["ATS compatibility score", "Keyword gap analysis", "Tone & clarity feedback", "Section-by-section rating"],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center bg-cover bg-no-repeat justify-center px-6 bg-[#050505] text-white"
    >
      <main className="w-full max-w-6xl flex flex-col items-center text-center">

        <section className="flex flex-col items-center justify-center py-20 sm:py-28">
          <p className="mb-4 bg-purple-500 text-white rounded-2xl py-1 px-4 text-sm font-medium tracking-[0.35em] uppercase">
            Refine AI
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl text-white">
            Refine <span className="">Your</span> Career
          </h1>
          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl bg-linear-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
            Build faster with{" "}
            <span className="text-zinc-300">Refine AI</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm sm:text-base text-zinc-400">
            A minimal AI-powered workspace to organize ideas, track history,
            and build workflows without the noise. Fast, clean, focused.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-full cursor-pointer bg-linear-to-r from-violet-500 to-fuchsia-500 px-7 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-90"
            >
              Get Started
            </button>
            <button className="rounded-full cursor-pointer border border-white/10 bg-white/5 px-7 py-3 text-zinc-200 backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white">
              Explore Features
            </button>
          </div>
        </section>

        <section className="grid w-full gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/8 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/8 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="w-full pb-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-violet-400">
            Simple Process
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl text-white">
            How It Works
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
            Three steps from raw input to polished output — no setup, no learning curve.
          </p>

          <div className="mt-12 relative grid gap-6 sm:grid-cols-3">
            <div className="hidden sm:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

            {steps.map((s) => (
              <div
                key={s.step}
                className="relative flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm transition hover:-translate-y-1 hover:border-fuchsia-400/30 hover:shadow-lg hover:shadow-fuchsia-500/10"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300">
                  {s.icon}
                </div>
                <span className="text-xs font-bold tracking-widest text-zinc-600">
                  {s.step}
                </span>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full pb-28">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400">
            Core Tools
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl text-white">
            What You Can Do
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto">
            Two focused tools built to take your code and career to the next level.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.label}
                className={`relative rounded-2xl border border-white/8 bg-white/5 p-8 text-left backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg ${tool.border}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${tool.tagColor} bg-opacity-10 ${tool.accent}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <span className={`text-xs font-semibold tracking-widest uppercase ${tool.accent}`}>
                      {tool.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {tool.label}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {tool.description}
                </p>

                <ul className="space-y-2">
                  {tool.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tool.tagColor} flex-shrink-0`} />
                      {pt}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("/dashboard")}
                  className={`mt-8 text-sm font-semibold ${tool.accent} hover:underline underline-offset-4 transition flex items-center gap-1 cursor-pointer`}
                >
                  Try it now
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;