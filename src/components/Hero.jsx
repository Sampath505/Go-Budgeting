import React, { useState } from 'react';
import { 
  PieChart, Target, HandHelping, Umbrella, Star, ChevronDown 
} from 'lucide-react';

const reviews = [
    { name: "Rahul S.", stars: 5, text: "The emergency fund tracker changed my life." },
    { name: "Sita K.", stars: 4, text: "Finally an app that understands irregular income." },
    { name: "James L.", stars: 5, text: "Paid off my loans early with this tool." },
    { name: "Meera B.", stars: 5, text: "The collaborative mode is perfect for me and my spouse." },
    { name: "Ananya R.", stars: 4, text: "Saved $3000 in just three months. Highly recommend!" },
    { name: "Oscar M.", stars: 5, text: "Professional tools with a beginner-friendly layout." },
    { name: "Sophie T.", stars: 5, text: "Finances are finally stress-free." },
    { name: "Tanya P.", stars: 5, text: "Automation categorization works like a charm." },
    { name: "Kevin W.", stars: 5, text: "Best budgeting tool I've ever used." },
    { name: "Rohan V.", stars: 4, text: "Great updates and solid support." },
    { name: "Linda C.", stars: 5, text: "Exactly what I needed for my small business." },
    { name: "David G.", stars: 5, text: "Truly a privacy-first experience." }
];

const importanceMetrics = [
  { c: "#0d6efd", t: "Financial Awareness", d: "Identify spending patterns and reveal essential costs." },
  { c: "#198754", t: "Control Spending", d: "Structured plans prevent overspending and impulsive buys." },
  { c: "#dc3545", t: "Debt Management", d: "Assist in reducing debt by limiting unnecessary costs." },
  { c: "#ffc107", t: "Emergency Preparedness", d: "Build a safety net for life's unexpected surprises." },
  { c: "#0dcaf0", t: "Goal Savings", d: "Save systematically for homes, cars, or vacations." },
  { c: "#212529", t: "Reduced Stress", d: "Gain peace of mind through financial security and stability." },
  { c: "#6c757d", t: "Business Growth", d: "Manage organizational cash flow professionally." }
];

const budgetTypes = [
    { 
      title: "Method & Structure", 
      items: [
        { b: "Zero-Based Budgeting", d: "Every dollar assigned until zero." },
        { b: "Incremental Budgeting", d: "Adjusts from previous periods." },
        { b: "Master Budget", d: "Consolidates all department budgets." }
      ] 
    },
    { 
      title: "Functional & Operational", 
      items: [
        { b: "Operating Budget", d: "Forecasts daily income and expenses." },
        { b: "Cash Budget", d: "Tracks physical cash liquidity." }
      ] 
    },
    { 
      title: "Government & Specialized", 
      items: [
        { b: "Balanced Budget", d: "Total revenue equals expenditure." },
        { b: "Performance Budgeting", d: "Allocates based on outcomes." }
      ] 
    }
];

