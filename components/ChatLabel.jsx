import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const ChatLabel = ({ chatName = "Chat Name Here" }) => {
  const [showMenu, setShowMenu] = useState(false)

  return ( 
    <div className='relative flex items-center justify-between px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer'>
        <p className='flex-1 truncate pr-2'>{chatName}</p>
        <div 
          onClick={(e) => {
            e.stopPropagation()
            setShowMenu(!showMenu)
          }}
          className='flex items-center justify-center h-6 w-6 flex-shrink-0 hover:bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity'
        >
            <Image src={assets.three_dots} alt="" className='w-4'/>
        </div>
        
        {showMenu && (
          <>
            <div 
              className='fixed inset-0 z-40' 
              onClick={() => setShowMenu(false)}
            />
            <div className='absolute -right-2 top-10 bg-[#2a2a2a] rounded-lg w-40 py-1.5 shadow-xl z-50 border border-gray-700/50'>
                <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 text-[13px] cursor-pointer'>
                    <Image src={assets.pencil_icon} alt='' className='w-4' />
                    <p>Rename</p>
                </div>
                <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 text-[13px] cursor-pointer text-red-400'>
                    <Image src={assets.delete_icon} alt='' className='w-4' />
                    <p>Delete</p>
                </div>
            </div>
          </>
        )}
    </div>
  )
}

export default ChatLabel