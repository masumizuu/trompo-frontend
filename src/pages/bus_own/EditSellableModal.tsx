import React, { useState } from "react";
import { editSellable } from "../../api";
import { EditSellableModalProps } from "../../interfaces";

const EditSellableModal: React.FC<EditSellableModalProps> = ({ sellable, onClose, onUpdate }) => {
    const [name, setName] = useState(sellable.name);
    const [type, setType] = useState(sellable.type);
    const [price, setPrice] = useState(sellable.price);
    const [description, setDescription] = useState(sellable.description);
    const [isActive, setIsActive] = useState(sellable.is_active);
    const [media, setMedia] = useState(sellable.media || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const user_id = localStorage.getItem("user_id") || "";

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const updatedData = { name, type, price, description, is_active: isActive, media };
            const updatedSellable = await editSellable(sellable.sellable_id, user_id, updatedData); // Pass user_id
            onUpdate(updatedSellable);
            onClose();
        } catch (err: any) {
            setError("Failed to update sellable.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="py-12 bg-black bg-opacity-50 transition duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center">
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <h2 className="text-tr-0 font-bold tracking-normal leading-tight mb-4">Edit Sellable</h2>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mt-4">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                    >
                        <option value="PRODUCT">Product</option>
                        <option value="SERVICE">Service</option>
                    </select>

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mt-4">Price (₱)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mt-4">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-20 mt-2 p-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                        placeholder="Enter description..."
                    ></textarea>

                    <label className="flex items-center mt-4 text-gray-800 text-sm font-bold">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => setIsActive(!isActive)}
                            className="mr-2"
                        />
                        Active
                    </label>

                    <div className="mt-4">
                        <label className="text-gray-800 text-sm font-bold">Media</label>
                        <input
                            type="text"
                            value={media.join(", ")}
                            onChange={(e) => setMedia(e.target.value.split(",").map(item => item.trim()))}
                            className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                            placeholder="Enter image URLs, comma-separated"
                        />
                    </div>

                    <div className="flex items-center justify-start w-full mt-4">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`focus:outline-none focus:ring-2 ${
                                loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
                            } focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out rounded text-white px-8 py-2 text-sm`}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                            onClick={onClose}
                            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                        >
                            Cancel
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                        aria-label="close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-x"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSellableModal;