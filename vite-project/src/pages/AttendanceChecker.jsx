import React, { useState } from 'react';


export default function AttendanceChecker() {
  const [employeeName, setEmployeeName] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const checkAttendance = (e) => {
    e.preventDefault();
    
    if (!employeeName.trim() || timeIn.trim() === '') {
      setError('Please provide both employee name and time in.');
      setResult(null);
      return;
    }

    const time = parseFloat(timeIn);
    
    
    if (isNaN(time) || time < 0 || time > 24) {
      setError('Invalid time. Please enter a valid decimal time (0-24).');
      setResult(null);
      return;
    }

    setError('');
    
    let status = '';
    let message = '';
    let colorClass = '';

   
    if (time <= 7) {
      status = 'On Time';
      message = 'Status: On Time - Good job!';
      colorClass = 'text-[#59ff85]'; 
    } else if (time > 7 && time <= 8) {
      status = 'Late';
      message = 'Status: Late - Please be on time tomorrow.';
      colorClass = 'text-[#e5d85c]'; 
    } else {
      status = 'Very Late';
      message = 'Status: Very Late - Report to your supervisor.';
      colorClass = 'text-[#ff5959]'; 
    }

    setResult({
      name: employeeName,
      timeIn: timeIn,
      status: status,
      message: message,
      colorClass: colorClass
    });
  };

  const handleReset = () => {
    setEmployeeName('');
    setTimeIn('');
    setResult(null);
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] font-['Motiva_Sans',_Arial,_sans-serif] text-[#b8b6b4] p-4">
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-4xl">
        
        
        <div className="w-full md:w-1/2 bg-[#171a21] p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-[#2a475e] flex flex-col">
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
            Activity 5
          </h1>
          <h2 className="text-[#66c0f4] text-lg font-bold tracking-wide mb-6 pb-2 border-b border-[#2a475e]">
            Employee Attendance Checker
          </h2>

          <form onSubmit={checkAttendance} className="flex flex-col gap-4 flex-grow">
            
            <div className="flex flex-col gap-1">
              <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Employee Name</label>
              <input 
                type="text" 
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
                placeholder="Marc Kristian"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Time In (e.g. 8.5 = 8:30 AM)</label>
              <input 
                type="number" 
                value={timeIn}
                onChange={(e) => setTimeIn(e.target.value)}
                className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
                placeholder="0.0"
                step="0.1"
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
                Check Attendance
              </button>
              <button 
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gradient-to-r from-[#383a3f] to-[#2d2f33] text-white uppercase font-bold tracking-wider py-3 rounded hover:from-[#494c52] hover:to-[#383a3f] border border-[#55585e] transition-all cursor-pointer"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

       
        <div className="w-full md:w-1/2 bg-[#171a21] p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-[#2a475e] flex flex-col">
          <h3 className="text-[13px] uppercase font-bold text-[#66c0f4] tracking-wider mb-6 pb-2 border-b border-[#2a475e]">
            Result Panel Shows
          </h3>

         
          {result ? (
            <div className="flex flex-col gap-6 mt-2">
              <div>
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Employee Name</span>
                <p className="text-xl text-white font-bold mt-1">{result.name}</p>
              </div>
              
              <div>
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Time In</span>
                <p className="text-xl text-white font-bold mt-1">{result.timeIn}</p>
              </div>
              
              <div>
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Attendance Status</span>
                <p className={`text-2xl font-bold mt-1 uppercase tracking-wider ${result.colorClass}`}>
                  {result.status}
                </p>
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Follow-up Message</span>
                <p className="text-lg text-white mt-1 leading-relaxed">
                  {result.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[#8f98a0] italic">
              Enter employee details and time to check attendance
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
