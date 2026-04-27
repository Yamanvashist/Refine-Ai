import { Sparkles, Code2, FileText, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight">
          About <span className="text-purple-500">RefineAI</span>
        </h1>
        <p className="text-white/60 mt-4 text-lg">
          Your AI-powered assistant for smarter coding and better resumes.
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Card 1 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-purple-500/40 transition">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="text-purple-400" />
            <h2 className="text-xl font-semibold">Code Analysis</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            RefineAI analyzes your code using advanced AI models and gives you
            a score, identifies issues, and suggests improvements — instantly.
            It even provides optimized code so you can learn and improve faster.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-purple-500/40 transition">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-purple-400" />
            <h2 className="text-xl font-semibold">Resume Analysis</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Get ATS scores, skill gap analysis, and actionable suggestions to
            improve your resume. Designed to help you stand out and get hired
            faster.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-purple-500/40 transition">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-purple-400" />
            <h2 className="text-xl font-semibold">Credits System</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Every analysis uses credits. You get free credits on signup and can
            upgrade anytime. Payments are securely handled via Razorpay.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-purple-500/40 transition">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-purple-400" />
            <h2 className="text-xl font-semibold">Why RefineAI?</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Built for developers and students who want real feedback — not just
            generic AI responses. Fast, clean, and actually useful.
          </p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Built for People Who Want to Improve
        </h2>
        <p className="text-white/60">
          Whether you're preparing for interviews, improving your coding skills,
          or polishing your resume — RefineAI helps you level up.
        </p>
      </div>
    </div>
  );
};

export default About;