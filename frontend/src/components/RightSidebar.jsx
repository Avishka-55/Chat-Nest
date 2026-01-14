import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import assets from '../assets/assets'

const RightSidebar = () => {
  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])


  useEffect(()=>{
    setMsgImages(
      messages.filter(msg => msg.image).map(msg=>msg.image))
  },[messages])
  return selectedUser && (
    <div className={`bg-gray-900 text-white w-full relative overflow-y-scroll border-l border-emerald-700/30
    ${selectedUser ? "max-md:hidden": ""}`}>
        <div className='pt-8 px-6 flex flex-col items-center gap-3 text-center
        border-b border-emerald-700/30 pb-6'>
          
            <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-24 h-24 rounded-full object-cover border-2 border-emerald-700/50'/>
          <div>
            <h1 className='text-xl font-semibold text-white flex items-center justify-center gap-2' >
              {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-emerald-500'></p>}
              {selectedUser.fullName}
            </h1>
            <p className='text-sm text-gray-400 mt-2'>{selectedUser.bio || 'No bio added'}</p>
          </div>
        
        </div>
        <div className='px-6 py-6'>
          <h3 className='text-sm font-semibold text-white mb-4'>Media</h3>
          <div className='max-h-[250px] overflow-y-scroll grid grid-cols-2
           gap-3'>
            {msgImages.length > 0 ? (
              msgImages.map((url, index)=>(
                <div key={index} onClick={()=> window.open(url)}
                className='cursor-pointer rounded-lg overflow-hidden hover:opacity-80'>
                <img src={url} alt=""  className='w-full h-24 object-cover rounded-lg'/>
                </div>
              ))
            ) : (
              <p className='text-xs text-gray-500 col-span-2'>No media shared yet</p>
            )}
           </div>
        </div>
        <button onClick={()=> logout()} className='absolute bottom-6 left-1/2 transform -translate-x-1/2
        bg-emerald-600 hover:bg-emerald-700 text-white border-none
        text-sm font-semibold py-2 px-8 rounded-lg cursor-pointer w-[90%]'>Logout</button>
    </div>
  )
}

export default RightSidebar