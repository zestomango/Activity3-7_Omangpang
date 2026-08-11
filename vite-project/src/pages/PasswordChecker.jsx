import React, { useState } from 'react';


export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const checkPassword = (e) => {
    e.preventDefault();
    
    if (!password) {
      setError('Please enter a password.');
      setResult(null);
      return;
    }

    setError('');
    const len = password.length;
    let strength = '';
    let message = '';
    let colorClass = '';
    let indicatorWidth = '0%';

    
    if (len < 6) {
      strength = 'Weak Password';
      colorClass = 'text-[#ff5959]';
      indicatorWidth = '33%';
    } else if (len >= 6 && len <= 9) {
      strength = 'Medium Password';
      colorClass = 'text-[#e5d85c]'; 
      indicatorWidth = '66%';
    } else {
      strength = 'Strong Password';
      colorClass = 'text-[#59ff85]';
      indicatorWidth = '100%';
    }

    
    if (len >= 10) {
      message = 'Status: Strong - You can use this password.';
    } else {
      message = 'Status: Weak - Create a stronger password.'; 
    }

    setResult({
      status: strength,
      message: message,
      colorClass: colorClass,
      width: indicatorWidth
    });
  };

  const handleClear = () => {
    setPassword('');
    setResult(null);
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] font-['Motiva_Sans',_Arial,_sans-serif] text-[#b8b6b4] p-4">
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-4xl">
        
        
        <div className="w-full md:w-1/2 bg-[#171a21] p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-[#2a475e] flex flex-col">
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
            Activity 3
          </h1>
          <h2 className="text-[#66c0f4] text-lg font-bold tracking-wide mb-6 pb-2 border-b border-[#2a475e]">
            Password Strength Checker
          </h2>

          <form className="flex flex-col gap-4 flex-grow">
            
            <div className="flex flex-col gap-1">
              <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
                placeholder="Please enter a password..."
              />
            </div>

            {error && (
              <div className="p-3 rounded text-sm font-bold bg-[#3d1c1c] text-[#ff5959] border border-[#5c2b2b]">
                {error}
              </div>
            )}

            <div className="flex gap-4 mt-auto pt-4">
              <button 
                type="button"
                onClick={checkPassword}
                className="flex-1 bg-gradient-to-r from-[#1a9fff] to-[#0165c7] text-white uppercase font-bold tracking-wider py-3 rounded hover:from-[#1facff] hover:to-[#0178e3] transition-all shadow-md cursor-pointer"
              >
                Check
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
            <div className="flex flex-col gap-6 mt-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Password Status</span>
                <p className={`text-2xl font-bold mt-1 ${result.colorClass} uppercase tracking-wider`}>
                  {result.status}
                </p>
              </div>
              
              <div>
                <span className="text-xs uppercase font-bold text-[#8f98a0]">Strength Message</span>
                <p className="text-lg text-white mt-1 leading-relaxed">
                  {result.message}
                </p>
              </div>
              
              <div className="mt-2">
                <span className="text-xs uppercase font-bold text-[#8f98a0] mb-2 block">Visual Strength Indicator</span>
                <div className="w-full h-3 bg-[#32353C] rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 ease-out"
                    style={{ 
                      width: result.width, 
                      backgroundColor: result.width === '33%' ? '#ff5959' : result.width === '66%' ? '#e5d85c' : '#59ff85' 
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[#8f98a0] italic">
              Enter a password and click Check to see results
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
