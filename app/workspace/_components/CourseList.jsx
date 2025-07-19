"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AddNewCourseDialog from './AddNewCourseDialog';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import CourseCard from './CourseCard';

function CourseList() {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            getCourseList();
        }
    }, [user]);

    const getCourseList = async () => {
        try {
            const result = await axios.get('/api/courses');
            console.log("Server returned:", result.data); // Confirms data is fetched
            setCourseList(result.data);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    return (
        <div className='p-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl'>Course List</h2>
                <AddNewCourseDialog>
                    <Button>+ New Course</Button>
                </AddNewCourseDialog>
            </div>

            {courseList?.length === 0 ? (
                <div className='flex p-7 items-center justify-center flex-col border rounded-2xl mt-5 bg-secondary'>
                    <Image src={'/edu-pilot.jpg'} alt='edu-pilot logo' width={80} height={80} />
                    <h2 className='my-2 text-xl font-bold'>You haven't created any courses yet.</h2>
                    <p className='text-gray-500'>Click the button below to get started!</p>
                    <div className='mt-4'>
                        <AddNewCourseDialog>
                            <Button>+ Create your first course!</Button>
                        </AddNewCourseDialog>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
                    {courseList.map((course) => (
                        <CourseCard course={course} key={course.cid} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseList;