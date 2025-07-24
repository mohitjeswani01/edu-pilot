"use client"
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useEffect, useState, useMemo } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext'

function Course() {
    const { courseId } = useParams();
    const { user } = useUser();
    const router = useRouter();

    // State for the public course details (name, description, etc.)
    const [publicCourseDetails, setPublicCourseDetails] = useState();
    // State for the detailed enrollment info (chapters, progress, etc.)
    const [enrolledCourseInfo, setEnrolledCourseInfo] = useState();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

    useEffect(() => {
        if (user && courseId) {
            // This function now handles all scenarios
            checkEnrollmentAndFetchData();
        }
    }, [user, courseId]);

    // This new function checks for enrollment first
    const checkEnrollmentAndFetchData = async () => {
        setLoading(true);
        try {
            // Step 1: Check if the user is enrolled in this course.
            const enrollResult = await axios.get(`/api/enroll-course?courseId=${courseId}`);

            if (enrollResult.data && enrollResult.data.length > 0) {
                // If enrolled, set the detailed info and mark as enrolled.
                setEnrolledCourseInfo(enrollResult.data);
                setIsEnrolled(true);
            } else {
                // If NOT enrolled, fetch the public course details to show the prompt.
                setIsEnrolled(false);
                const publicResult = await axios.get(`/api/courses?courseId=${courseId}`);
                setPublicCourseDetails(publicResult.data);
            }
        } catch (error) {
            console.error("ERROR: Failed to fetch course data.", error);
            toast.error("An error occurred while fetching course details.");
            router.push('/workspace');
        } finally {
            setLoading(false);
        }
    };

    // This function handles the enrollment action when the user clicks the button
    const handleEnroll = async () => {
        try {
            const response = await axios.post('/api/enroll-course', { courseId });
            if (response.status === 201 || (response.data && response.data.resp === 'Already Enrolled')) {
                toast.success("You have successfully enrolled!");
                // After enrolling, re-run the check to fetch the detailed course content
                checkEnrollmentAndFetchData();
            }
        } catch (error) {
            console.error("Enrollment failed:", error);
            toast.error("Enrollment failed. Please try again.");
        }
    };

    const contextValue = useMemo(() => ({ selectedChapterIndex, setSelectedChapterIndex }), [selectedChapterIndex]);

    if (loading) {
        return <div>Loading...</div>; // You can put a skeleton here
    }

    return (
        <SelectedChapterIndexContext.Provider value={contextValue}>
            <div>
                <AppHeader hideSidebar={true} />
                {isEnrolled ? (
                    // --- RENDER COURSE CONTENT IF ENROLLED ---
                    // This part uses your original logic and components
                    <div className='flex'>
                        <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-20'}`}>
                            <ChapterListSidebar
                                courseInfo={enrolledCourseInfo}
                                isSidebarOpen={isSidebarOpen}
                                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                            />
                        </div>
                        <div className='flex-1 h-screen overflow-y-auto'>
                            <ChapterContent
                                courseInfo={enrolledCourseInfo}
                                refreshData={checkEnrollmentAndFetchData}
                            />
                        </div>
                    </div>
                ) : (
                    // --- RENDER ENROLL PROMPT IF NOT ENROLLED ---
                    <div className="flex flex-col items-center justify-center h-screen text-center p-8">
                        <BookOpen className="h-24 w-24 text-gray-400 mb-6" />
                        <h1 className="text-3xl font-bold mb-2">{publicCourseDetails?.name}</h1>
                        <p className="text-gray-600 max-w-xl mb-6">{publicCourseDetails?.description}</p>
                        <Button size="lg" onClick={handleEnroll}>Enroll in Course to Continue</Button>
                    </div>
                )}
            </div>
        </SelectedChapterIndexContext.Provider>
    );
}

export default Course;