import React, { useState } from 'react';


export default function GradeEvaluation() {
  const [studentName, setStudentName] = useState('');
  const [score, setScore] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleEvaluate = (e) => {
    e.preventDefault();
    
    if (!studentName.trim() || score.trim() === '') {
      setError('Please provide both student name and score.');
      return;
    }

    const numScore = parseFloat(score);

    
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      setError('Invalid score. Please enter a value between 0 and 100.');
      setResult(null);
      return;
    }

    let remarks = '';
   
    if (numScore >= 90) remarks = 'Excellent';
    else if (numScore >= 85) remarks = 'Very Good';
    else if (numScore >= 80) remarks = 'Good';
    else if (numScore >= 75) remarks = 'Passed';
    else remarks = 'Failed';

    setError('');
    setResult({
      name: studentName,
      score: numScore,
      remarks: remarks
    });
  };

  const handleClear = () => {
    setStudentName('');
    setScore('');
    setResult(null);
    setError('');
  };

  
  const getRemarkColor = (remark) => {
    if (remark === 'Excellent' || remark === 'Very Good') return 'text-[#59ff85]';
    if (remark === 'Good' || remark === 'Passed') return 'text-[#66c0f4]';
    return 'text-[#ff5959]';
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] font-['Motiva_Sans',_Arial,_sans-serif] text-[#b8b6b4] p-4">
      
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-4xl">
      
      <div className="w-full md:w-1/2 bg-[#171a21] p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-[#2a475e] flex flex-col">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
          Activity 2
        </h1>
        <h2 className="text-[#66c0f4] text-lg font-bold tracking-wide mb-6 pb-2 border-b border-[#2a475e]">
          Student Grade Evaluation
        </h2>

        <form onSubmit={handleEvaluate} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1">
            <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Student Name</label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
              placeholder="Marc Kristian"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] uppercase font-bold text-[#66c0f4]">Score</label>
            <input 
              type="number" 
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="bg-[#32353C] text-white border-none rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-[#66c0f4] transition-shadow"
              placeholder="0 - 100"
            />
          </div>

          {error && (
            <div className="p-3 rounded text-sm font-bold bg-[#3d1c1c] text-[#ff5959] border border-[#5c2b2b]">
              {error}
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#1a9fff] to-[#0165c7] text-white uppercase font-bold tracking-wider py-3 rounded hover:from-[#1facff] hover:to-[#0178e3] transition-all shadow-md cursor-pointer"
            >
              Evaluate
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
              <span className="text-xs uppercase font-bold text-[#8f98a0]">Student Name</span>
              <p className="text-xl text-white font-bold mt-1">{result.name}</p>
            </div>
            
            <div>
              <span className="text-xs uppercase font-bold text-[#8f98a0]">Score</span>
              <p className="text-xl text-white font-bold mt-1">{result.score}</p>
            </div>
            
            <div>
              <span className="text-xs uppercase font-bold text-[#8f98a0]">Remarks</span>
              <p className={`text-2xl font-bold mt-1 ${getRemarkColor(result.remarks)} uppercase tracking-wider`}>
                {result.remarks}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-[#8f98a0] italic">
            Enter details and click Evaluate to see results
          </div>
        )}
      </div>
      
      </div>
    </div>
  );
}