export default function Hero({ onNavigate }) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <div className="w-full animate-in fade-in duration-700 bg-white overflow-x-hidden font-sans">
      
      {/* 1. STICKY HEADER - Balanced Logo and Text */}
      <header className="w-full flex items-center justify-center py-8 border-b border-gray-50 gap-6 bg-white sticky top-0 z-50">
        <img src="/logo-png.jpg" alt="Logo" className="h-12 lg:h-16 w-auto object-contain shrink-0" />
        <h1 className="text-3xl lg:text-5xl font-black text-[#b1a6e0] tracking-tighter leading-none flex items-center">
          Go Budgeting
        </h1>
      </header>

      {/* 2. HERO CONTENT */}
      <section className="w-full py-10 text-center px-6">
        <p className="text-xl lg:text-3xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
          Tell your money where to go, instead of wondering where it went.
        </p>
        <button 
          onClick={() => onNavigate(2)} 
          className="bg-[#6a5acd] text-white px-16 py-5 rounded-full font-black shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
        >
          Let's plan a budget
        </button>
      </section>

      {/* 3. WHAT IS BUDGETING */}
      <section className="w-full py-10 text-center border-t border-gray-50">
        <div className="inline-block border-2 border-[#b1a6e0] px-6 py-1 rounded-lg font-black text-gray-600 text-[10px] uppercase tracking-widest mb-4">
          What is Budgeting?
        </div>
        <p className="text-gray-500 italic max-w-2xl mx-auto text-sm lg:text-base px-6">
          "A budget is telling your money where to go instead of wondering where it went."
        </p>
        <cite className="block mt-2 text-[#b1a6e0] font-bold text-xs">- Dave Ramsey</cite>
      </section>

      {/* 4. WHY USE BUDGETING - Optimized Grid */}
      <section className="w-full py-20 bg-[#e2e1f9] px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-white border-2 border-[#b1a6e0] px-6 py-1.5 rounded-lg font-black text-gray-600 text-[10px] uppercase tracking-widest">
            Why Use Budgeting?
          </div>
        </div>
        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto justify-items-center">
          {[
            { i: <PieChart size={32}/>, t: "Expense Tracking" },
            { i: <Target size={32}/>, t: "Financial Goals" },
            { i: <HandHelping size={32}/>, t: "Debt Reduction" },
            { i: <Umbrella size={32}/>, t: "Safety Net" }
          ].map((c, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[45px] w-full flex flex-col items-center shadow-sm hover:translate-y-[-5px] transition-transform border border-transparent hover:border-white">
              <div className="text-[#b1a6e0] mb-4">{c.i}</div>
              <h6 className="font-black text-gray-700 text-xs lg:text-sm text-center uppercase tracking-tight">{c.t}</h6>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY IS BUDGETING IMPORTANT - Responsive Columns */}
      <section className="w-full py-20 bg-white px-6">
        <div className="text-center mb-12">
          <div className="inline-block border-2 border-[#b1a6e0] px-6 py-1.5 rounded-lg font-black text-gray-600 text-[10px] uppercase tracking-widest">
            Why is Budgeting Important?
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1400px] mx-auto">
          {importanceMetrics.map((m, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-r-2xl border-l-[6px] text-xs lg:text-sm shadow-sm leading-relaxed" style={{ borderLeftColor: m.c }}>
              <strong className="text-gray-700 font-black">{m.t}:</strong> {m.d}
            </div>
          ))}
        </div>
      </section>

      {/* 6. KEY TYPES ACCORDION */}
      <section className="w-full py-20 bg-[#e2e1f9] px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-white border-2 border-[#b1a6e0] px-6 py-1.5 rounded-lg font-black text-gray-600 text-[10px] uppercase tracking-widest">
            Key Types of Budgets
          </div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {budgetTypes.map((type, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <button 
                onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                className={`w-full flex justify-between items-center p-6 font-bold text-sm transition-all ${activeAccordion === idx ? 'bg-[#b1a6e0] text-white' : 'bg-[#f0effc] text-gray-700'}`}
              >
                {type.title}
                <ChevronDown className={`transition-transform duration-300 ${activeAccordion === idx ? 'rotate-180' : ''}`} size={20} />
              </button>
              {activeAccordion === idx && (
                <div className="p-8 bg-white animate-in slide-in-from-top-2 duration-300">
                  <ul className="space-y-4 list-disc pl-5">
                    {type.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 leading-relaxed">
                        <strong className="text-gray-800 font-black">{item.b}:</strong> {item.d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. USER REVIEWS - Horizontal Scroller */}
      <section className="w-full py-20 bg-white overflow-hidden">
        <div className="text-center mb-12">
          <div className="inline-block border-2 border-[#b1a6e0] px-6 py-1.5 rounded-lg font-black text-gray-600 text-[10px] uppercase tracking-widest">
            User Reviews
          </div>
        </div>
        <div className="flex gap-8 px-10 pb-10 overflow-x-auto no-scrollbar snap-x">
          {reviews.map((r, i) => (
            <div key={i} className="flex-shrink-0 w-80 bg-[#f0effc] p-10 rounded-[50px] shadow-sm snap-center border border-purple-50">
              <div className="flex gap-1 mb-4 text-[#b1a6e0]">
                {[...Array(r.stars)].map((_, s) => <Star key={s} size={16} fill="currentColor" />)}
              </div>
              <p className="italic text-sm lg:text-base text-gray-700 leading-relaxed font-medium">"{r.text}"</p>
              <h6 className="font-black mt-6 text-xs text-[#b1a6e0] uppercase tracking-widest">- {r.name}</h6>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}