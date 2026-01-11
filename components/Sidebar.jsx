import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import ChatLabel from './ChatLabel'
import { UserButton } from '@clerk/nextjs'

const Sidebar = ({expand, setExpand}) => {
  return (
    <div className={`flex flex-col justify-between bg-[#212121] transition-all duration-300 h-screen border-r border-gray-800/50
      ${expand ? 'w-64 p-4' : 'w-20 py-7 px-3'}
      max-md:fixed max-md:top-0 max-md:left-0 max-md:z-50
      ${expand ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}`}>
      <div>
        <div className={`flex ${expand ? "flex-row items-center justify-between pt-3" : "flex-col items-center gap-8"}`}>
            <Image 
              className={`${expand ? "w-32" : "w-9"} transition-all duration-300`} 
              src={expand ? assets.logo_text : assets.logo_icon} 
              alt='logo' 
            />
  
            <div 
              onClick={() => setExpand(!expand)}
              className='group relative flex items-center justify-center hover:bg-gray-700/30 transition-all duration-300 h-9 w-9 flex-shrink-0 rounded-lg cursor-pointer'
            >
              <Image 
                src={assets.menu_icon} 
                alt='menu' 
                className='md:hidden w-6'
              />
              <Image 
                src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} 
                alt='toggle' 
                className='hidden md:block w-7' 
              />
              <div className={`absolute w-max ${expand ? "left-1/2 -translate-x-1/2 top-12" : "left-12 top-1/2 -translate-y-1/2"}
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg pointer-events-none z-[100]`}>
                {expand ? 'Close sidebar' : 'Open sidebar'}
                <div className={`w-2 h-2 absolute bg-gray-900 rotate-45 ${expand ? "left-1/2 -top-1 -translate-x-1/2" : "-left-1 top-1/2 -translate-y-1/2"}`}></div>
              </div>
            </div>
        </div>

        <button className={`mt-6 flex items-center justify-center cursor-pointer transition-all duration-300 ${expand ? "bg-[#4d6bfe] hover:bg-[#3d5bee] rounded-xl gap-2.5 p-2.5 w-full" : 
          "group relative h-10 w-10 mx-auto hover:bg-gray-700/30 rounded-lg"}`}>
          <Image 
            className={expand ? 'w-5' : 'w-6'} 
            src={expand ? assets.chat_icon : assets.chat_icon_dull} 
            alt='chat' 
          />
          {!expand && (
            <div className='absolute w-max left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg pointer-events-none z-[100]'>
              New chat
              <div className='w-2 h-2 absolute bg-gray-900 rotate-45 -left-1 top-1/2 -translate-y-1/2'></div>
            </div>
          )}
          {expand && <p className='text-white text-[15px] font-medium'>New chat</p>}
        </button>

        {expand && (
          <div className='mt-7 text-white/40 text-xs font-medium'>
            <p className='mb-2 px-2'>Recents</p>
            <div className='space-y-1'>
              <ChatLabel chatName="Chat Name Here" />
            </div>
          </div>
        )}
      </div>

      <div className='space-y-2 pb-4'>
        <div className={`flex items-center cursor-pointer group relative transition-all duration-300 ${expand ? "gap-2.5 text-white/80 text-[13px] p-2.5 border border-gray-700 rounded-xl hover:bg-gray-700/30" : "h-10 w-10 mx-auto hover:bg-gray-700/30 rounded-lg justify-center"}`}>
          <Image 
            className={expand ? "w-4" : "w-5"} 
            src={expand ? assets.phone_icon : assets.phone_icon_dull} 
            alt='phone'
          />
          <div className={`absolute -top-56 pb-8 ${expand ? "left-1/2 -translate-x-1/2" : "-right-40"}
            opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity duration-200 z-[100]`}>
            <div className='relative w-max bg-gray-900 text-white text-xs p-3 rounded-lg shadow-lg'>
              <Image src={assets.qrcode} alt='qr' className='w-40'/>
              <p className='mt-2 text-center'>Scan to get DeepSeek App</p>
              <div className={`w-2 h-2 absolute bg-gray-900 rotate-45 ${expand ? "left-1/2 -translate-x-1/2" : "left-4"} -bottom-1`}></div>
            </div>
          </div>
          {expand && (
            <>
              <span>Get App</span> 
              <span className='ml-auto bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold'>NEW</span>
            </>
          )}
        </div>

        <div className={`flex items-center transition-all duration-300 ${expand ? 'hover:bg-gray-700/30 rounded-xl gap-2.5 p-2.5' : 'justify-center w-full hover:bg-gray-700/30 rounded-lg h-10'} text-white/70 text-[13px] cursor-pointer`}>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-6 h-6"
              }
            }}
          />
          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar