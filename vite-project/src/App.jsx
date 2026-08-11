import './App.css'
import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import GradeEvaluation from './pages/GradeEvaluation'
import PasswordChecker from './pages/PasswordChecker'
import ElectricityBill from './pages/ElectricityBill'
import AttendanceChecker from './pages/AttendanceChecker'

function App() {
  
  const [currentPage, setCurrentPage] = useState('home'); 

  return (
    <div className="min-h-screen bg-[#1b2838] font-['Motiva_Sans',_Arial,_sans-serif]">
      <NavBar setPage={setCurrentPage} />
      
      <main className="p-4">
        {currentPage === 'home' && <Home setPage={setCurrentPage} />}
        {currentPage === 'activity1' && <Login />}
        {currentPage === 'activity2' && <GradeEvaluation />}
        {currentPage === 'activity3' && <PasswordChecker />}
        {currentPage === 'activity4' && <ElectricityBill />}
        {currentPage === 'activity5' && <AttendanceChecker />}
      </main>
    </div>
  )
}

export default App
