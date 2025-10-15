import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddBlog from './pages/AddBlog';
import AllBlogs from './pages/AllBlogs';
import Comments from './pages/Comments';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

