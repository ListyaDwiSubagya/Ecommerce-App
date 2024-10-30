import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token'); // Menghapus token saat tidak ada
    }
  }, [token]);
  

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" 
      ? <Login setToken={setToken}/> 
      : <>
        <Navbar setToken={setToken}/>
        <hr />
        <div className='flex w-full'>
          <Sidebar/>
          <div className='w-[70%] mx-auto min-ml-[10%] ml-[80px] my-8 text-gray-600 text-base'> 
            <Routes>
              <Route path='/add' element={<Add token={token}/>}/>
              <Route path='/list' element={<List token={token}/>}/>
              <Route path='/orders' element={<Orders token={token}/>}/>
            </Routes>
          </div>
        </div>
      </>}
    

    </div>
  )
}

export default App