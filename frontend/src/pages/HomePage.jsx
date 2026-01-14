import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'


const Home = () => {
    const {selectedUser} = useContext(ChatContext)
 
  return (
    <div className='w-full h-screen sm:px-[15%] sm:py-[5%] bg-gray-950'> 
      <div className={`border border-emerald-700/50
      rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 
        'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
        <Sidebar />
        <ChatContainer/>
        <RightSidebar/>

      </div>
      
    </div>
  )
}

export default Home