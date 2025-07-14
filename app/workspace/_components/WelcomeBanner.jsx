import React from 'react';
import Image from 'next/image'; // If you plan to use a logo, otherwise remove this import

function WelcomeBanner() {
    return (
        <div className='p-5 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-400 to-pink-400'>
            {/* Text Content */}
            <div>
                <h2 className="text-2xl font-semibold text-white">
                    Welcome to <span className="font-pacifico text-2xl">Edu-Pilot</span>
                </h2>
                <p className='text-lg font-medium text-white'>
                    Learn, Create and Explore your Favorite Courses
                </p>
            </div>
        </div>
    );
}

export default WelcomeBanner;
