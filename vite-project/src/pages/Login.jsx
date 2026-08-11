import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const CORRECT_USER = 'admin';
  const CORRECT_PASS = 'password123';

  const handleLogin = (e) => {
    e.preventDefault(); 

    
    if (!username && !password) {
      setMessage('Please enter username and password.');
      setIsError(true);
    } else if (username === CORRECT_USER && password === CORRECT_PASS) {
      setMessage('Login successful!');
      setIsError(false);
      setIsLoggedIn(true);
    } else {
      setMessage('Invalid username or password.');
      setIsError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] font-['Motiva_Sans',_Arial,_sans-serif] text-[#b8b6b4]">
      
      
      <div className="w-full max-w-md bg-[#171a21] p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-[#2a475e]">
        
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-[#2a475e]">
          Activity 1: Login Authentication
        </h1>

        
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1">
              <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
                placeholder="admin"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
                placeholder="password123"
              />
            </div>

            
            {message && (
              <div className={`p-3 rounded text-sm font-bold ${isError ? 'bg-[#3d1c1c] text-[#ff5959] border border-[#5c2b2b]' : 'bg-[#1c3d25] text-[#59ff85] border border-[#2b5c38]'}`}>
                {message}
              </div>
            )}

            <button 
              type="submit"
              className="mt-4 bg-gradient-to-r from-[#1a9fff] to-[#0165c7] text-white uppercase font-bold tracking-wider py-3 rounded hover:from-[#1facff] hover:to-[#0178e3] transition-all shadow-md cursor-pointer"
            >
              Login
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-4">
            
            {message && (
              <div className="w-full text-center p-3 rounded text-sm font-bold bg-[#1c3d25] text-[#59ff85] border border-[#2b5c38]">
                {message}
              </div>
            )}
            
            <h2 className="text-3xl text-white font-bold">Welcome, {username}!</h2>
            
            <button 
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-[#383a3f] to-[#2d2f33] text-white uppercase font-bold tracking-wider py-3 rounded hover:from-[#494c52] hover:to-[#383a3f] border border-[#55585e] transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
