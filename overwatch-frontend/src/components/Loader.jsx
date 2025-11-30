import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div className={`animate-spin rounded-full border-b-2 border-primary ${sizes[size]}`}></div>
        </div>
    );
};

export default Loader;
