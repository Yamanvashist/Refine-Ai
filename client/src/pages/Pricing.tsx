import { useState } from "react";
import useAuthStore from "../store/AuthStore";
import toast from "react-hot-toast";
import { api } from "../api/api";
import {
  Check, Sparkles, Zap, Crown, Loader2, ArrowRight, ShieldCheck,
  CreditCard, HelpCircle, Star,
} from "lucide-react";

const Pricing = () => {
  const { user, setUser } = useAuthStore();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      amount: 0,
      credits: 0,
      desc: "Try the core features",
      icon: Sparkles,
      features: ["5 Code analyses/day", "2 Resume scans/day", "Basic AI feedback"],
      highlighted: false,
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "₹299",
      amount: 299,
      credits: 50,
      desc: "For serious builders",
      icon: Zap,
      features: [
        "Unlimited Code Analysis",
        "10 Resume Reviews/day",
        "Better AI accuracy",
        "Faster responses",
      ],
      highlighted: true,
      badge: "Most Popular",
      cta: "Upgrade to Pro",
    },
    {
      name: "Ultimate",
      price: "₹599",
      amount: 599,
      credits: 120,
      desc: "For cracked devs",
      icon: Crown,
      features: [
        "Unlimited everything",
        "Priority AI (no waiting)",
        "Deep resume insights",
        "Early features access",
      ],
      highlighted: false,
      cta: "Go Ultimate",
    },
  ];

  const handlePayment = async (plan: any) => {
    if (plan.amount === 0) return;
    if (loadingPlan) return;

    try {
      setLoadingPlan(plan.name);

      const { data } = await api.post(
        "/order/create-order",
        { amount: plan.amount },
        { withCredentials: true }
      );

      if (!(window as any).Razorpay) {
        toast.error("Razorpay not loaded. Refresh please");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "RefineAI",
        description: "Buy Credits",
        order_id: data.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await api.post(
              "/order/verify-payment",
              response,
              { withCredentials: true }
            );
            if (verifyRes.data.success) {
              toast.success("Payment successful");
              if (user) {
                setUser({ ...user, credits: user.credits + plan.credits });
              }
            }
          } catch (err) {
            toast.error("Payment verification failed");
            console.log(err)
          }
        },
        modal: {
          ondismiss: function () {
            toast("Payment cancelled");
          },
        },
        theme: { color: "#7c3aed" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment failed");
      console.log(err)
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-125 rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute top-1/2 -left-40 w-100 h-100 rounded-full bg-fuchsia-600/15 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-100 h-100 rounded-full bg-indigo-600/15 blur-[120px]" />
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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6">
            <CreditCard className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium text-white/70">Pricing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Simple pricing.
            <br />
            <span className="bg-linear-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              No confusion.
            </span>
          </h1>
          <p className="text-white/60 mt-6 text-lg max-w-xl mx-auto">
            Choose a plan that fits your hustle. Cancel anytime. No hidden fees.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isLoading = loadingPlan === plan.name;
            return (
              <div
                key={plan.name}
                className={`relative group rounded-3xl p-px transition-all duration-500 ${
                  plan.highlighted
                    ? "bg-linear-to-b from-purple-500 via-fuchsia-500/60 to-purple-500/20 md:-translate-y-4"
                    : "bg-linear-to-br from-white/15 via-white/5 to-transparent hover:from-purple-500/40"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-linear-to-r from-purple-500 to-fuchsia-500 px-3 py-1 rounded-full shadow-lg shadow-purple-500/40">
                    <Star className="w-3 h-3 fill-white" />
                    {plan.badge}
                  </div>
                )}

                <div
                  className={`relative h-full rounded-3xl p-8 backdrop-blur-xl flex flex-col gap-6 overflow-hidden ${
                    plan.highlighted
                      ? "bg-linear-to-b from-zinc-950 via-purple-950/30 to-zinc-950"
                      : "bg-zinc-950/80"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full" />
                  )}

                  <div className="relative flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${
                        plan.highlighted
                          ? "bg-linear-to-br from-purple-500/30 to-fuchsia-500/20 border-purple-400/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          plan.highlighted ? "text-purple-200" : "text-white/70"
                        }`}
                      />
                    </div>
                    <h2 className="text-lg font-semibold">{plan.name}</h2>
                  </div>

                  <div className="relative">
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-bold tracking-tight">
                        {plan.price}
                      </span>
                      {plan.amount > 0 && (
                        <span className="text-white/50 text-sm pb-2">/month</span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm mt-2">{plan.desc}</p>
                  </div>

                  <div className="relative h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                  <ul className="relative flex flex-col gap-3 text-sm">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className={`shrink-0 mt-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                            plan.highlighted
                              ? "bg-purple-500/30 border border-purple-400/40"
                              : "bg-white/5 border border-white/10"
                          }`}
                        >
                          <Check
                            className={`w-2.5 h-2.5 ${
                              plan.highlighted ? "text-purple-200" : "text-white/70"
                            }`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-white/80">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePayment(plan)}
                    disabled={isLoading}
                    className={`relative mt-auto group/btn overflow-hidden flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed ${
                      plan.highlighted
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    {plan.highlighted && (
                      <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    )}
                    <span className="relative flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {plan.cta}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {[
            { icon: ShieldCheck, t: "Secure payments", d: "Razorpay encrypted checkout" },
            { icon: Zap, t: "Instant credits", d: "Activated the moment you pay" },
            { icon: HelpCircle, t: "Cancel anytime", d: "No lock-in, no hidden fees" },
          ].map((item) => (
            <div
              key={item.t}
              className="flex items-center gap-4 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-xl p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <item.icon className="w-4.5 h-4.5 text-purple-300" />
              </div>
              <div>
                <div className="text-sm font-semibold">{item.t}</div>
                <div className="text-xs text-white/55">{item.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Frequently asked</h2>
            <p className="text-white/60 mt-2 text-sm">
              Quick answers to common questions.
            </p>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "How do credits work?",
                a: "Each analysis (code or resume) consumes credits. Paid plans top up your balance every month.",
              },
              {
                q: "Can I switch plans later?",
                a: "Yes — upgrade or downgrade anytime. Changes take effect on your next billing cycle.",
              },
              {
                q: "Is my payment information safe?",
                a: "Absolutely. Payments are processed by Razorpay with bank-grade encryption. We never store card data.",
              },
              {
                q: "Do unused credits roll over?",
                a: "Credits reset each month so you always start fresh on your plan.",
              },
            ].map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white/3 border border-white/10 backdrop-blur-xl p-5 hover:border-purple-500/30 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-sm">{f.q}</span>
                  <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-open:rotate-45 transition-transform">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
