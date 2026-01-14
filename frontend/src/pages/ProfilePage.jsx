import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
  const {authUser, updateProfile} = useContext(AuthContext)
  const  [selectedImg, setSelectedImg]  = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName: name, bio})
      navigate('/')
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(selectedImg)
    reader.onload = async()=>{
      const base64Image = reader.result
      await updateProfile({profilePic: base64Image, fullName: name, bio})
      navigate('/')
    }
    
  }

    return (
    <div className='min-h-screen bg-gray-950 flex items-center
    justify-center p-4'>
      <div className='w-full max-w-2xl border border-emerald-700/50 bg-gray-900 text-gray-300
      flex items-center justify-between max-sm:flex-col-reverse
      rounded-xl p-8 gap-8'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 flex-1'>
          <h3 className='text-2xl font-semibold text-white'>Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3
          cursor-pointer'>
            <input onChange={(e)=>{setSelectedImg(e.target.files[0])}} type="file" name="" id="avatar" accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" 
            className={`w-14 h-14 rounded-full object-cover`}/>
            <span className='text-sm text-gray-400'>Update profile image</span>

          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name}
          type="text" required placeholder='Your name' className='p-3 border
          border-emerald-700/40 bg-gray-800 rounded-lg focus:outline-none focus:border-emerald-600 text-white placeholder-gray-400'/>
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='Write profile bio' required className='p-3 border
          border-emerald-700/40 bg-gray-800 rounded-lg focus:outline-none focus:border-emerald-600
          text-white placeholder-gray-400 resize-none' rows={4}></textarea>
          <button
           type='submit' className='bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg text-lg cursor-pointer font-semibold'>Save Changes</button>
        </form>
        <div className='flex flex-col items-center'>
          <img className='w-48 h-48 rounded-full object-cover border-2 border-emerald-700/50' src={authUser.profilePic || assets.logo_icon} alt="" />
        </div>
      </div>
        
    </div>
  )
}

export default ProfilePage