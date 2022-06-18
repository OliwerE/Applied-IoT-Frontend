import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Start from './components/Start';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
  <>
    <Header />
    <main>
    <Router>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
    </main>
    <Footer />
  </>
  )
}

export default App
