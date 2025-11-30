import React from 'react';

const Card = ({ children, className = '', hover = false, onClick }) => {
    const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-200 p-6';
    const hoverStyles = hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : '';

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
