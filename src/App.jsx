import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Account from './Pages/Account';

function App(){
   return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/" element = {<Dashboard/>}/>
        <Route path="/account" element = {<Account/>}/>
      </Routes>
    </BrowserRouter>

   );
}

export default App