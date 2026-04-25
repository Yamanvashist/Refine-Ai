import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

interface AnalysisResult {
    score: number;
    issues: string[];
    suggestions: string[];
    improvedCode: string;
}

interface Analysis {
    _id: string;
    code: string;
    result: string;
    createdAt: string;
    score?: number;
}

interface AIState {
    loading: boolean;
    error: string | null;

    result: AnalysisResult | null;
    history: Analysis[];

    analyzeCode: (code: string) => Promise<void>;
    getHistory: () => Promise<void>;
    getSingle: (id: string) => Promise<Analysis | null>;
    deleteAnalysis: (id: string) => Promise<void>;
}

const useAIStore = create<AIState>((set) => ({

    loading: false,
    error: null,

    result: null,
    history: [],

    analyzeCode: async (code) => {
        try {
            set({ loading: true, error: null });

            const { data } = await axios.post("http://localhost:4000/ai/analyze", { code });

            set({ result: data.data, loading: false });

        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Something went wrong",
                loading: false
            });
        }
    },

    getHistory: async () => {
        try {
            set({ loading: true });

            const { data } = await axios.get("http://localhost:4000/ai/analysis");

            set({ history: data.data, loading: false });

        } catch (err: any) {
            set({
                error: err.response?.data?.message,
                loading: false
            });
        }
    },

    getSingle: async (id) => {
        try {
            set({ loading: true });

            const { data } = await axios.get(`http://localhost:4000/ai/analysis/${id}`);

            set({ loading: false });

            return data.data;

        } catch (err: any) {
            set({
                error: err.response?.data?.message,
                loading: false
            });
            return null;
        }
    },

    deleteAnalysis: async (id) => {
        try {
            await axios.delete(`http://localhost:4000/ai/analysis/${id}`);

            set((state) => ({
                history: state.history.filter(item => item._id !== id)
            }));

        } catch (err: any) {
            set({
                error: err.response?.data?.message
            });
        }
    }

}));

export default useAIStore;