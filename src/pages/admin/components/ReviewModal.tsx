import React, { useState } from 'react';
import { ReviewModalProps } from "../../../interfaces";
import CustomAlert from "../../components/CustomAlert";

const ReviewModal: React.FC<ReviewModalProps> = ({ review, onClose, onDelete }) => {
    const [deleteReason, setDeleteReason] = useState("");

    const [alert, setAlert] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

    const handleDelete = () => {
        if (!deleteReason.trim()) {
            setAlert({
                title: "Missing Reason",
                message: "Please provide a reason before deleting the review.",
                onConfirm: () => setAlert(null),
            });
            return;
        }

        setAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this review? This action cannot be undone.",
            onConfirm: () => {
                onDelete(review.review_id, deleteReason);
                setAlert(null);
            },
        });
    };

    return (
        <div className="py-12 bg-black bg-opacity-50 transition duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center">
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <h2 className="text-tr-0 font-bold tracking-normal leading-tight mb-4">Review Details</h2>

                    <p className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Reviewer</p>
                    <p className="mb-4 mt-2 text-gray-600">{review.User.first_name} {review.User.last_name}</p>

                    <p className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Business</p>
                    <p className="mb-4 mt-2 text-gray-600">{review.Business.business_name}</p>

                    <p className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Rating</p>
                    <p className="mb-4 mt-2 text-gray-600">{review.rating} ⭐</p>

                    <p className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Review</p>
                    <p className="mb-4 mt-2 text-gray-600">{review.review_text}</p>

                    <div className="mt-6">
                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Reason for Deletion</label>
                        <textarea
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                            className="w-full h-20 mt-2 p-2 text-gray-600 border-gray-300 rounded border bg-gray-100 focus:outline-none focus:border-tr-0"
                            placeholder="Enter reason..."
                        ></textarea>

                        <div className="flex items-center justify-start w-full mt-4">
                            <button
                                onClick={handleDelete}
                                className="focus:outline-none focus:ring-2 bg-red-500 focus:ring-offset-2 focus:ring-red-700 transition duration-150 ease-in-out hover:bg-red-700 rounded text-white px-8 py-2 text-sm hover:border-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={onClose}
                                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                            >
                                Cancel
                            </button>
                        </div>
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

            {alert && (
                <CustomAlert
                    title={alert.title}
                    message={alert.message}
                    onConfirm={alert.onConfirm}
                    onCancel={() => setAlert(null)}
                />
            )}

        </div>
    );
};

export default ReviewModal;