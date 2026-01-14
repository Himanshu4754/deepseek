"use client";
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = ({children})=> {
    const {user} = useUser()
    const { getToken } = useAuth()

    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const createNewChat = async () => {
        try{
            console.log('Creating new chat...', user); // Debug log
            
            if(!user) {
                toast.error('Please sign in to create a chat');
                return null;
            }

            const token = await getToken();
            console.log('Token:', token); // Debug log

            const response = await axios.post('/api/chat/create', {}, {
                headers: {Authorization: `Bearer ${token}`}
            });  

            console.log('Create chat response:', response.data); // Debug log
            
            if(response.data.success) {
                toast.success('New chat created!');
                await fetchUsersChats();
            } else {
                toast.error(response.data.message || 'Failed to create chat');
            }

        } catch (error) {
            console.error('Create chat error:', error); // Debug log
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const fetchUsersChats = async () => {
        try{
            if(!user) return null;
            const token = await getToken();

            const {data} = await axios.get('/api/chat/get', {headers: {Authorization: `Bearer ${token}`}});
            if(data.success){
                console.log('Fetched chats:', data.data);
                setChats(data.data);

                // if the user has no chats, create a new chat
                if(data.data.length === 0){
                    await createNewChat();
                    return fetchUsersChats();
                } else {
                    // sort chats by updated date
                    data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

                    // set recently updated chat as selected chat
                    setSelectedChat(data.data[0]);
                    console.log('Selected chat:', data.data[0]);
                }
            } else {
                toast.error(data.message);
            }

        } catch (error) {   
            console.error('Fetch chats error:', error);
            toast.error(error.response?.data?.message || error.message);  
        }       
    } 

    useEffect(() => {
        if(user){
            fetchUsersChats();
        }
    }, [user]);

    const value = {
        user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        createNewChat,
        fetchUsersChats
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}