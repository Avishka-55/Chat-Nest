import React, { useContext, useState } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useEffect } from 'react';

const Sidebar = () => {

  const { getUsers,users, selectedUser, setSelectedUser,
    unseenMessages, setUnseenMessages} = useContext(ChatContext)
  

  const {logout, onlineUsers} = useContext(AuthContext)

  const [input, setInput] = useState(false)

  const navigate = useNavigate();

  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users


  useEffect(()=>{
    getUsers()
  },[onlineUsers])


  return (
    <div
      className={`bg-gray-900 h-full p-4 border-r border-emerald-700/30 overflow-y-scroll text-white 
      ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-4">
        <div className="flex justify-between items-center mb-4">
          <img src={assets.logo} alt="logo" className="max-w-32" />

         
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="max-h-5 cursor-pointer hover:opacity-80"
            />

           
            <div
              className="absolute top-full right-0 z-20 w-40 p-4 rounded-lg 
              bg-gray-800 border border-emerald-700/50 text-gray-100 hidden 
              group-hover:block shadow-lg"
            >
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm py-2 hover:text-emerald-500"
              >
                Edit Profile
              </p>

              <hr className="my-2 border-gray-700" />

              <p onClick={()=> logout()} className="cursor-pointer text-sm py-2 hover:text-emerald-500">Logout</p>
            </div>
          </div>
        </div>
            <div className='bg-gray-800 rounded-full flex items-center gap-2 py-2
            px-4 border border-emerald-700/30'>
                <img src={assets.search_icon} alt="search" className='w-4 opacity-60' />
                <input onChange={(e)=>setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none
                text-white text-sm placeholder-gray-500 flex-1' placeholder="Search users..."/>
            </div>

      </div>

      <div className='flex flex-col gap-1'>
        {filteredUsers.map((user, index)=>(
            <div onClick={()=> {setSelectedUser(user);
            setUnseenMessages(prev=>({...prev, [user._id] : 0}))}}
            key={index} className={`relative flex items-center gap-3 p-3 rounded-lg
            cursor-pointer max-sm:text-sm transition-all ${selectedUser?._id===user._id && 
                'bg-emerald-700/20 border border-emerald-700/50'}`} >
                <img src={user?.profilePic || assets.avatar_icon} alt="" 
                className='w-10 h-10 rounded-full object-cover flex-shrink-0'/>
                <div className='flex flex-col leading-5 flex-1 min-w-0'>
                    <p className='font-medium truncate'>{user.fullName}</p>
                    {
                        onlineUsers.includes(user._id)
                        ? <span className='text-emerald-500 text-xs'>Online</span>
                        : <span className='text-gray-500 text-xs'>Offline</span>
                    }

                </div>
                {unseenMessages[user._id] > 0 && <p className='text-xs h-5 w-5
                flex items-center justify-center rounded-full bg-emerald-600 text-white font-semibold flex-shrink-0'>{unseenMessages[user._id]}</p>}
            </div>
        ))}


      </div>
    </div>
  );
};

export default Sidebar;