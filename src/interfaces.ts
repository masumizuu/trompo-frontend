export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    user_type: string;
    is_verified: boolean;
    date_registered: string;
    profile_picture: string;
}

export interface Location {
    location_id: number;
    city: string;
    province: string;
    postal_code: string;
}

export interface Sellable {
    sellable_id: number;
    name: string;
    type: "PRODUCT" | "SERVICE";
    price: number;
    description: string;
    media: string[];
    is_active: boolean;
    business_name: string;
    business_id: number;
}

export interface Category {
    category_id: number;
    category_name: string;
}

export interface Business {
    business_id: number;
    business_name: string;
    description: string;
    Category: Category;
    address: string;
    contact_number: string;
    website_url: string;
    is_verified: boolean;
    Locations: Location[];
    sellables: Sellable[];
    user_id: number;
    date_registered: string;
    logo: string;
    banner: string;
}

export interface Dispute {
    dispute_id: number;
    transaction_id: number;
    complainant_id: number;
    reason: string;
    status: "PENDING" | "RESOLVED" | "DISMISSED";
    admin_response?: string;
    Complainant: User; // For frontend ease-of-use
}

export interface Review {
    review_id: number;
    user_id: number;
    business_id: number;
    rating: number; // 1-5 stars
    review_text?: string;
    media: string[]; // Array of image/video URLs
    review_date: string;
    is_verified: boolean;
    User: User; // For frontend ease-of-use
    Business: Business; // For frontend ease-of-use
}

export interface UserVerification {
    verification_id: number;
    user_id: number;
    id_image: string; // Path to uploaded ID image
    status: "PENDING" | "APPROVED" | "DENIED";
    reviewed_by?: number | null; // Admin ID (optional)
    response_date?: string | null; // ISO Date string
    denial_reason?: string | null;
    User?: {
        first_name: string;
        last_name: string;
    }; // Populated when fetching with User details
}

export interface VerificationRequest {
    request_id: number;
    business_id: number;
    status: "PENDING" | "APPROVED" | "DENIED";
    business_permit: string; // Image URL
    request_date: string; // ISO Date string
    reviewed_by?: number | null; // Admin ID (nullable)
    response_date?: string | null; // ISO Date string
    denial_reason?: string | null;
    Business?: {
        business_name: string;
    }; // Populated when fetching with Business details
}

// COMPONENTS PROPS

export interface EditUserModalProps {
    user: {
        user_id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        user_type: string;
        is_verified: boolean;
    };
    onClose: () => void;
    onSave: (updatedUser: any) => void;
}

export interface SubmitIdModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface SubmitVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    business_id: string;
}

export interface DisputeModalProps {
    dispute: Dispute;
    onClose: () => void;
    onResolve: (disputeId: number, adminResponse: string) => void;
}

export interface ReviewModalProps {
    review: Review;
    onClose: () => void;
    onDelete: (reviewId: number, reason: string) => void;
}

export interface RequestModalProps {
    request: VerificationRequest;
    onClose: () => void;
    onAction: (requestId: number, status: "APPROVED" | "DENIED", reason?: string) => void;
}

export interface UserVerificationModalProps {
    verification: UserVerification;
    onClose: () => void;
    onAction: (verificationId: number, status: "APPROVED" | "DENIED", reason?: string) => void;
}

export interface EditSellableModalProps {
    sellable: Sellable;
    onClose: () => void;
    onUpdate: (updatedSellable: Sellable) => void;
}


