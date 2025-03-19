import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { getChatHistory, sendMessage } from "../../api";

const socket = io("http://localhost:5300");

const Chat: React.FC<{ senderId: string; receiverId: string }> = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchChatHistory = async () => {
            const chatHistory = await getChatHistory(senderId, receiverId);
            setMessages(chatHistory);
        };
        fetchChatHistory();
    }, [senderId, receiverId]);

    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const sentMessage = await sendMessage(senderId, receiverId, message);
            socket.emit("sendMessage", sentMessage);
            setMessages((prev) => [...prev, sentMessage]);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.senderId === senderId ? "sent" : "received"}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;