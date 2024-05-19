import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchBlogs } from '../reducers/blogSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo.png';
const BlogList = () => {
  const image=logo;
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { blogs, status } = useSelector((state) => state.blogs);
  const handleRegisterButton = () => {
    navigate('/register');
  }
  const handleImage=()=>{
    navigate('/blogs');
  }
  const handleLoginButton = () => {
    navigate('/login');
  }
  const handleAddPost = () => {
    if (token) {
      navigate('/create-post');
    } else {
      alert('Please login to Add a Blog');
      navigate('/login');
    }
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="px-4 py-8">
      <nav className="p-8">
      <img src={image} className="absolute top-0 left-0  w-20 h-20 m-2 rounded-full" alt="logo" onClick={handleImage}></img>
      {!token && (
        <div className="flex justify-end mt-4 p-3">  
        <button onClick={handleRegisterButton} className="trasition ease-in-out delay-150 bg-blue-900 hover:-translate-y-1 hover:scale-110 duration-300 text-slate-100 font-semibold py-2 px-4 rounded-lg mr-4 bg-gradient-to-r from-blue-500 to-blue-600-blue-700 to-blue-800 to-blue-900 hover:bg-gradient-to-l from-blue-500 to-blue-600-blue-700 to-blue-800 to-blue-900 ring-1 ring-blue-700 hover:ring-sky-950 ring-opacity-50">Register
          </button>
          <button onClick={handleLoginButton} className="trasition ease-in-out delay-150 bg-cyan-900 hover:-translate-y-1 hover:scale-110 duration-300 bg-gradient-to-r from-cyan-500 to-cyan-600 to-cyan-700 to-cyan-600 to-cyan-500 hover:bg-gradient-to-l from-cyan-700 to-cyan-800 to-cyan-900 to-cyan-950 to-cyan-900 to-cyan-800 to-cyan-700 text-slate-100 font-semibold py-2 px-4 rounded-lg mr-2 ring-1 ring-cyan-600 hover:ring-1 ring-cyan-900 ring-opacity-50">
            Login
          </button>
        </div>
      )}
      </nav>
      <aside>
      </aside>
      {status === 'loading' && <p className="text-gray-700">Loading...</p>}
      {status === 'error' && <p className="text-red-600">Error in Fetching Posts</p>}
      <div className="grid grid-cols-2">
      {Array.isArray(blogs) && blogs.length > 0 ? (
      blogs.map((blog) => (
    <div key={blog._id} className="trasition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200 ml-8 my-4 mr-4  bg-slate-200 rounded-3xl opacity-95 p-6">
      <h2 className="text-2xl underline underline-offset-2  font-bold mb-2 text-slate-950 p-0.5">{blog.title}</h2>
      <p className="truncate hover:truncate-text-clip text-lg text-gray-800 p-0.5 text-slate-950">{blog.content}</p>
      <p className="text-lg text-gray-800 p-0.5 text-slate-950"><strong>Tags :</strong> {blog.tags}</p>
      <p className="text-lg text-gray-800 p-1 pb-5 text-slate-950"><strong>Author :</strong> {blog.author}</p>
      <p className="p-1"></p>
      <Link to={`/blog/${blog._id}`} className="transition ease-in-out hover:scale-110 duration-300 hover:-translate-y-2 text-slate-200 hover:text-slate-100 bg-pink-700 hover:bg-pink-800 rounded-2xl p-4 border-slate-950">View</Link>
    </div>
  ))
) : (
  <p className="text-lg text-slate-100 ml-24 p-4 font-bold ">No Blogs Available</p>
)}
      </div>
      <button onClick={handleAddPost} className="trasition ease-in-out delay-150 hover:-translate-x-1 hover:scale-110 duration-300 m-4 ml-9 bg-emerald-700 hover:bg-emerald-900 text-white font-semibold py-3 px-6 rounded-lg ml-2">
        Add Blog
      </button> 
    </div>
  );
}

export default BlogList;
