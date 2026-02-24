import React, { useState } from 'react';
import Hero from './components/Hero';
import Auth from './components/Auth';
import ProfileSetup from './components/ProfileSetup';
import Allocation from './components/Allocation';
import Dashboard from './components/Dashboard';

export default function App() {
  const [step, setStep] = useState(1); 
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', isExisting: false });
  
  // Persist configuration for Page 3
  const [config, setConfig] = useState({ 
    interval: '', 
    dates: { start: '', end: '' }, 
    geo: { region: '', currency: '' },
    planningFor: 'single'
  });
  
  // Default Row Logic for Page 4
  const defaultRow = { desc: '', p: 0, a: 0 };
  const [budgetData, setBudgetData] = useState({ 
    Inc: [{ ...defaultRow }], 
    Bil: [{ ...defaultRow }], 
    Deb: [{ ...defaultRow }], 
    Sav: [{ ...defaultRow }] 
  });

  const handleAuth = (authData) => {
    const db = JSON.parse(localStorage.getItem('user_db') || "[]");
    if (authData.isExisting) {
      const found = db.find(u => u.email.toLowerCase() === authData.email.toLowerCase());
      if (!found) {
        alert("New to page, let's login!"); 
        return;
      }
      setUser({ ...found, isExisting: true });
    } else {
      const updatedDB = [...db, authData];
      localStorage.setItem('user_db', JSON.stringify(updatedDB));
      setUser(authData);
    }
    setStep(3);
  };

  const handleConfigUpdate = (newConfig) => {
    // Only reset budget data if the interval type actually changes [cite: 2026-02-12-2026-02-21]
    if (newConfig.interval !== config.interval) {
      setBudgetData({ 
        Inc: [{ ...defaultRow }], Bil: [{ ...defaultRow }], 
        Deb: [{ ...defaultRow }], Sav: [{ ...defaultRow }] 
      });
    }
    setConfig(newConfig);
  };

  return (
    <main className="w-full min-h-screen bg-white">
      {step === 1 && <Hero onNavigate={setStep} />}
      {step === 2 && <Auth onNavigate={setStep} onAuthSuccess={handleAuth} />}
      
      {/* Pass savedConfig to ProfileSetup to ensure fields stay filled on 'Previous' */}
      {step === 3 && (
        <ProfileSetup 
          onNavigate={setStep} 
          onUpdateConfig={handleConfigUpdate} 
          savedConfig={config} 
        />
      )}
      
      {step === 4 && (
        <Allocation 
          onNavigate={setStep} 
          data={budgetData} 
          setData={setBudgetData} 
          interval={config.interval} 
        />
      )}
      
      {step === 5 && (
        <Dashboard 
          onNavigate={setStep} 
          data={budgetData} 
          config={config} 
          user={user} 
        />
      )}
    </main>
  );
}