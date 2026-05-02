import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import useAuthStore from "./store/AuthStore";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import History from "./pages/History";
import SingleAnalysis from "./pages/SingleAnalysis";
import Resume from "./pages/Resume";
import About from "./pages/About";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      
      <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
      
      <p className="mt-4 text-lg tracking-wide">Loading...</p>
    
    </div>
  );
}

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
          },
        }}
      />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home></Home>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="/analysis/:id" element={<SingleAnalysis />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
