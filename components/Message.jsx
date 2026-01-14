import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import toast from 'react-hot-toast'

const Message = ({ role, content, onEdit }) => {
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const copyMessage = () => { 
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  }

  return (
    <div className='w-full mb-8'>
      {role === 'user' ? (
       
        <div className='flex items-center justify-end gap-3 group w-full'>
          
         
          <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
           
            <div 
                onClick={copyMessage} 
                className='bg-[#2f2f2f] rounded-full p-2 cursor-pointer hover:bg-[#3a3a3a] transition border border-gray-700/50'
                title="Copy"
            >
                <Image src={assets.copy_icon} alt='copy' className='w-3.5 h-3.5 opacity-70' />
            </div>

           
            <div 
                className='bg-[#2f2f2f] rounded-full p-2 cursor-default border border-gray-700/50 opacity-50'
                title="Edit disabled"
            >
                <Image src={assets.edit_icon} alt='edit' className='w-3.5 h-3.5' />
            </div>
          </div>

          
          <div className='bg-[#4a4a5e] text-white px-5 py-2.5 rounded-[20px] text-[15px] leading-relaxed max-w-[80%]'>
            {content}
          </div>
        </div>

      ) : (
      
        <div 
          className='flex items-start gap-3 max-w-4xl relative group'
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <Image src={assets.logo_icon} alt='ai' className='w-8 h-8 flex-shrink-0 rounded-full'/>
          <div className='flex-1'>
            <div className='text-white/90 text-[15px] leading-relaxed whitespace-pre-wrap'>
              <Markdown>{content}</Markdown>
            </div>
            {showActions && (
              <div className='flex items-center gap-2 mt-3'>
                <div className='bg-[#2a2a2a] rounded-lg p-1.5 cursor-pointer hover:bg-[#3a3a3a] transition'>
                  <Image onClick={copyMessage} src={assets.copy_icon} alt='copy' className='w-4 h-4' />
                </div>
                <div className='bg-[#2a2a2a] rounded-lg p-1.5 cursor-pointer hover:bg-[#3a3a3a] transition'>
                  <Image src={assets.regenerate_icon} alt='regenerate' className='w-4 h-4' />
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