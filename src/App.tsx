import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import { LoginPage } from "./components/LoginPage";
import Dashboard from "./pages/Dashboard";
import Klinikalar from "./pages/Klinikalar";
import Hekimler from "./pages/Hekimler";
import Aptekler from "./pages/Aptekler";
import Musteriler from "./pages/Musteriler";
import Sifarisler from "./pages/Sifarisler";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giriş vəziyyətini yoxla
    const checkAuthStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      const loginTime = localStorage.getItem('loginTime');
      
      if (loginStatus === 'true' && loginTime) {
        // 24 saat ərzində giriş etibliyi yoxla
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (currentTime - parseInt(loginTime) < twentyFourHours) {
          setIsLoggedIn(true);
        } else {
          // Vaxt bitib, çıxış et
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('loginTime');
          setIsLoggedIn(false);
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-pharmacy-light to-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pharmacy-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginPage onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminLayout onLogout={handleLogout}><Dashboard /></AdminLayout>} />
            <Route path="/klinikalar" element={<AdminLayout onLogout={handleLogout}><Klinikalar /></AdminLayout>} />
            <Route path="/hekimler" element={<AdminLayout onLogout={handleLogout}><Hekimler /></AdminLayout>} />
            <Route path="/aptekler" element={<AdminLayout onLogout={handleLogout}><Aptekler /></AdminLayout>} />
            <Route path="/musteriler" element={<AdminLayout onLogout={handleLogout}><Musteriler /></AdminLayout>} />
            <Route path="/sifarisler" element={<AdminLayout onLogout={handleLogout}><Sifarisler /></AdminLayout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
