import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUnreadMessages } from "../../api";
import io from "socket.io-client";

const socket = io("http://localhost:5300");

const ChatList: React.FC<{ businessId: string }> = ({ businessId }) => {
    const [chats, setChats] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUnreadChats = async () => {
            const unreadChats = await getUnreadMessages(businessId);
            setChats(unreadChats);
        };

        fetchUnreadChats();
    }, [businessId]);

    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            setChats((prevChats) => [...prevChats, newMessage]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const handleClick = (chatId: number) => {
        navigate(`/chat/${chatId}`);
    };

    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <div key={chat.chatId} onClick={() => handleClick(chat.chatId)}>
                    <strong>{chat.sender.first_name}</strong>
                    <p>{chat.message}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatList;