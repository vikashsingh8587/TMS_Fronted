
import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import DashBoard from './pages/Dashboard.jsx'

function App(params) {
    
    return(
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
      </BrowserRouter>
    )
}

export default App;