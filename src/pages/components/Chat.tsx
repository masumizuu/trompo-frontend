import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5300", {
    transports: ["websocket", "polling"],
}); // ✅ Connect to the backend WebSocket server

const Chat: React.FC<{ senderId: string; receiverId: string }> = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState<{ senderId: string; message: string; product?: any }[]>([]);
    const [message, setMessage] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null); // ✅ Auto-scroll reference

    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); // ✅ Auto-scroll to latest message
    }, [messages]);

    const sendMessage = () => {
        if (message.trim() || selectedProduct) {
            const chatData = { senderId, receiverId, message, product: selectedProduct };
            socket.emit("sendMessage", chatData);
            setMessages((prev) => [...prev, chatData]); // ✅ Optimistically add message
            setMessage("");
            setSelectedProduct(null);
        }
    };

    return (
        <div className="chat-container p-4 border rounded-lg shadow-lg bg-white w-full max-w-md">
            <div className="messages overflow-y-auto h-80 border-b pb-3">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.senderId === senderId ? "sent" : "received"} mb-2`}>
                        <p className="p-2 rounded-lg bg-gray-200 text-black">{msg.message}</p>
                        {msg.product && (
                            <div className="p-2 mt-1 border rounded-lg bg-gray-100">
                                <strong>{msg.product.name}</strong> - ₱{msg.product.price}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Selected Product Preview */}
            {selectedProduct && (
                <div className="selected-product p-2 bg-gray-100 rounded mt-2 flex justify-between items-center">
                    <strong>{selectedProduct.name}</strong> - ₱{selectedProduct.price}
                    <button onClick={() => setSelectedProduct(null)} className="text-red-500">✕</button>
                </div>
            )}

            <div className="input-area flex gap-2 mt-3">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border rounded-lg p-2"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Send
                </button>
            </div>

            {/* Mock product selection (Attach product to chat) */}
            <button
                onClick={() => setSelectedProduct({ name: "Sample Product", price: 500 })}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg w-full">
                Attach Product
            </button>
        </div>
    );
};

export default Chat;