import React from 'react';
import { useNavigate } from 'react-router-dom';

const DemoToggle = ({ activeMode }) => {
    const navigate = useNavigate();

    const handleModeChange = (mode) => {
        if (mode === 'live') {
            navigate('/dashboard');
        }
    };

    return (
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button
                onClick={() => handleModeChange('demo')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeMode === 'demo'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                Demo Mode
            </button>
            <button
                onClick={() => handleModeChange('live')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeMode === 'live'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                Live Mode
            </button>
        </div>
    );
};

export default DemoToggle;
