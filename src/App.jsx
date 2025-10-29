import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddBlog from './pages/AddBlog';
import AllBlogs from './pages/AllBlogs';
import Comments from './pages/Comments';
import './App.css';
import Login from './pages/Login';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';


function App() {

  const {token} = useAppContext();
  const navigate = useNavigate()

  useEffect(()=> {
    if(!token){
      navigate('/login')
    }
  },[])


  return (
    <>
      <Toaster />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {
            token && (
              <>
                <Route path="/" element={<Dashboard /> } />
                <Route path="/add-blog" element={<AddBlog />} />
                <Route path="/all-blogs" element={<AllBlogs />} />
                <Route path="/comments" element={<Comments />} />
              </>
            )
          }
        </Routes>
      </div>
    </>
  );
}

export default App;

