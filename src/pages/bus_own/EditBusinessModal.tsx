import React, { useState } from "react";
import { Business } from "../../interfaces";
import { updateBusiness } from "../../api";

interface EditBusinessModalProps {
    business: Business;
    user_id: string;
    onClose: () => void;
    onUpdate: (updatedBusiness: Business) => void;
}

const EditBusinessModal: React.FC<EditBusinessModalProps> = ({ business, user_id, onClose, onUpdate }) => {
    const [businessName, setBusinessName] = useState(business.business_name);
    const [description, setDescription] = useState(business.description);
    const [categoryId, setCategoryId] = useState(business.Category.category_id);
    const [address, setAddress] = useState(business.address);
    const [contactNumber, setContactNumber] = useState(business.contact_number);
    const [websiteUrl, setWebsiteUrl] = useState(business.website_url || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const updatedData = {
                business_name: businessName,
                description,
                category_id: categoryId,
                address,
                contact_number: contactNumber,
                website_url: websiteUrl,
            };

            const updatedBusiness = await updateBusiness(business.business_id, Number(user_id), updatedData);
            onUpdate(updatedBusiness);
            onClose();
        } catch (err: any) {
            setError("Failed to update business.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-12 bg-black bg-opacity-50 transition duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center">
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <h2 className="text-tr-0 font-bold tracking-normal leading-tight mb-4">Edit Business</h2>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Business Name</label>
                    <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mt-4">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-20 mt-2 p-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                        placeholder="Enter business description..."
                    ></textarea>

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mt-4">Category ID</label>
                    <input
                        type="number"
                        value={categoryId}
                        onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mt-4">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mt-4">Contact Number</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mt-4">Website URL</label>
                    <input
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full p-2 mt-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                        placeholder="Enter website URL (optional)"
                    />

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

export default EditBusinessModal;