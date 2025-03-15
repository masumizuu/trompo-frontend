import React from "react";

interface CustomAlertProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full md:w-1/3 mx-auto">
                <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-block p-4 bg-yellow-50 rounded-full">
                            <svg className="w-12 h-12 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
                            </svg>
                        </div>
                        <h2 className="mt-2 font-semibold text-gray-800">{title}</h2>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{message}</p>
                    </div>

                    <div className="flex items-center mt-3">
                        <button
                            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            className="flex-1 px-4 py-2 ml-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md"
                            onClick={onConfirm}
                        >
                            Agree
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomAlert;