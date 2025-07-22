"use client"
import React, { useEffect, useState } from 'react'
import WelcomeBanner from '../_components/WelcomeBanner'
import EnrollCourseList from '../_components/EnrollCourseList'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpenCheck } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

function MyLearning() {
    const { user } = useUser();
    const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getUserEnrolledCourses();
        }
    }, [user]);

    // Fetches the list of enrolled courses for the current user
    const getUserEnrolledCourses = async () => {
        try {
            // We use the existing enroll-course API to get the courses
            const response = await axios.get(`/api/enroll-course`);
            setUserEnrolledCourses(response.data);
        } catch (error) {
            console.error("Failed to fetch enrolled courses:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <WelcomeBanner />
            <h2 className='font-bold text-2xl mt-5'>My Learnings</h2>

            {/* Conditional Rendering Logic */}
            <div className='mt-5'>
                {loading ? (
                    // 1. Loading State with Skeletons
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {[1, 2, 3, 4].map((item) => (
                            <Skeleton key={item} className="h-[270px] w-full rounded-xl" />
                        ))}
                    </div>
                ) : userEnrolledCourses.length > 0 ? (
                    // 2. User has courses, show the list
                    <EnrollCourseList userEnrolledCourses={userEnrolledCourses} />
                ) : (
                    // 3. Professional Empty State
                    <div className='flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg mt-8 bg-gray-50'>
                        <BookOpenCheck className='h-16 w-16 text-gray-400 mb-4' />
                        <h3 className='text-2xl font-semibold text-gray-800'>Your Learning Journey Starts Here</h3>
                        <p className='text-gray-500 mt-2'>It looks like you haven't enrolled in any courses yet.</p>
                        <Link href="/workspace/explore" className='mt-6'>
                            <Button>Explore Courses</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyLearning