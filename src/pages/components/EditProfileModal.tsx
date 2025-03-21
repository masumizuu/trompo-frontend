import React, { useState } from "react";
import { User } from "../../interfaces";
import {editUser} from "../../api.ts";

interface EditProfileModalProps {
    user: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {

    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        user_type: user.user_type,
        is_verified: user.is_verified,
        profile_picture: user.profile_picture,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {

        try {
            // Send only the fields that have changed
            const updatedUser = await editUser(user.user_id, formData); // Send formData directly
            onSave(updatedUser); // Pass updated user data to parent component
            onClose(); // Close the modal after saving

            // Trigger a full page reload
            window.location.reload(); // Refresh the page to reflect the changes

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Failed to update profile.");
        }
    };

    return (
        <div className="py-12 bg-black bg-opacity-50 transition duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center">
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <h2 className="text-tr-0 font-bold tracking-normal leading-tight mb-4">Edit User</h2>

                    <p className="text-tr-0">{error}</p>

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="mb-4 mt-2 text-gray-600 focus:outline-none focus:border focus:border-tr-0 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border bg-gray-100"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="mb-4 mt-2 text-gray-600 focus:outline-none focus:border focus:border-tr-0 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border bg-gray-100"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mb-4 mt-2 text-gray-600 focus:outline-none focus:border focus:border-tr-0 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border bg-gray-100"
                    />

                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="mb-4 mt-2 text-gray-600 focus:outline-none focus:border focus:border-tr-0 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border bg-gray-100"
                    />

                    <div className="flex items-center justify-start w-full mt-6">
                        <button
                            onClick={handleSubmit}
                            className="focus:outline-none focus:ring-2 bg-darkTR-0 focus:ring-offset-2 focus:ring-tr-0 transition duration-150 ease-in-out hover:bg-tr-0 rounded text-white px-8 py-2 text-sm hover:border-tr-0"
                        >
                            Save
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
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

export default EditProfileModal;