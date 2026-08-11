import React from 'react';

export default function NavBar({ setPage }) {
  const baseLinkStyle = "bg-transparent border-none text-[#b8b6b4] text-[13px] uppercase font-bold tracking-wider px-4 py-2 cursor-pointer rounded-sm transition-colors duration-200 hover:text-white";
  
  const activeLinkStyle = "bg-[#2a475e] text-[#66c0f4] hover:text-[#66c0f4]";

  const getLinkClasses = (pageName, activePage) => {
    return `${baseLinkStyle} ${pageName === activePage ? activeLinkStyle : ''}`;
  };
  
  return (
    <nav className="flex items-center justify-between bg-[#171A21] px-[30px] h-[70px] font-['Motiva_Sans',_Arial,_sans-serif] shadow-lg border-b border-[#2a475e]">
      <div className="text-white text-xl font-bold tracking-wider uppercase">
        React Activity Portal
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => setPage && setPage('home')} className={`${baseLinkStyle} ${activeLinkStyle}`}>Home</button>
        <button onClick={() => setPage && setPage('activity1')} className={baseLinkStyle}>Activity 1</button>
        <button onClick={() => setPage && setPage('activity2')} className={baseLinkStyle}>Activity 2</button>
        <button onClick={() => setPage && setPage('activity3')} className={baseLinkStyle}>Activity 3</button>
        <button onClick={() => setPage && setPage('activity4')} className={baseLinkStyle}>Activity 4</button>
        <button onClick={() => setPage && setPage('activity5')} className={baseLinkStyle}>Activity 5</button>
      </div>
    </nav>
  );
}
