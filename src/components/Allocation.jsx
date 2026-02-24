import React, { useState } from 'react';
import { 
  PlusCircle, MinusCircle, ChevronDown, Percent, 
  Flame, ShieldCheck, Umbrella, ArrowLeft 
} from 'lucide-react';

export default function Allocation({ onNavigate, data, setData, interval }) {
  const [activeAcc, setActiveAcc] = useState(null);

  // Checks if any meaningful data has been entered to enable buttons [cite: 2026-02-12-2026-02-21]
  const hasData = () => {
    return Object.values(data).some(category => 
      category.some(item => item.desc.trim() !== '' && (item.p > 0 || item.a > 0))
    );
  };

  const updateVal = (cat, idx, field, val) => {
    if ((field === 'p' || field === 'a') && val !== '' && !/^\d*\.?\d*$/.test(val)) {
      return;
    }
    const newData = { ...data };
    newData[cat][idx][field] = field === 'desc' ? val : (val === '' ? 0 : parseFloat(val));
    setData(newData);
  };

  const addItem = (e, key) => {
    e.stopPropagation();
    setData({ ...data, [key]: [...data[key], { desc: '', p: 0, a: 0 }] });
    setActiveAcc(key);
  };

  const removeItem = (key, idx) => {
    const newData = { ...data };
    // Only remove if there's more than one row to keep the accordion populated [cite: 2026-02-12-2026-02-21]
    if (newData[key].length > 1) {
      newData[key].splice(idx, 1);
      setData(newData);
    } else {
      // Clear the last row instead of deleting it [cite: 2026-02-12-2026-02-21]
      newData[key][0] = { desc: '', p: 0, a: 0 };
      setData(newData);
    }
  };

  const handleSaveProgress = () => {
    if (hasData()) {
      alert("Data saved successfully!");
    }
  };

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row bg-white overflow-x-hidden lg:overflow-hidden font-sans">
      
      {/* LEFT SECTION: Scenario Cards */}
      <div className="flex-1 bg-[#fcfcfc] p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-100">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-2">Smart Allocation</h2>
          <p className="text-gray-400 text-xs sm:text-sm font-medium">Dynamic analysis based on entries.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl">
          {[
            { h: "Growth Analysis", p: <>Track exactly how much your <span className="text-green-500 font-bold">Digital Assets</span> grow.</>, i: <Percent />, c: "text-green-500", bg: "bg-green-50" },
            { h: "Debt Control", p: <>Monitoring <span className="text-red-500 font-bold">Mortgage & Interests</span> helps.</>, i: <Flame />, c: "text-red-500", bg: "bg-red-50" },
            { h: "Fixed Protection", p: "Ensure Taxes & Utilities don't exceed limits.", i: <ShieldCheck />, c: "text-[#6a5acd]", bg: "bg-purple-50" },
            { h: "Emergency Safety", p: "Watch your Fund progress reach 100%.", i: <Umbrella />, c: "text-orange-500", bg: "bg-orange-50" }
          ].map((v, i) => (
            <div key={i} className="bg-white p-6 sm:p-10 rounded-[30px] sm:rounded-[45px] shadow-sm flex flex-col items-start border border-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${v.bg} ${v.c} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-sm group-hover:rotate-6 transition-transform`}>{v.i}</div>
              <h6 className="font-black text-lg sm:text-xl mb-2 text-gray-800">{v.h}</h6>
              <p className="text-[12px] sm:text-[13px] text-gray-400 leading-relaxed font-medium">{v.p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION: Dynamic Table */}
      <div className="lg:w-[48%] p-6 sm:p-10 lg:p-14 bg-white overflow-y-auto flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl font-black text-[#6a5acd] mb-8 lg:mb-10 capitalize tracking-tighter text-center lg:text-left">
          {interval} Plan
        </h2>
        
        <div className="space-y-4 flex-1">
          {['Inc', 'Bil', 'Deb', 'Sav'].map(key => (
            <div key={key} className="border-2 border-gray-50 rounded-[25px] overflow-hidden shadow-sm">
              <button 
                onClick={() => setActiveAcc(activeAcc === key ? null : key)}
                className="w-full bg-[#f0effc] p-4 sm:p-5 flex justify-between items-center text-[#6a5acd] font-black uppercase text-[10px] sm:text-[12px] tracking-widest"
              >
                {key === 'Inc' ? 'Income' : key === 'Bil' ? 'Bills' : key === 'Deb' ? 'Debt' : 'Savings'}
                <div className="flex gap-3 sm:gap-4 items-center">
                  <PlusCircle size={20} className="sm:w-[22px] cursor-pointer hover:scale-110" onClick={(e) => addItem(e, key)} />
                  <ChevronDown size={20} className={`sm:w-[22px] transition-transform duration-300 ${activeAcc === key ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {activeAcc === key && (
                <div className="p-3 sm:p-4 bg-white space-y-3 animate-in slide-in-from-top-2">
                  {data[key].map((item, i) => (
                    <div key={i} className="flex gap-2 items-center w-full">
                      <input 
                        className="flex-[2] min-w-0 p-2 sm:p-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-[12px] sm:text-sm font-bold outline-none focus:border-[#6a5acd] transition-all" 
                        value={item.desc} 
                        onChange={e => updateVal(key, i, 'desc', e.target.value)} 
                        placeholder="Desc"
                      />
                      <input 
                        type="text" 
                        className="w-16 sm:w-20 lg:w-24 p-2 sm:p-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-[12px] sm:text-sm text-center font-black outline-none" 
                        value={item.p === 0 ? '' : item.p} 
                        onChange={e => updateVal(key, i, 'p', e.target.value)} 
                        placeholder="Plan" 
                      />
                      <input 
                        type="text" 
                        className="w-16 sm:w-20 lg:w-24 p-2 sm:p-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-[12px] sm:text-sm text-center font-black outline-none" 
                        value={item.a === 0 ? '' : item.a} 
                        onChange={e => updateVal(key, i, 'a', e.target.value)} 
                        placeholder="Act" 
                      />
                      <div className="w-8 sm:w-10 flex justify-end">
                        <button onClick={() => removeItem(key, i)} className="p-1 text-red-400 hover:text-red-600 transition-all active:scale-90">
                          <MinusCircle size={20} className="sm:w-[24px]" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ACTIONS SECTION */}
        <div className="mt-8 lg:mt-10 flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              disabled={!hasData()}
              onClick={handleSaveProgress}
              className={`flex-1 py-4 rounded-full font-black uppercase text-[10px] sm:text-xs tracking-widest transition-all shadow-md
                ${hasData() ? 'bg-white text-[#6a5acd] border-2 border-[#6a5acd] opacity-100 shadow-[#6a5acd]/10' : 'bg-gray-50 text-gray-300 border-2 border-gray-100 opacity-50 cursor-not-allowed'}`}
            >
              Save Progress
            </button>
            <button 
              disabled={!hasData()}
              onClick={() => onNavigate(5)} 
              className={`flex-1 py-4 rounded-full font-black uppercase text-[10px] sm:text-xs tracking-widest transition-all shadow-xl
                ${hasData() ? 'bg-[#6a5acd] text-white opacity-100 shadow-[#6a5acd]/40' : 'bg-[#b1a6e0] text-white opacity-40 cursor-not-allowed'}`}
            >
              Finalize & Export
            </button>
          </div>

          <button 
            onClick={() => onNavigate(3)} 
            className="flex items-center gap-2 text-gray-400 font-black text-[12px] sm:text-sm uppercase tracking-widest hover:text-[#6a5acd] transition-colors"
          >
            <ArrowLeft size={16} /> <span>Previous Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}