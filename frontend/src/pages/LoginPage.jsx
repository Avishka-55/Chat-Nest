import React, { useState } from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState('Sign Up')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)

  

const onSubmitHandler = (event)=>{
  event.preventDefault()

  if(currState === "Sign Up" && !isDataSubmitted ){
    setIsDataSubmitted(true)
    return;
  }

login(currState === "Sign Up" ? 'signup' : 'login', {fullName, email, password, bio})

}


  return (
    <div className='min-h-screen bg-gray-950 flex items-center 
    justify-center gap-2 sm:justify-evenly max-sm:flex-col'>

          <img 
        src={assets.logo_big} 
        alt="" 
        className='hidden sm:block w-[min(30vw,320px)]' 
      />


      <form 
      onSubmit={onSubmitHandler}
      className='border border-emerald-700/50 bg-gray-900 text-white p-6 flex
      flex-col gap-6 rounded-xl shadow-2xl w-96' action="">

      <h2 className='font-semibold text-2xl flex justify-between items-center'>
        {currState}
        {isDataSubmitted &&  <img 
        onClick={()=>{setIsDataSubmitted(false)}}
        src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' /> }
       
        
        </h2>

        {currState==="Sign Up"  && !isDataSubmitted && ( 
        <input
        onChange={(e)=>setFullName(e.target.value)}  value={fullName} type="text" className='p-3 border border-emerald-700/40 bg-gray-800 rounded-lg
        focus:outline-none focus:border-emerald-600 text-white placeholder-gray-400' placeholder = "Full Name" required  />)}
        
        {!isDataSubmitted && (
          <>
          <input
          onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' required className='p-3
          border border-emerald-700/40 bg-gray-800 rounded-lg focus:outline-none focus:border-emerald-600
          text-white placeholder-gray-400'/>
          <input
          onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='p-3
          border border-emerald-700/40 bg-gray-800 rounded-lg focus:outline-none focus:border-emerald-600
          text-white placeholder-gray-400'/>
          </>
        )}
        {
          currState === "Sign Up" &&
          isDataSubmitted && (
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio} 
            rows={4} className='p-3 border border-emerald-700/40 bg-gray-800 rounded-lg
            focus:outline-none focus:border-emerald-600 text-white placeholder-gray-400 resize-none'
            placeholder='Provide a Short Bio' required></textarea>
          )
        }

        <button  className='py-3 bg-emerald-600 hover:bg-emerald-700
         text-white rounded-lg cursor-pointer font-semibold'>
          {currState === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-400'>
          <input type="checkbox" className='accent-emerald-600' />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className='flex flex-col gap-2'>
          {currState === 'Sign Up' ? (
            <p className='text-sm text-gray-400'>Already have an account?
             <span 
             onClick={()=>{setCurrState('Login'); setIsDataSubmitted(false)}}
             className='font-semibold text-emerald-500 cursor-pointer ml-1'>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-400'>Create an account 
            <span 
            onClick={()=>{setCurrState('Sign Up')}}
            className='font-semibold text-emerald-500 cursor-pointer ml-1'>Click here</span></p>
          )}
        </div>

      </form>
        
    </div>
  )
}

export default LoginPage