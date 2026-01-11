import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const PromptBox = ({setIsLoading, isLoading}) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            setIsLoading(true);
            // Your API call or message handling
            console.log('Submitted:', prompt);
        }
    };

    return ( 
        <div className="w-full max-w-2xl bg-[#404045] p-3.5 rounded-[28px] transition-all">
            <textarea
                className='outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white placeholder:text-gray-400 text-[15px] leading-5'
                rows={1}
                placeholder='Message DeepSeek' 
                onChange={(e) => setPrompt(e.target.value)} 
                value={prompt}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
                style={{
                    minHeight: '24px',
                    maxHeight: '200px'
                }}
            />

            <div className='flex items-center justify-between mt-3'>
                <div className='flex items-center gap-2'>
                    <button 
                        type="button" 
                        className='flex items-center gap-1.5 text-[13px] bg-[#2c2c31] hover:bg-[#35353b] px-3.5 py-1.5 rounded-full cursor-pointer transition border border-gray-600/30'
                    >
                        <Image className='w-4 h-4' src={assets.deepthink_icon} alt=''/>
                        <span className='text-white/90'>DeepThink (R1)</span>
                    </button>
                    
                    <button 
                        type="button" 
                        className='flex items-center gap-1.5 text-[13px] bg-[#2c2c31] hover:bg-[#35353b] px-3.5 py-1.5 rounded-full cursor-pointer transition border border-gray-600/30'
                    >
                        <Image className='w-4 h-4' src={assets.search_icon} alt=''/>
                        <span className='text-white/90'>Search</span>
                    </button>
                </div>
                
                <div className='flex items-center gap-3'>
                    <Image 
                        className='w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition' 
                        src={assets.pin_icon} 
                        alt=''
                    />
                    
                    <button 
                        onClick={handleSubmit}
                        disabled={!prompt.trim() || isLoading}
                        className={`${prompt.trim() && !isLoading ? "bg-[#5b7aef] hover:bg-[#4a69de]" : "bg-[#71717a] cursor-not-allowed"} rounded-full p-2.5 transition-all`}
                    >
                        <Image 
                            className='w-[18px] h-[18px]' 
                            src={prompt.trim() && !isLoading ? assets.arrow_icon : assets.arrow_icon_dull} 
                            alt=''
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PromptBox