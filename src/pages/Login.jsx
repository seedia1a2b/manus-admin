import { useAppContext } from '../context/ContentProvider'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {backend_url, setToken, setAdminEmail} = useAppContext();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [isLoginIn, setIsLoginIn] = useState(false);

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault()
    setIsLoginIn(true)

    try {

      const {data} = await axios.post(backend_url + '/api/v1/admin/login', {email, password})

      if(data.success){
        setToken(data.token)
        setAdminEmail(data.data)
        console.log(data.data)
        localStorage.setItem('token', data.token);
        toast.success('Login successfull')
        navigate('/')
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }finally {
      setIsLoginIn(false);
      setEmail('')
      setPassword('')
    }
  }
  
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-blue-600/30 shadow-xl shadow-blue-500/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-2xl sm:text-3xl font-bold'><span className='text-blue-700'>Admin</span> Login</h1>
            <p className='text-sm font-light text-center'>Enter your login credentials to access the admin panel</p>
          </div>
          <form className='w-full' onSubmit={handleForm}>
            <div className="flex flex-col md:flex-row w-full mb-4 gap-2">
              <label className='mb-2 flex-1/3 md:text-end md:text-lg'>Email</label>
              <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" required placeholder='Enter email' className='flex-2/3 w-full outline-0 border border-gray-300 rounded-sm py-2 px-4' />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <label className='mb-2 flex-1/3 items-center md:text-end md:text-lg'>Password</label>
              <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" required placeholder='Enter password' className='flex-2/3 outline-0 border border-gray-300 rounded-sm py-2 px-4' />
            </div>
            <div className='flex items-center justify-center pt-4'>
              <button disabled={isLoginIn} type='submit' className='py-1.5 px-10 rounded-lg bg-blue-700 font-semibold text-white cursor-pointer '>{isLoginIn ? "Loading..." : 'Login'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
