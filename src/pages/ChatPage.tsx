import React from "react";
import { useParams } from "react-router-dom";
import Chat from "./components/Chat";

const ChatPage: React.FC = () => {
    const { businessId } = useParams(); // ✅ Get Business ID from URL

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-xl font-semibold">Chat with Seller</h2>
                <Chat senderId="customer_123" receiverId={businessId || ""} />
            </div>
        </div>
    );
};

export default ChatPage;