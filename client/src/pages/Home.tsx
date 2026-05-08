import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Zap,
  LayoutGrid,
  FileText,
  Wand2,
  CheckCircle2,
  Code2,
  UserRound,
  ArrowRight,
  Star,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI-Powered Flow",
      desc: "Let AI help you structure your work automatically.",
      icon: <Sparkles className="w-5 h-5" />,
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Lightning Fast",
      desc: "No lag, no delay — just instant interaction.",
      icon: <Zap className="w-5 h-5" />,
      gradient: "from-amber-400 to-orange-500",
    },
    {
      title: "Minimal Design",
      desc: "Zero clutter UI so your brain doesn't suffer.",
      icon: <LayoutGrid className="w-5 h-5" />,
      gradient: "from-cyan-400 to-blue-500",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Paste Your Content",
      desc: "Drop in your code snippet or upload your resume PDF — no formatting required.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      step: "02",
      title: "AI Analyzes & Refines",
      desc: "Our model scans for bugs, weak spots, and missed opportunities — then rewrites with precision.",
      icon: <Wand2 className="w-6 h-6" />,
    },
    {
      step: "03",
      title: "Get Actionable Output",
      desc: "Receive improved code or a scored resume with specific, targeted suggestions you can act on.",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
  ];

  const tools = [
    {
      label: "Code Refiner",
      href: "/dashboard",
      tag: "Dev Tool",
      tagColor: "from-violet-500 to-fuchsia-500",
      border: "hover:border-violet-400/40 hover:shadow-violet-500/20",
      accent: "text-violet-300",
      glow: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
      description:
        "Paste any code — JavaScript, Python, TypeScript, and more. Refine AI rewrites it to be cleaner, faster, and production-ready.",
      points: [
        "Bug detection & auto-fix",
        "Performance optimization",
        "Best-practice rewrites",
        "Multi-language support",
      ],
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      label: "Resume Analyzer",
      href: "/resume",
      tag: "Career Tool",
      tagColor: "from-cyan-500 to-blue-500",
      border: "hover:border-cyan-400/40 hover:shadow-cyan-500/20",
      accent: "text-cyan-300",
      glow: "from-cyan-500/20 via-blue-500/10 to-transparent",
      description:
        "Upload your resume and get an ATS score, tone analysis, and line-by-line feedback to stand out in any applicant pool.",
      points: [
        "ATS compatibility score",
        "Keyword gap analysis",
        "Tone & clarity feedback",
        "Section-by-section rating",
      ],
      icon: <UserRound className="w-5 h-5" />,
    },
  ];

  const stats = [
    { value: "12K+", label: "Active Users" },
    { value: "98%", label: "Accuracy" },
    { value: "<1s", label: "Avg Response" },
    { value: "4.9★", label: "User Rating" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-100 w-100 rounded-full bg-fuchsia-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-112.5 w-112.5 rounded-full bg-cyan-600/15 blur-[120px]" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        {/* HERO */}
        <section className="flex flex-col items-center justify-center py-20 sm:py-28">
          <div className="group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider text-zinc-300 backdrop-blur-sm transition hover:border-violet-400/40 hover:bg-violet-500/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            <span className="uppercase tracking-[0.25em]">Refine AI · v2.0</span>
            <ArrowRight className="w-3 h-3 transition group-hover:translate-x-0.5" />
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="text-white">Refine Your</span>{" "}
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Career
            </span>
          </h1>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl text-zinc-400">
            Build faster with{" "}
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              AI precision
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            A minimal AI-powered workspace to refine code, polish resumes, and
            ship workflows without the noise. Fast, clean, focused.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/dashboard")}
              className="group relative overflow-hidden rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:shadow-fuchsia-500/50 hover:scale-[1.02] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Get Started
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <button className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 font-medium text-zinc-200 backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white cursor-pointer">
              <Zap className="w-4 h-4" />
              Explore Features
            </button>
          </div>

          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#0a0a0a]/60 p-5 transition hover:bg-violet-500/5"
              >
                <div className="bg-linear-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-2xl font-bold text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid w-full gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 text-left backdrop-blur-sm transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/6 hover:shadow-xl hover:shadow-violet-500/10"
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${item.gradient} text-white shadow-lg`}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
              <div
                className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br ${item.gradient} opacity-0 blur-3xl transition group-hover:opacity-20`}
              />
            </div>
          ))}
        </section>

        <section className="w-full pb-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            Simple Process
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
            Three steps from raw input to polished output — no setup, no learning curve.
          </p>

          <div className="relative mt-14 grid gap-6 sm:grid-cols-3">
            <div className="absolute left-[16.5%] right-[16.5%] top-10 hidden h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent sm:block" />

            {steps.map((s) => (
              <div
                key={s.step}
                className="group relative flex flex-col p-3 items-center gap-3 rounded-2xl border border-white/10 bg-white/3backdrop-blur-sm transition hover:-translate-y-1 hover:border-fuchsia-400/30 bg-white/6 hover:shadow-xl hover:shadow-fuchsia-500/10"
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-200 transition group-hover:scale-110">
                  {s.icon}
                  <span className="absolute -inset-1 rounded-2xl bg-linear-to-br from-violet-500/30 to-fuchsia-500/30 opacity-0 blur transition group-hover:opacity-100" />
                </div>
                <span className="text-xs font-bold tracking-[0.3em] text-zinc-500">
                  STEP {s.step}
                </span>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full pb-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Core Tools
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What You Can Do
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
            Two focused tools built to take your code and career to the next level.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.label}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-8 text-left backdrop-blur-sm transition hover:-translate-y-1 ${tool.border}`}
              >
                <div
                  className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-linear-to-br ${tool.glow} opacity-60 blur-3xl transition group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${tool.tagColor} text-white shadow-lg`}
                    >
                      {tool.icon}
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${tool.accent}`}
                      >
                        {tool.tag}
                      </span>
                      <h3 className="text-lg font-bold leading-tight text-white">
                        {tool.label}
                      </h3>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                    {tool.description}
                  </p>

                  <ul className="space-y-2.5">
                    {tool.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-2.5 text-sm text-zinc-300"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${tool.tagColor}`}
                        >
                          <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate(tool.href)}
                    className={`group/btn mt-8 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold ${tool.accent} transition hover:border-white/20 hover:bg-white/10 cursor-pointer`}
                  >
                    Try it now
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/1 p-10 backdrop-blur-sm">
            <div className="absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="max-w-2xl text-lg font-medium text-zinc-200 sm:text-xl">
                "Refine AI cut my code review time in half and helped me land
                3 interviews after rewriting my resume. It just works."
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">Alex Mercer</div>
                  <div className="text-xs text-zinc-500">Frontend Engineer @ Stripe</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pb-28">
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/20 p-12 text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[32px_32px]" />
            <div className="relative">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-violet-300" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to refine your workflow?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-300 sm:text-base">
                Join thousands of developers and job-seekers shipping better work, faster.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-black shadow-lg transition hover:scale-[1.02] cursor-pointer"
              >
                Start for free
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;