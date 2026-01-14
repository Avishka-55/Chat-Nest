import React, { useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const {messages, selectedUser, setSelectedUser,sendMessage, getMessages} = useContext(ChatContext)
  const { authUser, onlineUsers} = useContext(AuthContext)
  const scrollEnd = useRef()

  const [input, setInput] = useState('')

  const handleSendMessage = async(e)=>{
    e.preventDefault()
    if(input.trim() === "") return null
    await sendMessage({text: input.trim()})
    setInput("")
  }


  const handleSendImage = async(e)=>{
    const file = e.target.files[0]
    if(!file || !file.type.startsWith("image/")){
      toast.error("Select an image file")
      return
    }

    const reader = new FileReader()
    reader.onloadend = async()=>{
      await sendMessage({image: reader.result})
      e.target.value = ""

    }
    reader.readAsDataURL(file)
  }
  useEffect(()=>{
    if(selectedUser && messages){
      getMessages(selectedUser._id)
    }
  },[selectedUser])

  useEffect(()=>{
    if(scrollEnd.current) {
      scrollEnd.current.scrollIntoView({behavior: "smooth"})
    }
  },[messages])
  return selectedUser ? (
    <div className="h-full overflow-scroll relative bg-gray-900">
        {/* Header */}
      <div className="flex items-center gap-3 py-4 px-6 border-b border-emerald-700/30">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />

        <p className="flex-1 text-lg text-white font-medium flex items-center gap-2">
          {selectedUser.fullName}
          <span
            className={`w-2 h-2 rounded-full ${
              onlineUsers.includes(selectedUser._id) ? "bg-emerald-500" : "bg-gray-600"
            }`}
          ></span>
        </p>

        <img
          onClick={() => setSelectedUser(null)}
          className="md:hidden w-6 cursor-pointer hover:opacity-80"
          src={assets.arrow_icon}
          alt=""
        />

        <img
          src={assets.help_icon}
          className="max-md:hidden w-5 cursor-pointer hover:opacity-80"
          alt=""
        />
      </div>
      {/* chat area */}
     <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-4 pb-6 gap-2">
  {messages.map((msg, index) => {
    const isMe = msg.senderId === authUser._id

    return (
      <div
        key={index}
        className={`flex items-end gap-2 mb-2 ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        {!isMe && (
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        )}
        
        <div className="flex flex-col">
          {msg.image ? (
            <img
              src={msg.image}
              className="max-w-[220px] rounded-lg overflow-hidden"
            />
          ) : (
            <p
              className={`px-4 py-2 rounded-lg max-w-xs break-words text-sm ${
                isMe 
                  ? "bg-emerald-600 text-white rounded-br-none" 
                  : "bg-gray-800 text-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </p>
          )}
          <span className="text-xs text-gray-500 mt-1 px-2">
            {formatMessageTime(msg.createdAt)}
          </span>
        </div>

        {isMe && (
          <img
            src={authUser?.profilePic || assets.avatar_icon}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        )}
      </div>
    )
  })}
  <div ref={scrollEnd}></div>
</div>
{/* bottom area */}
    <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4 bg-gray-900 border-t border-emerald-700/30'>
      <div className='flex-1 flex items-center bg-gray-800 px-4 py-2 rounded-full border border-emerald-700/30'>
        <input onChange={(e)=> setInput(e.target.value)} value={input}
        onKeyDown={(e)=> e.key === "Enter" ? handleSendMessage(e): null}  type="text" placeholder='Type a message...'  
        className='flex-1 text-sm p-2 bg-transparent border-none outline-none
        text-white placeholder-gray-500'/>
        <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" className='w-5 cursor-pointer hover:opacity-80' />
        </label>
      </div>
      <img onClick={handleSendMessage} src={assets.send_button} className='w-6 h-6 cursor-pointer hover:opacity-80' alt="" />
    </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-500 bg-gray-900 max-md:hidden h-full">
      <img src={assets.logo} className="w-16 opacity-60" alt="" />
      <p className="text-xl font-semibold text-gray-400">Chat anytime, anywhere</p>
      <p className="text-sm text-gray-600">Select a user to start messaging</p>
    </div>
  )
}

export default ChatContainer