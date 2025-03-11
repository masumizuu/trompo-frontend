export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    user_type: string;
    is_verified: boolean;
    date_registered: string;
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
