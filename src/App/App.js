/* How to divide app: 
  1. Header
  2. Main content
    - Three.js globe 
    - Components for selecting departure airport and airline 
  3. Footer
    - Your socials 
    - Link to terms of service 
    - Legal disclaimer 
*/
import './global.css';
import './App.css';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import GlobePage from '../features/GlobePage/GlobePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from '../features/AboutPage/AboutPage';

function App() {
  return (
    <div className='app-layout'>
      <BrowserRouter>
        <Header />
        <div className='page-content'>
            <Routes>
              <Route path="/" element={<Navigate to="flight-mapper" />} />
              <Route path="/flight-mapper" element={<GlobePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
