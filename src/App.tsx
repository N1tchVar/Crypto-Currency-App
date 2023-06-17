import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cryptofy from "./pages/Cryptofy"
import CryptofyDetails from "./pages/CryptofyDetails"
import Navbar from "./components/Navbar"


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={ <Cryptofy /> } />
        <Route path="/coin/:id" element={ <CryptofyDetails /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App