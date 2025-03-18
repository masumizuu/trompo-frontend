import React, { useState, useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { submitBusinessVerification } from "../../api.ts"; // Adjust import for business verification
import { SubmitVerificationModalProps } from "../../interfaces.ts";

const SubmitVerificationModal: React.FC<SubmitVerificationModalProps> = ({ isOpen, onClose, business_id }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Add ref for file input
    const [success, setSuccess] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Ensure the file is selected
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("business_permit", file); // Append the business permit file
        console.log(business_id);

        // Log the FormData to inspect its contents
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const result = await submitBusinessVerification(formData, business_id);
            console.log("Business verification submitted successfully:", result);
        } catch (error) {
            console.error("Error submitting business verification:", error);
        }
    };

    const handleFileInputClick = () => {
        // Trigger the file input click when the link is clicked
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileDelete = () => {
        setFile(null); // Reset file state to allow re-upload
    };

    const onSuccess = () => {
        setUploaded(true);
        setSuccess("Verification submitted. Please wait patiently for the administrator to review your business.");
        setFile(null);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="py-12 bg-black bg-opacity-50 transition duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center">
                    <div className="p-10 bg-white rounded-xl z-5">
                        <div className="text-center">
                            <p className="mt-5 text-2xl font-bold text-gray-900">Please upload a clear picture of your business permit. <br/>The business name must match the name of the business you registered on <em className="text-tr-0">trompo.</em></p>
                            <p className="mt-2 text-sm text-gray-400">Accepted Documents: Business Permit, Certificate of Registration</p>
                        </div>
                        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                        {/* Show this part only if no file is selected */}
                                        {!file ? (
                                            <div className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                                                <div className="flex flex-auto max-h-48 w-2/5 justify-center">
                                                    <IoCloudUploadOutline className="h-36 w-36 text-tr-0"/>
                                                </div>
                                                <p className="pointer-none text-gray-500">
                                                    <span className="text-sm">Drag and drop</span> files here <br /> or{" "}
                                                    <a href="#" className="text-tr-0 hover:underline"
                                                       onClick={handleFileInputClick}>
                                                        select a file
                                                    </a>{" "}
                                                    from your computer
                                                </p>
                                            </div>
                                        ) : (
                                            // If file is selected, show the preview and options to delete or re-upload
                                            <div className="flex flex-col items-center justify-center">
                                                <img
                                                    className="h-36 w-36 object-cover rounded-lg"
                                                    src={URL.createObjectURL(file)} // Create a URL for the selected file
                                                    alt="Selected File Preview"
                                                />
                                                <p className="mt-3 text-sm text-gray-500">{file.name}</p>
                                                <button
                                                    type="button"
                                                    onClick={handleFileDelete}
                                                    className="mt-6 text-red-500 text-sm hover:underline"
                                                >
                                                    Remove file
                                                </button>
                                            </div>
                                        )}
                                        <input
                                            id="select"
                                            type="file"
                                            ref={fileInputRef} // Use the ref here
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300">
                                <span>File type: .png, .jpg, jpeg </span>
                            </p>
                            <div className="flex flex-row gap-4">
                                <button
                                    type="submit"
                                    className="my-5 w-1/2 flex justify-center bg-tr-0 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-darkTR-0 shadow-lg cursor-pointer transition ease-in duration-300 hover:border-darkTR-0"
                                    onClick={onSuccess}
                                >
                                    Upload
                                </button>

                                <button
                                    type="button"
                                    className="my-5 w-1/2 flex justify-center bg-tr-0 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-darkTR-0 shadow-lg cursor-pointer transition ease-in duration-300 hover:border-darkTR-0"
                                    onClick={onClose} // Close the modal when Cancel is clicked
                                >
                                    Cancel
                                </button>
                            </div>

                            {uploaded && (
                                <p className="text-green-600">{success}</p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubmitVerificationModal;