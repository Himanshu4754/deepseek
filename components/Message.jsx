import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const Message = ({ role, content }) => {
  const [showActions, setShowActions] = useState(false)

  return (
    <div className='w-full mb-8'>
      {role === 'user' ? (
        <div className='flex flex-col items-center'>
          <div 
            className='bg-[#4a4a5e] text-white px-5 py-2.5 rounded-2xl text-[15px] inline-block relative group'
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
          >
            {content}
            {showActions && (
              <div className='absolute -bottom-10 left-0 flex items-center gap-2'>
                <div className='bg-[#2a2a2a] rounded-lg p-1.5 cursor-pointer hover:bg-[#3a3a3a] transition'>
                  <Image src={assets.copy_icon} alt='copy' className='w-4 h-4' />
                </div>
                <div className='bg-[#2a2a2a] rounded-lg p-1.5 cursor-pointer hover:bg-[#3a3a3a] transition'>
                  <Image src={assets.edit_icon} alt='edit' className='w-4 h-4' />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div 
          className='flex items-start gap-3 max-w-4xl relative group'
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <Image src={assets.logo_icon} alt='ai' className='w-8 h-8 flex-shrink-0'/>
          <div className='flex-1'>
            <p className='text-white/90 text-[15px] leading-relaxed whitespace-pre-wrap'>{content}</p>
            {showActions && (
              <div className='flex items-center gap-2 mt-3'>
                <div className='bg-[#2a2a2a] rounded-lg p-1.5 cursor-pointer hover:bg-[#3a3a3a] transition'>
                  <Image src={assets.copy_icon} alt='copy' className='w-4 h-4' />
                </div>
                <div className='bg-[#2a2a2a] rounded-lg p-1.5 cursor-pointer hover:bg-[#3a3a3a] transition'>
                  <Image src={assets.refresh_icon} alt='regenerate' className='w-4 h-4' />
                </div>
                <div className='bg-[#2a2a2a] rounded-lg p-1.5 cursor-pointer hover:bg-[#3a3a3a] transition'>
                  <Image src={assets.like_icon} alt='like' className='w-4 h-4' />
                </div>
                <div className='bg-[#2a2a2a] rounded-lg p-1.5 cursor-pointer hover:bg-[#3a3a3a] transition'>
                  <Image src={assets.dislike_icon} alt='dislike' className='w-4 h-4' />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Message