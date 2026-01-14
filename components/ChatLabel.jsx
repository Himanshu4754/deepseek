import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { useAppContext } from '@/context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const ChatLabel = ({ id, name }) => {

  const [showMenu, setShowMenu] = useState(false)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)

  const { fetchUsersChats, chats, setSelectedChat } = useAppContext();

  const selectChat = () => {
    const chat = chats.find(chat => chat._id === id)   
    setSelectedChat(chat);
  } 

  const renameHandler = async () => {
    setShowMenu(false)
    try {
      const newName = prompt("Enter new chat name:")
      if(!newName) return;
      const {data} = await axios.post('/api/chat/rename', {
        chatId: id,
        name: newName
      })
      if(data.success){
        await fetchUsersChats();
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
      }
  }

  const deleteHandler = async () => {
    setShowMenu(false)
    try {
      const confirm = window.confirm("Are you sure you want to delete this chat?")  
      if(!confirm) return;
      const {data} = await axios.delete('/api/chat/delete', {
        data: { chatId: id }
      })
      if(data.success){
        await fetchUsersChats();
        toast.success(data.message)
      } else { 
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
      }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target) && 
          menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  return ( 
    <div onClick={selectChat} className='relative flex items-center justify-between px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer'>
        <p className='flex-1 truncate pr-2'>{name}</p>
        <div 
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation()
            setShowMenu(!showMenu)
          }}
          className='flex items-center justify-center h-6 w-6 flex-shrink-0 hover:bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity'
        >
            <Image src={assets.three_dots} alt="" className='w-4'/>
        </div>
        
        {showMenu && (
          <div 
            ref={menuRef}
            className='fixed bg-[#2a2a2a] rounded-lg w-40 py-1.5 shadow-2xl z-[999] border border-gray-700/50'
            style={{
              top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 4 : 0,
              left: buttonRef.current ? buttonRef.current.getBoundingClientRect().right - 160 : 0,
            }}
          >
              <div 
                onClick={(e) => {
                  e.stopPropagation()
                  renameHandler()
                }}
                className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 text-[13px] cursor-pointer text-white'
              >
                  <Image src={assets.pencil_icon} alt='' className='w-4' />
                  <p>Rename</p>
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation()
                  deleteHandler()
                }}
                className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 text-[13px] cursor-pointer text-red-400'
              >
                  <Image src={assets.delete_icon} alt='' className='w-4' />
                  <p>Delete</p>
              </div>
          </div>
        )}
    </div>
  )
}

export default ChatLabel