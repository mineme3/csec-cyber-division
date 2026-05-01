import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [usersRes, postsRes] = await Promise.all([
        fetch('http://localhost:8000/api/users/', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:8000/api/posts/', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (!usersRes.ok || !postsRes.ok) {
        if (usersRes.status === 403 || postsRes.status === 403) {
          navigate('/dashboard'); // Redirect non-admins
          return;
        }
        throw new Error('Failed to fetch admin data');
      }

      setUsers(await usersRes.json());
      setPosts(await postsRes.json());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchData();
      } else {
        const data = await res.json();
        setError(data.detail || 'Failed to delete post');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-hacker-red/20 border border-hacker-red text-hacker-red p-4">
        <div>
          <span className="font-bold text-lg">[!] ADMIN CONTROL PANEL [!]</span>
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn-hacker border-hacker-red text-hacker-red hover:bg-hacker-red text-sm py-1">
          RETURN TO DASHBOARD
        </button>
      </div>

      {error && <div className="text-hacker-red font-bold text-center">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Users List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-widest mb-4 border-b border-hacker-green/30 pb-2">USER DIRECTORY</h3>
          {users.map(user => (
            <div key={user.id} className="card-hacker text-sm">
              <p><span className="opacity-70">ID:</span> {user.id}</p>
              <p><span className="opacity-70">USERNAME:</span> {user.username}</p>
              {user.secret && <p className="text-yellow-400 mt-2 font-bold"><span className="opacity-70 text-hacker-green">SECRET:</span> {user.secret}</p>}
            </div>
          ))}
        </div>

        {/* Posts Management */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-widest mb-4 border-b border-hacker-green/30 pb-2">TRANSMISSION CONTROL</h3>
          {posts.map(post => (
            <div key={post.id} className="card-hacker bg-black/40">
              <div className="flex justify-between items-start mb-2 border-b border-hacker-green/20 pb-2 text-sm">
                <div className="font-bold">@{post.author_username}</div>
                <button 
                  onClick={() => handleDeletePost(post.id)}
                  className="text-hacker-red hover:text-white underline text-xs"
                >
                  [DELETE]
                </button>
              </div>
              <div className="whitespace-pre-wrap break-words">{post.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
