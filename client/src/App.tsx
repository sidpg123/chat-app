import React, {lazy} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

const Home = lazy(()=> import("./pages/Home"));
const Groups = lazy(()=> import("./pages/Groups"));
const Chat = lazy(()=> import("./pages/Chat"));
const Login = lazy(()=> import("./pages/Login"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/groups' element={<Groups />} />
        <Route path='/chat/:chatId' element={<Chat />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App