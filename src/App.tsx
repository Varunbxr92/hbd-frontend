import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminUpload from './pages/AdminUpload';

function App() {
  return (
    <Router>
      <div className="max-w-screen-lg mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
             <Route path="/product/:id" element={<ProductDetail />} />
             <Route path="/admin/upload" element={<AdminUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
