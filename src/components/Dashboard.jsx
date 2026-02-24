import React, { useRef } from 'react';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend, ArcElement 
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
);

export default function Dashboard({ onNavigate, data, config, user }) {
  const dashboardRef = useRef();

  const displayName = user?.isExisting 
    ? user.email 
    : `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || "Guest User";

  const sum = (cat, field) => {
    if (!data[cat]) return 0;
    return data[cat].reduce((acc, r) => acc + (parseFloat(r[field]) || 0), 0);
  };

  const totals = {
    incP: sum('Inc', 'p'), incA: sum('Inc', 'a'),
    bilP: sum('Bil', 'p'), bilA: sum('Bil', 'a'),
    debP: sum('Deb', 'p'), debA: sum('Deb', 'a'),
    savP: sum('Sav', 'p'), savA: sum('Sav', 'a')
  };

  const rem = totals.incA - totals.bilA - totals.debA - totals.savA;

  // IMPROVED: Robust PDF capture with error handling [cite: 2026-02-23]
  const downloadPDF = async () => {
    const element = dashboardRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff", // Force white background to avoid transparent/oklch issues
        onclone: (clonedDoc) => {
          // Internal fix: Ensure the cloned element doesn't use unsupported colors
          const dashboard = clonedDoc.getElementById('pdf-content');
          if (dashboard) dashboard.style.color = "#1f2937"; 
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${displayName}_Budget_Report.pdf`);
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("PDF Error: Please check your internet connection and try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-6 lg:p-12 flex flex-col items-center">
      
      {/* id="pdf-content" added to help the clone function [cite: 2026-02-23] */}
      <div ref={dashboardRef} id="pdf-content" className="w-full flex flex-col items-center bg-white p-4">
        <h1 className="text-4xl lg:text-6xl font-black mb-4 uppercase text-[#1f2937] text-center">
          {config.interval} Dashboard
        </h1>
        <p className="text-[#9ca3af] font-bold tracking-widest text-[10px] lg:text-[12px] mb-12 uppercase text-center">
          Summary for {displayName} — {config.dates.start} to {config.dates.end}
        </p>
        
        {/* FINANCIAL OVERVIEW TABLE */}
        <div className="w-full max-w-5xl rounded-[30px] border border-[#f3f4f6] overflow-hidden mb-12 shadow-2xl bg-white">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#e2e1f9] font-black uppercase tracking-widest text-[11px]">
              <tr><th colSpan="3" className="py-5 text-[#6a5acd]">Financial Overview</th></tr>
            </thead>
            <tbody>
              <tr className="bg-[#f9fafb] font-black text-[10px] uppercase text-[#9ca3af] border-b border-[#f3f4f6]">
                <td className="py-3 px-4">Category</td>
                <td className="py-3 px-4">Planned ({config.geo.currency})</td>
                <td className="py-3 px-4">Actual ({config.geo.currency})</td>
              </tr>
              {[
                { l: 'Income', p: totals.incP, a: totals.incA },
                { l: 'Bills', p: totals.bilP, a: totals.bilA },
                { l: 'Debt', p: totals.debP, a: totals.debA },
                { l: 'Savings', p: totals.savP, a: totals.savA }
              ].map((item, i) => (
                <tr key={i} className="border-b border-[#f9fafb] last:border-0">
                  <td className="py-5 text-sm font-bold text-[#6b7280]">{item.l}</td>
                  <td className="py-5 text-sm font-black text-[#374151]">{item.p.toLocaleString()}</td>
                  <td className="py-5 text-sm font-black text-[#6a5acd]">{item.a.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full max-w-6xl items-center mb-12">
          <div className="flex flex-col items-center">
            <div className="w-56 h-56 rounded-full border-[15px] border-[#f9fafb] flex flex-col items-center justify-center shadow-inner">
              <p className="text-[10px] font-black text-[#9ca3af] uppercase mb-1">Left to Spend</p>
              <div className="text-4xl font-black text-[#1f2937]">{rem.toFixed(2)}</div>
              <p className="text-[9px] font-bold text-[#b1a6e0] mt-1">{config.geo.currency}</p>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <Bar 
              data={{ 
                labels: ['Inc', 'Bil', 'Deb', 'Sav'], 
                datasets: [
                  { label: 'Planned', data: [totals.incP, totals.bilP, totals.debP, totals.savP], backgroundColor: '#e2e1f9' },
                  { label: 'Actual', data: [totals.incA, totals.bilA, totals.debA, totals.savA], backgroundColor: '#6a5acd' }
                ] 
              }} 
              options={{ maintainAspectRatio: false }} 
            />
          </div>

          <div className="h-72 w-full">
            <Pie 
              data={{ 
                labels: ['Bills', 'Debt', 'Sav', 'Rem'], 
                datasets: [{ 
                  data: [totals.bilA, totals.debA, totals.savA, Math.max(0, rem)], 
                  backgroundColor: ['#ffccd5', '#dcd9f8', '#f3f0ff', '#f0f0f0'] 
                }] 
              }} 
              options={{ maintainAspectRatio: false }} 
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button onClick={() => onNavigate(4)} className="px-8 py-4 bg-[#f9fafb] text-[#6a5acd] font-black rounded-full text-xs uppercase border border-[#f3f4f6]">
          Edit Entries
        </button>
        <button onClick={downloadPDF} className="px-8 py-4 bg-[#6a5acd] text-white font-black rounded-full text-xs uppercase shadow-xl">
          Download PDF Report
        </button>
      </div>
    </div>
  );
}