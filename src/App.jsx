import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-hacker-darker text-hacker-green font-mono p-4">
        <header className="mb-8 border-b border-hacker-green/30 pb-4">
          <h1 className="text-3xl font-bold tracking-widest text-center shadow-hacker-green drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
            CSEC CYBER DIVISION
          </h1>
          <p className="text-center text-sm mt-2 opacity-80">SECURE MEMBER PORTAL</p>
        </header>

        <main className="container mx-auto max-w-4xl">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
