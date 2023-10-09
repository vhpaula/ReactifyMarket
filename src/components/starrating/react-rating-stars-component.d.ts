declare module "react-rating-stars-component" {
    import React from "react";

    interface RatingProps {
        count?: number;
        value?: number;
        size?: number;
        edit?: boolean;
        activeColor?: string;
        emptyIcon?: React.ReactNode;
        halfIcon?: React.ReactNode;
        onChange?: (newValue: number) => void;
    }

    const Rating: React.FC<RatingProps>;
    export default Rating;
}
