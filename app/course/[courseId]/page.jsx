"use client"
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useEffect, useState } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation'
import axios from 'axios'

function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (courseId) {
            GetEnrolledCourseById();
        }
    }, [courseId]);

    const GetEnrolledCourseById = async () => {
        setLoading(true);
        try {
            const result = await axios.get('/api/enroll-course', {
                params: { courseId: courseId }
            });

            // =================================================================
            // FINAL CHECK: Verify the data structure from the server
            // =================================================================
            if (result.data && Array.isArray(result.data) && result.data.length > 0 && result.data[0].courses) {
                // If the data structure is correct, set the info
                setCourseInfo(result.data);
            } else {
                // If the data is WRONG, log a specific error and set info to null
                console.error(
                    "CRITICAL DATA MISMATCH: The server did not return the expected course data structure. " +
                    "Please check your backend API at '/api/enroll-course'. " +
                    "It should return an array containing an object with a 'courses' property.",
                    "Data Received:", result.data
                );
                setCourseInfo(null); // Set to null to ensure "No chapters" message is accurate
            }

        } catch (error) {
            console.error("ERROR: Failed to fetch course data.", error);
        }
        setLoading(false);
    }

    return (
        <div>
            <AppHeader hideSidebar={true} />
            <div className='flex'>
                <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-20'}`}>
                    <ChapterListSidebar
                        courseInfo={courseInfo}
                        loading={loading}
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />
                </div>

                <div className='flex-1 h-screen overflow-y-auto'>
                    <ChapterContent
                        courseInfo={courseInfo}
                        loading={loading}
                        refreshData={GetEnrolledCourseById}
                    />
                </div>
            </div>
        </div>
    )
}

export default Course