import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }
      
      localStorage.setItem('token', data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-full mt-20">
      <div className="card-hacker w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center border-b border-hacker-green/30 pb-2">SYSTEM.AUTHENTICATE()</h2>
        
        {error && (
          <div className="bg-hacker-red/20 border border-hacker-red text-hacker-red p-3 mb-4 text-sm font-bold animate-pulse">
            [ACCESS DENIED] {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 opacity-80">USERNAME:</label>
            <input 
              type="text" 
              className="input-hacker"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 opacity-80">PASSWORD:</label>
            <input 
              type="password" 
              className="input-hacker"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-hacker w-full mt-6 text-lg tracking-wider font-bold">
            LOGIN
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm opacity-70">
          No account found in registry? <Link to="/register" className="underline hover:text-white">Create Profile</Link>
        </div>
      </div>
    </div>
  );
}
