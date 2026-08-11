import React, { useState } from 'react';


export default function ElectricityBill() {
  const [customerName, setCustomerName] = useState('');
  const [consumption, setConsumption] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateBill = (e) => {
    e.preventDefault();
    
    if (!customerName.trim() || consumption.trim() === '') {
      setError('Please provide both customer name and consumption.');
      setResult(null);
      return;
    }

    const kwh = parseFloat(consumption);
    if (isNaN(kwh) || kwh < 0) {
      setError('Invalid consumption. Please enter a positive number.');
      setResult(null);
      return;
    }

    setError('');
    
    let rate = 0;
    
    if (kwh <= 100) {
      rate = 10;
    } else if (kwh <= 200) {
      rate = 12;
    } else if (kwh <= 300) {
      rate = 15;
    } else {
      rate = 18;
    }

   
    const totalBill = kwh * rate;
    
   
    const usageStatus = totalBill >= 5000 ? 'High Electricity Usage' : 'Normal Electricity Usage';

    setResult({
      name: customerName,
      consumption: kwh,
      rateApplied: `₱${rate} per kWh`,
      totalBill: totalBill,
      usageStatus: usageStatus
    });
  };

  const handleClear = () => {
    setCustomerName('');
    setConsumption('');
    setResult(null);
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] font-['Motiva_Sans',_Arial,_sans-serif] text-[#b8b6b4] p-4">
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-4xl">
        
        <div className="w-full md:w-1/2 bg-[#171a21] p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-[#2a475e] flex flex-col">
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
            Activity 4
          </h1>
          <h2 className="text-[#66c0f4] text-lg font-bold tracking-wide mb-6 pb-2 border-b border-[#2a475e]">
            Electricity Bill Calculator
          </h2>

          <form onSubmit={calculateBill} className="flex flex-col gap-4 flex-grow">
            
            <div className="flex flex-col gap-1">
              <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Customer Name</label>
              <input 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
                placeholder="Marc Kristian"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Consumption (kWh)</label>
              <input 
                type="number" 
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
                className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>

            {error && (
              <div className="p-3 rounded text-sm font-bold bg-[#3d1c1c] text-[#ff5959] border border-[#5c2b2b]">
                {error}
              </div>
            )}

            <div className="flex gap-4 mt-auto pt-4">
              <button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#1a9fff] to-[#0165c7] text-white uppercase font-bold tracking-wider py-3 rounded hover:from-[#1facff] hover:to-[#0178e3] transition-all shadow-md cursor-pointer"
              >
                Calculate
              </button>
              <button 
                type="button"
                onClick={handleClear}
                className="flex-1 bg-gradient-to-r from-[#383a3f] to-[#2d2f33] text-white uppercase font-bold tracking-wider py-3 rounded hover:from-[#494c52] hover:to-[#383a3f] border border-[#55585e] transition-all cursor-pointer"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-[#171a21] p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-[#2a475e] flex flex-col">
          <h3 className="text-[13px] uppercase font-bold text-[#66c0f4] tracking-wider mb-6 pb-2 border-b border-[#2a475e]">
            Result Panel Shows
          </h3>

          {result ? (
            <div className="flex flex-col gap-5 mt-2">
              <div className="flex justify-between items-end border-b border-[#32353C] pb-2">
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Customer Name</span>
                <span className="text-lg text-white font-bold">{result.name}</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-[#32353C] pb-2">
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Consumption</span>
                <span className="text-lg text-white font-bold">{result.consumption} kWh</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-[#32353C] pb-2">
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Rate Applied</span>
                <span className="text-lg text-[#e5d85c] font-bold">{result.rateApplied}</span>
              </div>

              <div className="flex justify-between items-end border-b border-[#32353C] pb-2 mt-2">
                <span className="text-xs uppercase font-bold text-[#66c0f4]">Total Bill</span>
                <span className="text-2xl text-[#59ff85] font-bold tracking-wider">
                  ₱{result.totalBill.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </div>

              <div className="mt-4 text-center">
                <span className={`inline-block px-4 py-2 rounded text-sm font-bold uppercase tracking-wider ${result.usageStatus === 'High Electricity Usage' ? 'bg-[#3d1c1c] text-[#ff5959] border border-[#5c2b2b]' : 'bg-[#1c3d25] text-[#59ff85] border border-[#2b5c38]'}`}>
                  {result.usageStatus}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[#8f98a0] italic">
              Enter consumption details to see the bill
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
