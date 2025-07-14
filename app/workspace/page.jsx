import React from 'react';
import WelcomeBanner from './_components/WelcomeBanner'; // ✅ adjust the path if needed
import CourseList from './_components/CourseList';

function Workspace() {
    return (
        <div>
            <WelcomeBanner />
            <CourseList />
        </div>
    );
}

export default Workspace;
