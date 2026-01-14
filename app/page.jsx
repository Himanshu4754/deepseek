'use client';
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import PromptBox from "@/components/PromptBox";
import Message from "@/components/Message";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";


export default function Home() {
    const [expand, setExpand] = useState(false)
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { selectedChat } = useAppContext();
    const containerRef = useRef(null); 

    useEffect(() => { 
      console.log('Selected chat changed:', selectedChat); // Debug log
      if (selectedChat) {
        setMessages(selectedChat.messages || []);
      } else {
        setMessages([]);
      }
    }, [selectedChat]);

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    }, [messages]);  

    return (
      <div className="flex h-screen overflow-hidden bg-[#212121]">
        {expand && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setExpand(false)}
          />
        )}
        
        <Sidebar expand={expand} setExpand={setExpand}/> 
        
        <div className="flex-1 flex flex-col bg-[#212121] text-white relative">
          <div className={`md:hidden absolute px-4 top-6 flex items-center justify-between w-full z-30 transition-opacity duration-300 ${expand ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Image 
              onClick={() => setExpand(!expand)} 
              className="w-6 cursor-pointer" 
              src={assets.menu_icon}
              alt="Menu"
            />
            <Image className="w-6" src={assets.chat_icon} alt="Chat"/>
          </div>

          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="flex items-center gap-3 mb-2">
                <Image src={assets.logo_icon} alt="Logo" className="w-12"/>
                <p className="text-3xl font-normal">Hi, I'm DeepSeek.</p>
              </div>
              <p className="text-base text-gray-400 mb-12">How can I help you today?</p>
              
              <PromptBox setIsLoading={setIsLoading} isLoading={isLoading} messages={messages} setMessages={setMessages}/>
              
              <p className="text-xs text-center mt-4 text-gray-500">AI-generated, for reference only</p>
            </div>
          ) : (
            <>
              <div ref={containerRef} className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto">
                <div className="w-full max-w-3xl mx-auto">
                  <p className="fixed top-8 left-1/2 -translate-x-1/2 z-20 bg-[#212121] border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">
                    {selectedChat?.name || 'Untitled Chat'}
                  </p>
                  {messages.map((message, index) => (
                    <Message 
                      key={index} 
                      role={message.role} 
                      content={message.content} 
                    />
                  ))}
                  {
                    isLoading && (
                      <div className="flex gap-4 max-w-3xl w-full py-3">
                        <Image 
                          className="w-9 h-9 p-1 border border-white/15 rounded-full" 
                          src={assets.logo_icon} 
                          alt="Logo" 
                        />
                        <div className="loader flex justify-center items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                          <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                          <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              
              <div className="w-full flex flex-col items-center px-4 pb-6 pt-4 border-t border-gray-800/50">
                <PromptBox setIsLoading={setIsLoading} isLoading={isLoading} messages={messages} setMessages={setMessages}/>
                <p className="text-xs text-center mt-4 text-gray-500">AI-generated, for reference only</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
}