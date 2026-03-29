import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './app/user/UserPage'; 
import BookPage from './app/book/BookPage';
import Dashboard from './app/dashboard/Dashboard';
import LendingPage from './app/lending/LendinhPage';  
import './App.css';

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-[#F8F9F8]">
        
        {/* සරල Navigation Bar එකක් (Optional) */}
        <nav className="bg-white border-b border-gray-100 p-4 flex justify-center space-x-8 shadow-sm">
          <Link 
            to="/" 
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Dashboard
          </Link>
          
          <Link 
            to="/users" 
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Users
          </Link>
            <Link 
              to="/books" 
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Books
            </Link>
            <Link
              to="/lendings"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Lendings
            </Link>
        </nav>

        {/* Routes Configuration */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/lendings" element={<LendingPage />} />
        </Routes>
        
      </main>
    </Router>
  );
}

export default App;