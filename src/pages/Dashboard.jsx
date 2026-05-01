import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJSONSafe } from '../utils/fetchUtils';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await parseJSONSafe(res);
        if (data) {
          setProfile(data);
        } else {
          setError('Invalid profile response');
        }
      } else if (res.status === 401) {
        handleLogout();
      } else {
        const data = await parseJSONSafe(res);
        setError(data?.detail || 'Failed to load profile');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error');
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await parseJSONSafe(res);
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
    fetchPosts();
  }, [token, navigate]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newPost })
      });

      if (res.ok) {
        setNewPost('');
        fetchPosts(); // refresh posts
      } else {
        const data = await parseJSONSafe(res);
        setError(data?.detail || 'Failed to create post');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-hacker-darker border border-hacker-green/30 p-4">
        <div>
          <span className="opacity-70 text-sm">LOGGED IN AS: </span>
          <span className="font-bold text-lg">{profile?.username || 'LOADING...'}</span>
        </div>
        <div className="flex gap-4">
          {profile?.username === 'admin' && (
            <button onClick={() => navigate('/admin')} className="btn-hacker border-yellow-400 text-yellow-400 hover:bg-yellow-400 text-sm py-1">
              ADMIN PANEL
            </button>
          )}
          <button onClick={handleLogout} className="btn-hacker text-sm py-1">
            TERMINATE SESSION
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="card-hacker">
            <h3 className="text-xl mb-4 border-b border-hacker-green/30 pb-2">TRANSMIT DATA</h3>
            {error && <div className="text-hacker-red text-sm mb-2">{error}</div>}
            <form onSubmit={handleCreatePost} className="space-y-4">
              <textarea 
                className="input-hacker min-h-[120px] resize-none"
                placeholder="Enter transmission content..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                maxLength={500}
                required
              />
              <button type="submit" className="btn-hacker w-full font-bold">
                BROADCAST
              </button>
            </form>
          </div>
          
          <div className="card-hacker text-sm opacity-80 space-y-2">
             <h4 className="font-bold border-b border-hacker-green/30 pb-1 mb-2">SYSTEM.INFO()</h4>
             <p>&gt; SECURE MODE: ENABLED</p>
             <p>&gt; AUTHORIZATION: STRICT</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="text-2xl font-bold tracking-widest mb-4">GLOBAL FEED</h3>
          
          {posts.length === 0 ? (
            <div className="text-center opacity-50 py-10 border border-dashed border-hacker-green/30">
              NO TRANSMISSIONS FOUND IN DATABASE.
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="card-hacker bg-black/40">
                <div className="flex justify-between items-start mb-2 border-b border-hacker-green/20 pb-2 text-sm">
                  <div className="font-bold">
                      {post.author_username === "admin" ? "captain" : post.author_username}
                  </div>
                  <div className="opacity-50">{new Date(post.created_at).toLocaleString()}</div>
                </div>
                <div className="whitespace-pre-wrap break-words">{post.content}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
