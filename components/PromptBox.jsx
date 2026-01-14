import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const PromptBox = ({setIsLoading, isLoading}) => {
    const [prompt, setPrompt] = useState('');
    const {user, chats, setChats, selectedChat, setSelectedChat} = useAppContext();

    const sendPrompt = async (e) => {
        e.preventDefault();
        
        if(!prompt.trim()) return;
        if(!user) return toast.error("Login to send message");
        if(isLoading) return toast.error("Wait for the previous prompt response");

        const promptCopy = prompt;
        setPrompt('');
        setIsLoading(true);

        try {
            const userPrompt = {
                role: 'user',
                content: promptCopy,
                timestamp: Date.now()
            }

            // Add user prompt to chats array
            setChats((prevChats) => prevChats.map((chat) => 
                chat._id === selectedChat._id 
                    ? {...chat, messages: [...chat.messages, userPrompt]} 
                    : chat
            ))   
            
            // Add user prompt to selected chat
            setSelectedChat((prev) => ({
                ...prev,
                messages: [...prev.messages, userPrompt]
            }))

            // Call API
            const {data} = await axios.post('/api/chat/ai', {
                chatId: selectedChat._id,
                prompt: promptCopy
            })

            if(data.success){
                // Update chats with AI response
                setChats((prevChats) => prevChats.map((chat) => 
                    chat._id === selectedChat._id 
                        ? {...chat, messages: [...chat.messages, data.data]} 
                        : chat
                )) 

                // Animate AI response word by word
                const message = data.data.content;
                const messageTokens = message.split(' ');
                
                let assistantMessage = {
                    role: 'assistant',
                    content: '',
                    timestamp: Date.now()
                }
                
                // Add empty assistant message
                setSelectedChat((prev) => ({
                    ...prev,
                    messages: [...prev.messages, assistantMessage]
                }))

                // Animate each word
                for(let index = 0; index < messageTokens.length; index++){
                    setTimeout(() => {
                        assistantMessage.content = messageTokens.slice(0, index + 1).join(' ');
                        setSelectedChat((prev) => {
                            const updatedMessages = [
                                ...prev.messages.slice(0, -1),
                                {...assistantMessage}
                            ]
                            return {...prev, messages: updatedMessages}
                        })
                    }, index * 100)
                }
            } else {
                toast.error(data.message || "Failed to get response");
                setPrompt(promptCopy);
            }

        } catch (error) {   
            console.error('API Error:', error);
            toast.error(error.response?.data?.message || error.message || "Failed to send message");
            setPrompt(promptCopy);
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <form onSubmit={sendPrompt} className="w-full max-w-2xl bg-[#2f2f2f] p-1.5 rounded-[32px] transition-all border border-gray-700/40">
            <div className="bg-[#2f2f2f] rounded-[28px] px-4 pt-3 pb-2">
                <textarea
                    className='outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white placeholder:text-gray-500 text-[15px] leading-6'
                    rows={1}
                    placeholder='Message DeepSeek' 
                    onChange={(e) => setPrompt(e.target.value)} 
                    value={prompt}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendPrompt(e);
                        }
                    }}
                    style={{
                        minHeight: '24px',
                        maxHeight: '200px'
                    }}
                />

                <div className='flex items-center justify-between mt-2.5'>
                    <div className='flex items-center gap-2'>
                        <button 
                            type="button" 
                            className='flex items-center gap-1.5 text-[13px] bg-[#404040] hover:bg-[#4a4a4a] px-3 py-1.5 rounded-full cursor-pointer transition border border-gray-700/50'
                        >
                            <Image className='w-4 h-4' src={assets.deepthink_icon} alt=''/>
                            <span className='text-white/90'>DeepThink (R1)</span>
                        </button>
                        
                        <button 
                            type="button" 
                            className='flex items-center gap-1.5 text-[13px] bg-transparent hover:bg-[#404040] px-3 py-1.5 rounded-full cursor-pointer transition border border-gray-700/50'
                        >
                            <Image className='w-4 h-4' src={assets.search_icon} alt=''/>
                            <span className='text-white/90'>Search</span>
                        </button>
                    </div>
                    
                    <div className='flex items-center gap-3'>
                        <Image 
                            className='w-5 h-5 cursor-pointer opacity-50 hover:opacity-100 transition' 
                            src={assets.pin_icon} 
                            alt=''
                        />
                        
                        <button 
                            type="submit"
                            disabled={!prompt.trim() || isLoading}
                            className={`${prompt.trim() && !isLoading ? "bg-white/90 hover:bg-white" : "bg-gray-600 cursor-not-allowed"} rounded-full p-2 transition-all`}
                        >
                            <Image 
                                className='w-5 h-5' 
                                src={prompt.trim() && !isLoading ? assets.arrow_icon : assets.arrow_icon_dull} 
                                alt=''
                            />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PromptBox