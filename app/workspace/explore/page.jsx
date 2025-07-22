"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import axios from 'axios';

function Explore() {
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
            console.log("Server returned:", result.data);
            // Correctly set the state with the array itself
            setCourseList(result.data || []);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };
    return (
        <div>
            <h2 className='font-bold text-3xl mb-6'>Explore More Courses 🚀</h2>
            <div className='flex gap-5 max-w-md'>
                <Input placeholder="Search" />
                <Button> <Search /> Search</Button>
            </div>
            <div className='grid mt-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                {courseList?.map((course, index) => (
                    // By using parentheses, the <CourseCard> is automatically returned
                    <CourseCard course={course} key={index} refreshData={getCourseList} />
                ))}

            </div>
        </div>
    )
}

export default Explore
