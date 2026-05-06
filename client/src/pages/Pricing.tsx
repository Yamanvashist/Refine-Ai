import axios from "axios";
import { useState } from "react";
import useAuthStore from "../store/AuthStore";
import toast from "react-hot-toast";
import {api} from "../api/api"

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
      features: [
        "5 Code analyses/day",
        "2 Resume scans/day",
        "Basic AI feedback",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "₹299/mo",
      amount: 299,
      credits: 50,
      desc: "For serious builders",
      features: [
        "Unlimited Code Analysis",
        "10 Resume Reviews/day",
        "Better AI accuracy",
        "Faster responses",
      ],
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Ultimate",
      price: "₹599/mo",
      amount: 599,
      credits: 120,
      desc: "For cracked devs",
      features: [
        "Unlimited everything",
        "Priority AI (no waiting)",
        "Deep resume insights",
        "Early features access",
      ],
      highlighted: false,
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

      console.log("CREATED ORDER ->", data.id);

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
          console.log("RAZOR RESPONSE ->", response);

          try {
            const verifyRes = await api.post(
              "/order/verify-payment",
              response,
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              toast.success("Payment successful ");

              if (user) {
                setUser({
                  ...user,
                  credits: user.credits + plan.credits,
                });
              }
            }
          } catch (err) {
            console.log("VERIFY ERROR", err);
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            toast("Payment cancelled");
          },
        },

        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log("PAYMENT ERROR ->", err);
      toast.error("Payment failed");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold tracking-tight">RefineAI Pricing</h1>
        <p className="text-white/60 mt-3 text-lg">
          Simple pricing. No confusion. Just build.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-2xl p-7 border flex flex-col gap-5 transition duration-300
              ${
                plan.highlighted
                  ? "bg-linear-to-b from-purple-600/20 to-indigo-600/10 border-purple-500 scale-105 shadow-xl shadow-purple-900/40"
                  : "bg-white/5 border-white/10 hover:border-purple-400 hover:-translate-y-1"
              }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-purple-500 px-3 py-1 rounded-full">
                {plan.badge}
              </div>
            )}

            <h2 className="text-xl font-semibold">{plan.name}</h2>

            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== "₹0" && (
                <span className="text-white/50 text-sm">/month</span>
              )}
            </div>

            <p className="text-white/60 text-sm">{plan.desc}</p>

            <ul className="flex flex-col gap-2 text-sm mt-2">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-green-400">✔</span> {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePayment(plan)}
              disabled={loadingPlan === plan.name}
              className={`mt-auto py-3 rounded-xl font-medium transition
                ${
                  plan.highlighted
                    ? "bg-linear-to-r from-purple-500 to-indigo-500 hover:opacity-90"
                    : "bg-white text-black hover:bg-white/80"
                }
                ${
                  loadingPlan === plan.name
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
            >
              {loadingPlan === plan.name
                ? "Processing..."
                : plan.highlighted
                ? "Upgrade Now"
                : "Get Started"}
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Resume Analysis Pricing
        </h2>

        <p className="text-white/60 mb-6">
          Not ready for a plan? Pay per use.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <h3 className="text-lg font-medium">Single Resume Scan</h3>
            <p className="text-white/50 text-sm">
              Get ATS score + improvements + skills gap
            </p>
          </div>

          <div className="text-2xl font-bold text-purple-400">
            ₹19 / scan
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;