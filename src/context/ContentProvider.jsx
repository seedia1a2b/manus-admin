import { meta } from '@eslint/js';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const AppContent  = createContext();


const ContentProvider = ({children}) => {

  const [token, setToken] = useState(localStorage.getItem('token')|| '')

  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [darshboardData, setDarshboardData] = useState({recentBlogs : [{
    category:'',
    createdAt:'',
    description:'',
    subTitle:'',
    title:'',
    updatedAt:'',
    _id:'',
    image:''
  }]});
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [adminEmail, setAdminEmail] = useState([]);


  const fetchAdminData = async () => {

    try {
      const { data } = await axios.post(backend_url + '/api/v1/admin/adminData', {}, {headers:{'token': token}});
      console.log(data)
      if(data){
        setAdminEmail(data.admin);
        localStorage.setItem('AdminData', JSON.stringify(data.admin));
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  console.log(backend_url)
  
  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get(backend_url + '/api/v1/admin/blogs',{headers:{'token':token}})
      if(data.success){
        setBlogs(data.data);
        toast.success('data retrieved');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message + 'something went wrong');
    }
  }

    const findCommentCount = (blogId) => {
    let count = 0;
    comments.map((item) => {
      if(item.blog._id === blogId){
        count ++
      }
    })
    return count;
  }
  const fetchDarshboardData = async () => {
    try {
      const {data} = await axios.get(backend_url + '/api/v1/admin/darshboardData',{headers:{'token':token}});
      if(data.success){
        setDarshboardData(data.data);
        toast.success('data retrieved');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message + 'something went wrong');
    }finally{
      fetchComments();
    }
  }

  const fetchComments = async () => {
    try {
      
      const {data} = await axios.get(backend_url + '/api/v1/admin/comments', {headers:{'token': token}});

      if(data.success){
        setComments(data.data);
        toast.success('comments retrieved')
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  
  useEffect(() => {
    fetchBlogs();
    fetchComments();
    fetchAdminData();
    console.log(adminEmail);
  }, [])
  
  const value = {
    token, setToken,
    backend_url,
    blogs, setBlogs, fetchBlogs,
    darshboardData, setDarshboardData, fetchDarshboardData,
    comments, setComments, fetchComments, findCommentCount,
    adminEmail, setAdminEmail,fetchAdminData
  }
  return (
    <AppContent.Provider value={value}>
      {children}
    </AppContent.Provider>
  )
}

export default ContentProvider

export const useAppContext = () => {
  return useContext(AppContent);
}
