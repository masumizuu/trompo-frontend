import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";

const ChatPage: React.FC = () => {
    const { businessId } = useParams();
    const [senderId, setSenderId] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        setSenderId(userId);
    }, []);

    if (!businessId || !senderId) return <p>Loading...</p>;

    return (
        <div className="chat-page mt-44 text-tr-0">
            <div className="left-sidebar">
                <ChatList businessId={businessId} />
            </div>
            <div className="chat-box">
                <Chat senderId={senderId} receiverId={businessId} />
            </div>
        </div>
    );
};

export default ChatPage;