import React, { useState } from 'react';
import DemoCard from '../components/demo/DemoCard';
import DemoPreview from '../components/demo/DemoPreview';
import DemoToggle from '../components/demo/DemoToggle';
import { DEMO_DATA } from '../components/demo/demoData';
import { useDemoSimulator } from '../components/demo/utils/dataSimulator';

const Demo = () => {
    const [selectedDemoId, setSelectedDemoId] = useState('campus');

    // Get the static initial data for the selected demo
    const initialDemoData = DEMO_DATA[selectedDemoId];

    // Pass it through the simulator hook to get live updates
    const liveDemoData = useDemoSimulator(initialDemoData);

    const demos = Object.values(DEMO_DATA);

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header with Toggle */}
            <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                    <h1 className="mb-2">Interactive Demos</h1>
                    <p className="text-gray-600">
                        Explore OVERWATCH in action across different industries and use cases
                    </p>
                </div>
                <DemoToggle activeMode="demo" />
            </div>

            {/* Demo Selection Cards */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Select a Demo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {demos.map((demo) => (
                        <DemoCard
                            key={demo.id}
                            demo={demo}
                            isSelected={selectedDemoId === demo.id}
                            onClick={() => setSelectedDemoId(demo.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Demo Preview */}
            <div key={selectedDemoId} className="animate-soft-fade">
                <DemoPreview demoData={liveDemoData} />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }

                @keyframes softFade {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-soft-fade {
                    animation: softFade 1.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default Demo;
