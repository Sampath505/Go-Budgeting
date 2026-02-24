import React, { useState, useEffect } from 'react';
import { 
  User, Heart, Users, ArrowRight, ShoppingCart, UserLock, PiggyBank, 
  ChartLine, Handshake, ShieldAlert, UserCog, Divide, Home, GraduationCap, 
  AlertTriangle, Umbrella 
} from 'lucide-react';

const geoMap = {
  "India": "INR", "USA": "USD", "UK": "GBP", "Eurozone": "EUR", 
  "Japan": "JPY", "Australia": "AUD", "Canada": "CAD"
};

export default function ProfileSetup({ onNavigate, onUpdateConfig, savedConfig }) {
  const [planningFor, setPlanningFor] = useState(savedConfig?.planningFor || 'single');
  const [interval, setInterval] = useState(savedConfig?.interval || '');
  const [dates, setDates] = useState(savedConfig?.dates || { start: '', end: '' });
  const [geo, setGeo] = useState(savedConfig?.geo || { region: '', currency: '' });
  const [smartAlert, setSmartAlert] = useState('');

  // Re-validate whenever interval or dates change to catch range errors immediately
  useEffect(() => {
    if (interval && dates.start && dates.end) {
      validateInterval(dates.start, dates.end);
    }
  }, [interval, dates]); // Fixed: Added interval as a dependency [cite: 2026-02-23]

  useEffect(() => {
    if (smartAlert) {
      const timer = setTimeout(() => setSmartAlert(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [smartAlert]);

  const syncGeo = (field, val) => {
    if (field === 'r') {
      setGeo({ region: val, currency: geoMap[val] || '' });
    } else {
      const region = Object.keys(geoMap).find(k => geoMap[k] === val) || '';
      setGeo({ region, currency: val });
    }
  };

  const handleStartDateChange = (e) => {
    const newStart = e.target.value;
    setDates({ ...dates, start: newStart, end: '' });
    setSmartAlert('');
  };

  const handleEndDateChange = (e) => {
    const newEnd = e.target.value;
    if (dates.start && new Date(newEnd) < new Date(dates.start)) {
      setSmartAlert("Select the date from starting date.");
      return;
    }
    setDates({ ...dates, end: newEnd });
  };

  const validateInterval = (startStr, endStr) => {
    const diff = Math.ceil(Math.abs(new Date(endStr) - new Date(startStr)) / (1000 * 60 * 60 * 24));
    
    let err = "";
    if (interval === 'weekly' && diff > 7) err = "Weekly must be ≤ 7 days.";
    else if (interval === 'monthly' && (diff < 8 || diff > 31)) err = "Monthly must be 8-31 days.";
    else if (interval === '6months' && (diff < 32 || diff > 180)) err = "6 Months must be 32-180 days.";
    else if (interval === 'annual' && diff <= 180) err = "Annual must be > 180 days.";
    setSmartAlert(err);
  };

  const isFormValid = interval && dates.start && dates.end && geo.region && smartAlert === "";

  const scenarioData = {
    single: {
      title: "Why Budget Solo?",
      sub: "Master your wealth with autonomy.",
      cards: [
        { h: "Impulse Leaks", p: "Identify 'One-click' habits.", i: <ShoppingCart size={20}/>, c: "text-red-500", bg: "bg-red-50" },
        { h: "Privacy First", p: "Secure private cash flow.", i: <UserLock size={20}/>, c: "text-[#6a5acd]", bg: "bg-purple-100" },
        { h: "Solo Safety Net", p: "Build an Emergency Fund.", i: <PiggyBank size={20}/>, c: "text-green-600", bg: "bg-green-100" },
        { h: "Growth Tracking", p: "Patterns for faster growth.", i: <ChartLine size={20}/>, c: "text-orange-600", bg: "bg-orange-100" }
      ]
    },
    couple: {
      title: "Budgeting for Two",
      sub: "Transparency in relationships.",
      cards: [
        { h: "Harmony", p: "Turn money fights into talks.", i: <Handshake size={20}/>, c: "text-green-600", bg: "bg-green-100" },
        { h: "Trust", p: "Prevent broken trust.", i: <ShieldAlert size={20}/>, c: "text-red-500", bg: "bg-red-100" },
        { h: "Milestones", p: "Collaborate on purchases.", i: <UserCog size={20}/>, c: "text-[#6a5acd]", bg: "bg-purple-100" },
        { h: "Fair Split", p: "Track shared balances.", i: <Divide size={20}/>, c: "text-orange-600", bg: "bg-orange-100" }
      ]
    },
    family: {
      title: "Household Sync",
      sub: "Always on the same page.",
      cards: [
        { h: "Total Sync", p: "Avoid surprise expenses.", i: <Home size={20}/>, c: "text-[#6a5acd]", bg: "bg-purple-100" },
        { h: "Teach Values", p: "Build financial literacy.", i: <GraduationCap size={20}/>, c: "text-green-600", bg: "bg-green-100" },
        { h: "Rising Costs", p: "Stay ahead of bills.", i: <AlertTriangle size={20}/>, c: "text-red-500", bg: "bg-red-100" },
        { h: "Safety", p: "Secure family's future.", i: <Umbrella size={20}/>, c: "text-orange-600", bg: "bg-orange-100" }
      ]
    }
  };

  const currentScenario = scenarioData[planningFor];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white lg:h-screen lg:overflow-hidden font-sans">
      
      {/* 1. LEFT CONFIGURATION SECTION (50%) */}
      <div className="flex-1 p-6 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100 bg-white">
        <h2 className="text-3xl font-black text-[#6a5acd] mb-8 tracking-tight uppercase text-center lg:text-left">Financial Profile</h2>
        
        {/* Persona Selection */}
        <div className="mb-6">
          <label className="font-bold text-gray-800 text-xs mb-3 block uppercase tracking-wider text-center lg:text-left">Whom are you planning for?</label>
          <div className="flex gap-3">
            {[
              { id: 'single', label: 'Individual', icon: <User size={20}/> },
              { id: 'couple', label: 'Partner', icon: <Heart size={20}/> },
              { id: 'family', label: 'Family', icon: <Users size={20}/> }
            ].map(t => (
              <button 
                key={t.id} 
                onClick={() => setPlanningFor(t.id)} 
                className={`flex-1 p-4 sm:p-5 border-2 rounded-2xl flex flex-col items-center gap-1.5 transition-all duration-300 ${planningFor === t.id ? 'border-[#6a5acd] bg-[#f0effc] text-[#6a5acd] shadow-md scale-[1.02]' : 'border-gray-50 bg-white text-gray-300 hover:border-gray-200'}`}
              >
                {t.icon} <span className="font-black text-[10px]">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interval Selection */}
        <div className="mb-6">
          <label className="font-bold text-gray-800 text-xs mb-3 block uppercase tracking-wider text-center lg:text-left">Tracking Interval</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['weekly', 'monthly', '6months', 'annual'].map(i => (
              <button 
                key={i} 
                onClick={() => { setInterval(i); }} 
                className={`py-3 border-2 rounded-xl font-black text-[10px] uppercase tracking-tighter transition-all ${interval === i ? 'bg-[#6a5acd] text-white border-[#6a5acd] shadow-md scale-[1.05]' : 'border-gray-50 text-gray-400 bg-white hover:bg-gray-50'}`}
              >
                {i === '6months' ? '6 Months' : i}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        {interval && (
          <div className="bg-[#f8f7ff] p-5 rounded-2xl mb-6 space-y-4 border border-[#e2e1f9]">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <span className="text-[9px] font-black text-[#6a5acd] uppercase mb-1 block tracking-widest">START DATE</span>
                <input type="date" value={dates.start} className="w-full p-3 border border-transparent rounded-xl text-xs font-bold outline-none focus:border-[#6a5acd] bg-white shadow-sm transition-all" onChange={handleStartDateChange} />
              </div>
              <div className="flex-1">
                <span className="text-[9px] font-black text-[#6a5acd] uppercase mb-1 block tracking-widest">END DATE</span>
                <input type="date" value={dates.end} min={dates.start} className="w-full p-3 border border-transparent rounded-xl text-xs font-bold outline-none focus:border-[#6a5acd] bg-white shadow-sm transition-all" onChange={handleEndDateChange} />
              </div>
            </div>
            {smartAlert && <p className="text-red-600 text-[10px] font-black text-center bg-white py-2 rounded-lg border border-red-100 shadow-sm animate-pulse">{smartAlert}</p>}
          </div>
        )}

        {/* Region & Currency */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-[9px] font-black text-gray-500 uppercase mb-1 block tracking-widest text-center lg:text-left">Region</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-100 font-bold rounded-xl text-xs outline-none focus:border-[#6a5acd] transition-all" value={geo.region} onChange={e => syncGeo('r', e.target.value)}>
              <option value="">Select</option>
              {Object.keys(geoMap).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-500 uppercase mb-1 block tracking-widest text-center lg:text-left">Currency</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-100 font-bold rounded-xl text-xs outline-none focus:border-[#6a5acd] transition-all" value={geo.currency} onChange={e => syncGeo('c', e.target.value)}>
              <option value="">Select</option>
              {Object.values(geoMap).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button 
          disabled={!isFormValid} 
          onClick={() => { onUpdateConfig({ interval, dates, geo, planningFor }); onNavigate(4); }} 
          className={`w-full py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 
            ${isFormValid 
              ? 'bg-[#6a5acd] text-white opacity-100 shadow-[#6a5acd]/30 cursor-pointer' 
              : 'bg-[#b1a6e0] text-white opacity-60 cursor-not-allowed'}`}
        >
          Save & Continue <ArrowRight size={20} />
        </button>
      </div>

      {/* 2. RIGHT SCENARIO SECTION (50%) - FIXED HOVER */}
      <div className="flex-1 bg-[#fcfcfc] p-8 lg:p-16 flex flex-col items-center justify-center lg:overflow-y-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-2 tracking-tighter">{currentScenario.title}</h2>
          <p className="text-gray-500 text-sm lg:text-lg font-bold max-w-sm mx-auto leading-tight">{currentScenario.sub}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full max-w-2xl">
          {currentScenario.cards.map((v, i) => (
            <div key={i} className="group bg-white p-6 lg:p-8 rounded-[36px] shadow-sm flex flex-col items-start border border-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#6a5acd]/20 cursor-default">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${v.bg} ${v.c} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:rotate-6 transition-transform duration-300`}>
                {v.i}
              </div>
              <h6 className="font-black text-lg lg:text-xl mb-1 text-gray-900 tracking-tight group-hover:text-[#6a5acd] transition-colors">
                {v.h}
              </h6>
              <p className="text-[11px] lg:text-xs text-gray-500 font-bold leading-relaxed">
                {v.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}