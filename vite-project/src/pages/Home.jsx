import React from 'react';

export default function Home({ setPage }) {
  const activities = [
    { id: 'activity1', title: 'Activity 1', desc: 'Login Authentication form with state validation.' },
    { id: 'activity2', title: 'Activity 2', desc: 'Student Grade Evaluation with conditional remarks.' },
    { id: 'activity3', title: 'Activity 3', desc: 'Password Strength Checker with visual indicators.' },
    { id: 'activity4', title: 'Activity 4', desc: 'Electricity Bill Calculator across tiered rates.' },
    { id: 'activity5', title: 'Activity 5', desc: 'Employee Attendance Checker with time thresholds.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] font-['Motiva_Sans',_Arial,_sans-serif] text-[#b8b6b4] p-4">
      
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest mb-4 drop-shadow-lg">
          React Activity Portal
        </h1>
        <p className="text-lg text-[#66c0f4] tracking-wide font-bold">
          Select an activity below to get started
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {activities.map(activity => (
          <div 
            key={activity.id}
            onClick={() => setPage(activity.id)}
            className="group bg-[#171a21] p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-[#2a475e] cursor-pointer hover:border-[#66c0f4] transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center hover:shadow-[0_0_20px_rgba(102,192,244,0.3)]"
          >
            <div className="w-16 h-16 bg-[#2a475e] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#66c0f4] transition-colors">
              <span className="text-2xl text-[#66c0f4] font-bold group-hover:text-[#171a21]">{activity.id.slice(-1)}</span>
            </div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-3 group-hover:text-[#66c0f4] transition-colors">
              {activity.title}
            </h2>
            <p className="text-[#8f98a0] text-sm leading-relaxed flex-grow">
              {activity.desc}
            </p>
            <div className="mt-8 w-full py-3 bg-gradient-to-r from-[#383a3f] to-[#2d2f33] border border-[#55585e] text-white rounded text-sm font-bold uppercase tracking-wider group-hover:from-[#1a9fff] group-hover:to-[#0165c7] group-hover:border-transparent transition-all">
              Launch Activity
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
